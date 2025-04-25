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
      duration: 3000,
    });
    
    setTimeout(() => {
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
        const cardHeight = 75;
        const spacing = 10;
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
        doc.setTextColor(colors.text);
        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text('CATÁLOGO DIGITAL', pageWidth / 2, 40, { align: 'center' });
        
        doc.setTextColor(colors.primary);
        doc.setFontSize(24);
        doc.text(categoryName.toUpperCase(), pageWidth / 2, 60, { align: 'center' });

        let yPosition = 80;
        
        // Ensure we don't have duplicate products by creating a Set of processed product IDs
        const processedIds = new Set();
        
        // Filter out duplicate products by checking their IDs
        const uniqueProducts = products.filter(product => {
          // If we've already processed this ID, skip it
          if (processedIds.has(product.id)) {
            return false;
          }
          
          // Otherwise add it to our set and keep the product
          processedIds.add(product.id);
          return true;
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
          yPosition = 80 + row * (cardHeight + spacing);
          
          if (currentPage > 1) {
            yPosition = 20 + row * (cardHeight + spacing);
          }

          // Draw card background
          doc.setFillColor(colors.cardBg);
          doc.roundedRect(xPosition, yPosition, cardWidth, cardHeight, 3, 3, 'F');

          // Add product image
          try {
            if (product.image) {
              const imagePath = product.image.replace('/public', '');
              doc.addImage(imagePath, 'PNG', xPosition + 3, yPosition + 5, cardWidth - 6, 35);
            }
          } catch (error) {
            console.error(`Erro ao carregar imagem do produto ${product.code}:`, error);
          }

          // Add product name
          doc.setTextColor(colors.text);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.text(product.name, xPosition + 3, yPosition + 50, {
            maxWidth: cardWidth - 6
          });

          // Add product code
          doc.setFillColor(colors.primary);
          doc.roundedRect(xPosition + 3, yPosition + 55, 30, 6, 2, 2, 'F');
          doc.setTextColor(colors.text);
          doc.setFontSize(7);
          doc.text(`COD: ${product.code}`, xPosition + 5, yPosition + 59);

          // Add product price
          doc.setTextColor(colors.primary);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(
            product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta',
            xPosition + cardWidth - 3,
            yPosition + 70,
            { align: 'right' }
          );

          itemCount++;
        }

        // Add contact information on the last page
        if (itemCount % itemsPerPage === 0) {
          doc.addPage();
          addPageBackground();
        }

        const lastPageY = itemCount % itemsPerPage === 0 ? 40 : yPosition + cardHeight + 40;

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
          duration: 3000,
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
    }, 100);
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
