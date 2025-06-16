
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
    try {
      // Create Worker
      const worker = new Worker(
        new URL('../workers/pdfGenerator.worker.ts', import.meta.url),
        { type: 'module' }
      );
      
      workerRef.current = worker;
      
      console.log('PDF Worker initialized successfully');
    } catch (error) {
      console.error('Failed to initialize PDF worker:', error);
      toast({
        title: "Erro de inicialização",
        description: "Não foi possível inicializar o gerador de PDF. Tente recarregar a página.",
        variant: "destructive",
      });
    }

    // Cleanup
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [toast]);

  // Function to generate PDF using the worker
  const generatePdf = async (products: Product[], categoryName: string): Promise<void> => {
    if (loading) {
      console.log('PDF generation already in progress');
      return;
    }

    if (!workerRef.current) {
      console.error('Worker not available');
      toast({
        title: "Erro",
        description: "Gerador de PDF não está disponível. Tente recarregar a página.",
        variant: "destructive",
      });
      return;
    }

    if (!products || products.length === 0) {
      toast({
        title: "Aviso",
        description: "Nenhum produto encontrado para gerar o catálogo.",
        variant: "destructive",
      });
      return;
    }

    return new Promise<void>((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error("Worker não inicializado"));
        return;
      }

      setLoading(true);
      
      console.log(`Starting PDF generation for ${products.length} products in category: ${categoryName}`);
      
      toast({
        title: "Gerando catálogo",
        description: `Preparando catálogo com ${products.length} produtos...`,
        duration: 3000,
      });

      // Configure worker response
      const handleMessage = (e: MessageEvent) => {
        console.log('Worker message received:', e.data);
        
        if (e.data.type === 'success') {
          // Download PDF
          const link = document.createElement('a');
          link.href = e.data.pdf;
          link.download = `catalogo-${categoryName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the URL
          URL.revokeObjectURL(e.data.pdf);
          
          setLoading(false);
          
          toast({
            title: "Catálogo gerado!",
            description: "Seu catálogo foi baixado com sucesso.",
            duration: 3000,
          });
          
          resolve();
        } else if (e.data.type === 'error') {
          setLoading(false);
          
          console.error('Worker error:', e.data.error);
          
          toast({
            title: "Erro ao gerar catálogo",
            description: e.data.error || "Ocorreu um erro ao gerar seu catálogo. Por favor, tente novamente.",
            variant: "destructive",
            duration: 5000,
          });
          
          reject(new Error(e.data.error));
        }
        
        // Remove listener after receiving response
        workerRef.current?.removeEventListener('message', handleMessage);
      };

      // Configure error handler
      const handleError = (error: ErrorEvent) => {
        console.error('Worker error event:', error);
        setLoading(false);
        
        toast({
          title: "Erro crítico",
          description: "Falha crítica no gerador de PDF. Tente recarregar a página.",
          variant: "destructive",
          duration: 5000,
        });
        
        reject(error);
        workerRef.current?.removeEventListener('error', handleError);
      };

      // Add listeners
      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.addEventListener('error', handleError);
      
      // Send data to worker
      try {
        workerRef.current.postMessage({
          type: 'generate',
          products,
          categoryName
        });
      } catch (error) {
        console.error('Failed to send message to worker:', error);
        setLoading(false);
        
        toast({
          title: "Erro de comunicação",
          description: "Falha ao comunicar com o gerador de PDF.",
          variant: "destructive",
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
