
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
    <Button
      onClick={handleDownload}
      variant="default"  // Changed from 'outline' to 'default' for better visibility
      className="w-full bg-[#252525] hover:bg-[#333333] text-white"
    >
      <Download className="mr-2 h-4 w-4" />
      Baixar Catálogo
    </Button>
  );
}
