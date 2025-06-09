
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
      className={`
        w-full min-h-[44px] relative overflow-hidden transition-all duration-300
        bg-gradient-to-r from-center-orange to-orange-600 
        hover:from-orange-600 hover:to-center-orange
        border border-orange-500/20 hover:border-orange-400/40
        shadow-lg hover:shadow-xl hover:shadow-orange-500/25
        text-white font-medium
        ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
        group
      `}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <FileText className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">Gerando PDF...</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-[-1px]" />
            <span className="text-sm font-medium">Baixar Catálogo</span>
          </>
        )}
      </div>
      
      {/* Shine effect */}
      {!loading && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      )}
    </Button>
  );
}
