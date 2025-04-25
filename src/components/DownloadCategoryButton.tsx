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

        doc.setFillColor(colors.background);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        
        doc.setTextColor(colors.text);
        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text('CATÁLOGO DIGITAL', doc.internal.pageSize.width / 2, 40, { align: 'center' });
        
        doc.setTextColor(colors.primary);
        doc.setFontSize(24);
        doc.text(categoryName.toUpperCase(), doc.internal.pageSize.width / 2, 60, { align: 'center' });

        const itemsPerPage = 9;
        const itemsPerRow = 3;
        const margin = 15;
        const cardWidth = 55;
        const cardHeight = 90;
        const spacing = 8;
        
        let currentPage = 1;
        let yPosition = 80;
        let xPosition = margin;
        let itemCount = 0;

        for (const product of products) {
          if (itemCount > 0 && itemCount % itemsPerPage === 0) {
            doc.addPage();
            currentPage++;
            yPosition = 20;
            doc.setFillColor(colors.background);
            doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
          }

          xPosition = margin + (itemCount % itemsPerRow) * (cardWidth + spacing);
          
          if (itemCount % itemsPerRow === 0 && itemCount !== 0) {
            yPosition += cardHeight + spacing;
          }

          doc.setFillColor(colors.cardBg);
          doc.roundedRect(xPosition, yPosition, cardWidth, cardHeight, 3, 3, 'F');

          try {
            if (product.image) {
              const imagePath = product.image.replace('/public', '');
              doc.addImage(imagePath, 'PNG', xPosition + 3, yPosition + 5, cardWidth - 6, 40);
            }
          } catch (error) {
            console.error(`Erro ao carregar imagem do produto ${product.code}:`, error);
          }

          doc.setTextColor(colors.text);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.text(product.name, xPosition + 3, yPosition + 55, {
            maxWidth: cardWidth - 6
          });

          doc.setFillColor(colors.primary);
          doc.roundedRect(xPosition + 3, yPosition + 65, 30, 6, 2, 2, 'F');
          doc.setTextColor(colors.text);
          doc.setFontSize(7);
          doc.text(`COD: ${product.code}`, xPosition + 5, yPosition + 69);

          doc.setTextColor(colors.primary);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(
            product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta',
            xPosition + cardWidth - 3,
            yPosition + 80,
            { align: 'right' }
          );

          itemCount++;
        }

        doc.addPage();
        doc.setFillColor(colors.background);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

        doc.setTextColor(colors.text);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('FAÇA SEU PEDIDO NOS MEIOS DE CONTATO ABAIXO:', 
          doc.internal.pageSize.width / 2, 40, { align: 'center' });

        doc.setFontSize(14);
        doc.text('R. JACOB GREMMELMAIER, 409 - CENTRO', 
          doc.internal.pageSize.width / 2, 70, { align: 'center' });
        
        doc.setTextColor(colors.primary);
        doc.text('54 9927-0560', doc.internal.pageSize.width / 2 - 50, 90, { align: 'center' });
        doc.text('OU', doc.internal.pageSize.width / 2, 90, { align: 'center' });
        doc.text('54 9998-6916', doc.internal.pageSize.width / 2 + 50, 90, { align: 'center' });

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
