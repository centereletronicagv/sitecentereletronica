
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/types";
import jsPDF from "jspdf";

interface DownloadCategoryButtonProps {
  products: Product[];
  categoryName: string;
}

export function DownloadCategoryButton({ products, categoryName }: DownloadCategoryButtonProps) {
  const handleDownload = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    
    // Título
    doc.setFontSize(20);
    doc.text(`Lista de Produtos - ${categoryName}`, 20, yPosition);
    
    // Configurações para o conteúdo
    doc.setFontSize(12);
    
    products.forEach((product, index) => {
      yPosition += 15;
      
      // Adiciona nova página se necessário
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Informações do produto
      doc.text(`${index + 1}. ${product.name}`, 20, yPosition);
      yPosition += 7;
      doc.setFontSize(10);
      doc.text(`Código: ${product.code}`, 25, yPosition);
      yPosition += 5;
      doc.text(`Preço: R$ ${product.price?.toFixed(2) || 'N/A'}`, 25, yPosition);
      doc.setFontSize(12);
    });
    
    // Download do PDF
    doc.save(`produtos-${categoryName.toLowerCase()}.pdf`);
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden bg-[#1E1E1E] border border-[#333333] hover:border-center-orange/40 transition-all duration-300">
      {products[0]?.image && (
        <div className="relative h-32 bg-gradient-to-br from-[#252525] to-[#202020] p-4">
          <img 
            src={products[0].image} 
            alt={categoryName}
            className="w-full h-full object-contain"
          />
        </div>
      )}
      <div className="p-4">
        <Button
          onClick={handleDownload}
          className="w-full bg-center-orange hover:bg-center-orangeLight text-white gap-2 font-medium"
        >
          <Download className="h-4 w-4" />
          Baixar Catálogo
        </Button>
      </div>
    </div>
  );

  return (
    <Button
      onClick={handleDownload}
      variant="default"  
      className="w-full bg-[#252525] hover:bg-[#333333] text-white"
    >
      <Download className="mr-2 h-4 w-4" />
      Baixar Catálogo
    </Button>
  );
}
