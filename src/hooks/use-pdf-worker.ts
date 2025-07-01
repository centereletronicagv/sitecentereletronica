
import { useState, useEffect, useRef } from 'react';
import { Product } from '@/types';
import { useToast } from './use-toast';

interface PdfWorkerResult {
  loading: boolean;
  generatePdf: (products: Product[], categoryName: string) => Promise<void>;
}

// Function to validate if an image is loadable
const validateImage = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = imageUrl;
    
    // Set a timeout to avoid hanging on slow images
    setTimeout(() => resolve(false), 5000);
  });
};

export function usePdfWorker(): PdfWorkerResult {
  const [loading, setLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const { toast } = useToast();

  // Initialize and clean up the worker
  useEffect(() => {
    // Create Worker
    const worker = new Worker(
      new URL('../workers/pdfGenerator.worker.ts', import.meta.url),
      { type: 'module' }
    );
    
    workerRef.current = worker;

    // Cleanup
    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  // Function to generate PDF using the worker
  const generatePdf = async (products: Product[], categoryName: string): Promise<void> => {
    if (!workerRef.current) {
      toast({
        title: "Erro",
        description: "Não foi possível inicializar o gerador de PDF.",
        variant: "destructive",
      });
      return;
    }

    return new Promise<void>(async (resolve, reject) => {
      if (!workerRef.current) return reject("Worker não inicializado");

      setLoading(true);
      
      // Log products for debugging
      console.log(`Generating PDF for category: ${categoryName}`);
      console.log(`Number of products: ${products.length}`);
      
      toast({
        title: "Gerando catálogo",
        description: "Validando imagens e preparando seu catálogo...",
        duration: 3000,
      });

      // Validate and clean product images
      const validatedProducts = await Promise.all(
        products.map(async (product) => {
          const isImageValid = await validateImage(product.image);
          
          if (!isImageValid) {
            console.warn(`Invalid image for product ${product.name}: ${product.image}`);
          }
          
          return {
            ...product,
            // Ensure all required fields are present and valid
            name: product.name || 'Produto sem nome',
            code: product.code || 'Sem código',
            price: typeof product.price === 'number' ? product.price : 0,
            image: isImageValid ? product.image : '', // Use empty string for invalid images
            description: product.description || ''
          };
        })
      );

      const validImages = validatedProducts.filter(p => p.image !== '').length;
      const invalidImages = products.length - validImages;
      
      console.log(`Valid images: ${validImages}, Invalid images: ${invalidImages}`);
      
      if (invalidImages > 0) {
        console.warn(`Found ${invalidImages} invalid/corrupt images that will be skipped`);
      }

      // Configure worker response
      const handleMessage = (e: MessageEvent) => {
        console.log('Received message from worker:', e.data);
        
        if (e.data.type === 'success') {
          // Download PDF
          const link = document.createElement('a');
          link.href = e.data.pdf;
          link.download = `catalogo-${e.data.categoryName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setLoading(false);
          
          toast({
            title: "Catálogo gerado!",
            description: invalidImages > 0 
              ? `Seu catálogo foi baixado com sucesso. ${invalidImages} imagem(ns) corrompida(s) foram ignoradas.`
              : "Seu catálogo foi baixado com sucesso.",
            duration: 5000,
          });
          
          resolve();
        } else if (e.data.type === 'error') {
          console.error('PDF generation error:', e.data.error);
          setLoading(false);
          
          // Check if it's an image-related error
          const isImageError = e.data.error.toString().toLowerCase().includes('png') || 
                              e.data.error.toString().toLowerCase().includes('image') ||
                              e.data.error.toString().toLowerCase().includes('corrupt');
          
          toast({
            title: "Erro ao gerar catálogo",
            description: isImageError 
              ? "Erro relacionado a imagens corrompidas. Nossa equipe foi notificada e está trabalhando na correção."
              : `Ocorreu um erro ao gerar seu catálogo: ${e.data.error}. Por favor, tente novamente.`,
            variant: "destructive",
            duration: 8000,
          });
          
          reject(e.data.error);
        }
        
        // Remove listener after receiving response
        workerRef.current?.removeEventListener('message', handleMessage);
      };

      // Add error handling for the worker
      const handleError = (error: any) => {
        console.error('Worker error:', error);
        setLoading(false);
        
        toast({
          title: "Erro ao gerar catálogo",
          description: "Erro interno do gerador de PDF. Por favor, tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
        
        reject(error);
      };

      // Add listeners
      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.addEventListener('error', handleError);
      
      // Send data to worker with error handling
      try {
        workerRef.current.postMessage({
          type: 'generate',
          products: validatedProducts,
          categoryName
        });
      } catch (error) {
        console.error('Error sending data to worker:', error);
        setLoading(false);
        
        toast({
          title: "Erro ao processar dados",
          description: "Erro ao preparar os dados para o catálogo.",
          variant: "destructive",
          duration: 5000,
        });
        
        reject(error);
      }
    });
  };

  return {
    loading,
    generatePdf
  };
}
