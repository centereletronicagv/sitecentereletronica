
import { useState, useEffect, useRef } from 'react';
import { Product } from '@/types';
import { useToast } from './use-toast';

interface PdfWorkerResult {
  loading: boolean;
  generatePdf: (products: Product[], categoryName: string) => Promise<void>;
}

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

    return new Promise<void>((resolve, reject) => {
      if (!workerRef.current) return reject("Worker não inicializado");

      setLoading(true);
      
      // Log products for debugging
      console.log(`Generating PDF for category: ${categoryName}`);
      console.log(`Number of products: ${products.length}`);
      console.log('Products data:', products.map(p => ({
        id: p.id,
        name: p.name,
        code: p.code,
        price: p.price,
        image: p.image
      })));
      
      toast({
        title: "Gerando catálogo",
        description: "Preparando seu catálogo para download...",
        duration: 3000,
      });

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
            description: "Seu catálogo foi baixado com sucesso.",
            duration: 3000,
          });
          
          resolve();
        } else if (e.data.type === 'error') {
          console.error('PDF generation error:', e.data.error);
          setLoading(false);
          
          toast({
            title: "Erro ao gerar catálogo",
            description: `Ocorreu um erro ao gerar seu catálogo: ${e.data.error}. Por favor, tente novamente.`,
            variant: "destructive",
            duration: 5000,
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
          products: products.map(product => ({
            ...product,
            // Ensure all required fields are present and valid
            name: product.name || 'Produto sem nome',
            code: product.code || 'Sem código',
            price: typeof product.price === 'number' ? product.price : 0,
            image: product.image || '',
            description: product.description || ''
          })),
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
