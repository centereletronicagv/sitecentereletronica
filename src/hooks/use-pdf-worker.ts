
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
      
      toast({
        title: "Gerando catálogo",
        description: "Preparando seu catálogo para download...",
        duration: 3000,
      });

      // Configure worker response
      const handleMessage = (e: MessageEvent) => {
        if (e.data.type === 'success') {
          // Download PDF
          const link = document.createElement('a');
          link.href = e.data.pdf;
          link.download = `catalogo-${e.data.categoryName.toLowerCase()}.pdf`;
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
          setLoading(false);
          
          toast({
            title: "Erro ao gerar catálogo",
            description: "Ocorreu um erro ao gerar seu catálogo. Por favor, tente novamente.",
            variant: "destructive",
            duration: 5000,
          });
          
          reject(e.data.error);
        }
        
        // Remove listener after receiving response
        workerRef.current?.removeEventListener('message', handleMessage);
      };

      // Add listener to receive messages from worker
      workerRef.current.addEventListener('message', handleMessage);
      
      // Send data to worker
      workerRef.current.postMessage({
        type: 'generate',
        products,
        categoryName
      });
    });
  };

  return {
    loading,
    generatePdf
  };
}
