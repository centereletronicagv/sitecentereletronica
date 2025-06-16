
import { Download, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/types";
import { usePdfWorker } from "@/hooks/use-pdf-worker";

interface DownloadCategoryButtonProps {
  products: Product[];
  categoryName: string;
  variant?: "default" | "outline" | "compact";
}

export function DownloadCategoryButton({ products, categoryName, variant = "default" }: DownloadCategoryButtonProps) {
  const { loading, generatePdf } = usePdfWorker();

  const handleDownload = async () => {
    if (loading) return;
    
    try {
      await generatePdf(products, categoryName);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  if (variant === "compact") {
    return (
      <Button
        onClick={handleDownload}
        variant="outline"
        size="sm"
        disabled={loading}
        className="bg-gradient-to-r from-center-orange to-orange-600 hover:from-orange-600 hover:to-center-orange text-white border-center-orange hover:border-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {loading ? (
          <>
            <FileText className="mr-2 h-4 w-4 animate-pulse" />
            Gerando...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Catálogo PDF
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleDownload}
      variant="default"
      disabled={loading}
      className={`w-full ${
        loading 
          ? 'opacity-70' 
          : 'bg-gradient-to-r from-center-orange to-orange-600 hover:from-orange-600 hover:to-center-orange'
      } text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0`}
    >
      {loading ? (
        <>
          <FileText className="mr-2 h-4 w-4 animate-pulse" />
          Gerando PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Baixar Catálogo PDF
        </>
      )}
    </Button>
  );
}
