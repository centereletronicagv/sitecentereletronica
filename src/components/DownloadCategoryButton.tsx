
import { Download, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/types";
import { usePdfWorker } from "@/hooks/use-pdf-worker";

interface DownloadCategoryButtonProps {
  products: Product[];
  categoryName: string;
}

export function DownloadCategoryButton({ products, categoryName }: DownloadCategoryButtonProps) {
  const { loading, generatePdf } = usePdfWorker();

  const handleDownload = async () => {
    if (loading) return;
    
    try {
      await generatePdf(products, categoryName);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="default"
      disabled={loading}
      className={`w-full ${loading ? 'opacity-70' : 'bg-[#252525] hover:bg-[#333333]'} text-white`}
    >
      {loading ? (
        <>
          <FileText className="mr-2 h-4 w-4 animate-pulse" />
          Gerando...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Baixar Catálogo
        </>
      )}
    </Button>
  );
}
