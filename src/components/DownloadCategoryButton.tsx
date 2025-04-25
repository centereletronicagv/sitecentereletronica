
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/types";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface DownloadCategoryButtonProps {
  products: Product[];
  categoryName: string;
}

export function DownloadCategoryButton({ products, categoryName }: DownloadCategoryButtonProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    toast({
      title: "Gerando catálogo",
      description: "Por favor, aguarde enquanto preparamos seu catálogo...",
      duration: 4000,
    });
    
    // Immediate execution instead of setTimeout
    try {
      const doc = new jsPDF({
        compress: true,
        putOnlyUsedFonts: true,
      });
      
      const colors = {
        background: '#151515',
        primary: '#FF7A00',
        text: '#FFFFFF',
        cardBg: '#252525'
      };

      // Constants for layout
      const itemsPerPage = 9;
      const itemsPerRow = 3;
      const margin = 15;
      const cardWidth = 55;
      const cardHeight = 85;
      const spacing = 6;
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      
      let currentPage = 1;
      let itemCount = 0;

      // Function to add background to new page
      const addPageBackground = () => {
        doc.setFillColor(colors.background);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
      };

      // Add first page background
      addPageBackground();
      
      // Add title only on first page
      doc.setTextColor(colors.primary);
      doc.setFontSize(32);
      doc.setFont('helvetica', 'bold');
      doc.text('CATÁLOGO DIGITAL', pageWidth / 2, 40, { align: 'center' });
      
      doc.setTextColor(colors.text);
      doc.setFontSize(24);
      doc.text(categoryName.toUpperCase(), pageWidth / 2, 60, { align: 'center' });

      let yPosition = 80;

      // Filter out duplicate products by ID
      const uniqueProductIds = new Set();
      const uniqueProducts = products.filter(product => {
        if (!uniqueProductIds.has(product.id)) {
          uniqueProductIds.add(product.id);
          return true;
        }
        return false;
      });

      for (const product of uniqueProducts) {
        if (itemCount > 0 && itemCount % itemsPerPage === 0) {
          doc.addPage();
          currentPage++;
          yPosition = 20;
          addPageBackground();
        }

        const row = Math.floor((itemCount % itemsPerPage) / itemsPerRow);
        const col = itemCount % itemsPerRow;
        
        const xPosition = margin + col * (cardWidth + spacing);
        
        // Adjust vertical positioning
        if (currentPage === 1) {
          yPosition = 70 + row * (cardHeight + spacing);
        } else {
          yPosition = 20 + row * (cardHeight + spacing);
        }

        // Draw card background
        doc.setFillColor(colors.cardBg);
        doc.roundedRect(xPosition, yPosition, cardWidth, cardHeight, 3, 3, 'F');

        // Add product image with adjusted size
        try {
          if (product.image) {
            const imagePath = product.image.replace('/public', '');
            doc.addImage(imagePath, 'PNG', xPosition + 3, yPosition + 5, cardWidth - 6, 25);
          }
        } catch (error) {
          console.error(`Erro ao carregar imagem do produto ${product.code}:`, error);
        }

        // Add product name with better positioning
        doc.setTextColor(colors.text);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        
        // Handle product name wrapping
        const name = product.name || "";
        const maxCharsPerLine = 25;
        
        if (name.length > maxCharsPerLine) {
          const firstLine = name.substring(0, maxCharsPerLine);
          const secondLine = name.substring(maxCharsPerLine, maxCharsPerLine * 2);
          doc.text(firstLine, xPosition + 3, yPosition + 35);
          doc.text(secondLine + (name.length > maxCharsPerLine * 2 ? "..." : ""), xPosition + 3, yPosition + 41);
        } else {
          doc.text(name, xPosition + 3, yPosition + 38);
        }

        // Add product price moved to left side
        doc.setTextColor(colors.primary);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(
          product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta',
          xPosition + 3,
          yPosition + 55
        );

        // Add product code below price
        doc.setFillColor(colors.primary);
        doc.roundedRect(xPosition + 3, yPosition + 65, 30, 6, 2, 2, 'F');
        doc.setTextColor(colors.text);
        doc.setFontSize(7);
        doc.text(`COD: ${product.code}`, xPosition + 5, yPosition + 69);

        itemCount++;
      }

      // Add contact information only on the last page
      if (itemCount % itemsPerPage === 0) {
        doc.addPage();
        addPageBackground();
      }

      const lastPageY = itemCount % itemsPerPage === 0 ? 40 : yPosition + cardHeight + 40;

      // Footer only on the last page
      doc.setTextColor(colors.text);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('FAÇA SEU PEDIDO NOS MEIOS DE CONTATO ABAIXO:', 
        pageWidth / 2, lastPageY, { align: 'center' });

      doc.setFontSize(14);
      doc.text('R. JACOB GREMMELMAIER, 409 - CENTRO', 
        pageWidth / 2, lastPageY + 30, { align: 'center' });
      
      doc.setTextColor(colors.primary);
      doc.text('54 9927-0560', pageWidth / 2 - 50, lastPageY + 50, { align: 'center' });
      doc.text('OU', pageWidth / 2, lastPageY + 50, { align: 'center' });
      doc.text('54 9998-6916', pageWidth / 2 + 50, lastPageY + 50, { align: 'center' });

      doc.save(`catalogo-${categoryName.toLowerCase()}.pdf`);
      
      toast({
        title: "Catálogo gerado!",
        description: "Seu catálogo foi baixado com sucesso.",
        duration: 4000,
      });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro ao gerar catálogo",
        description: "Ocorreu um erro ao gerar seu catálogo. Por favor, tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

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
