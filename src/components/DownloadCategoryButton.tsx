
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
    
    try {
      const doc = new jsPDF({
        compress: true,
        putOnlyUsedFonts: true,
      });
      
      // Configurações de cores e estilo
      const colors = {
        background: '#181818',
        primary: '#FF7A00',
        text: '#FFFFFF'
      };

      // Primeira página com título
      doc.setFillColor(parseInt(colors.background.slice(1), 16));
      // Convert coordinates to strings for rect method
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
      
      // Título principal
      doc.setTextColor(colors.primary);
      doc.setFontSize(32);
      doc.setFont('helvetica', 'bold');
      // Convert coordinates to strings for text method
      const titleX = doc.internal.pageSize.width / 2;
      const titleY = 40;
      doc.text('CATÁLOGO DIGITAL', titleX.toString(), titleY.toString(), { align: 'center' });
      
      // Subtítulo (categoria)
      doc.setTextColor('#000000');
      doc.setFontSize(24);
      const subtitleX = doc.internal.pageSize.width / 2;
      const subtitleY = 60;
      doc.text(categoryName.toUpperCase(), subtitleX.toString(), subtitleY.toString(), { align: 'center' });

      // Configurações dos produtos
      const itemsPerPage = 6;
      const itemsPerRow = 2;
      const margin = 20;
      const cardWidth = 80;
      const cardHeight = 100;
      const spacing = 10;
      
      let currentPage = 1;
      let yPosition = 80;
      let xPosition = margin;
      let itemCount = 0;

      for (const product of products) {
        // Nova página se necessário
        if (itemCount > 0 && itemCount % itemsPerPage === 0) {
          doc.addPage();
          currentPage++;
          yPosition = 20;
          doc.setFillColor(parseInt(colors.background.slice(1), 16));
          doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        }

        // Calcular posição do card
        if (itemCount % itemsPerRow === 0) {
          xPosition = margin;
        } else {
          xPosition = margin + cardWidth + spacing;
        }

        // Card do produto
        doc.setFillColor(40, 40, 40);
        // Convert coordinates to strings for roundedRect method
        doc.roundedRect(xPosition.toString(), yPosition.toString(), cardWidth.toString(), cardHeight.toString(), 3, 3, 'F');

        try {
          if (product.image) {
            const imagePath = product.image.replace('/public', '');
            doc.addImage(imagePath, 'PNG', xPosition + 5, yPosition + 5, 70, 50);
          }
        } catch (error) {
          console.error(`Erro ao carregar imagem do produto ${product.code}:`, error);
        }

        // Informações do produto
        doc.setTextColor(colors.text);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        // Convert coordinates to strings for text method
        const nameX = xPosition + 5;
        const nameY = yPosition + 65;
        doc.text(product.name, nameX.toString(), nameY.toString(), {
          maxWidth: cardWidth - 10
        });

        // Código do produto
        doc.setFillColor(parseInt(colors.primary.slice(1), 16));
        // Convert coordinates to strings for roundedRect method
        const codeRectX = xPosition + 5;
        const codeRectY = yPosition + 75;
        doc.roundedRect(codeRectX.toString(), codeRectY.toString(), "40", "7", 2, 2, 'F');
        doc.setTextColor(colors.text);
        doc.setFontSize(8);
        // Convert coordinates to strings for text method
        const codeX = xPosition + 8;
        const codeY = yPosition + 80;
        doc.text(`COD: ${product.code}`, codeX.toString(), codeY.toString());

        // Preço do produto
        doc.setTextColor(colors.primary);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        // Convert coordinates to strings for text method
        const priceX = xPosition + cardWidth - 5;
        const priceY = yPosition + 80;
        doc.text(
          product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta',
          priceX.toString(), 
          priceY.toString(),
          { align: 'right' }
        );

        itemCount++;
        
        // Ajustar posição Y para próxima linha após dois itens
        if (itemCount % itemsPerRow === 0) {
          yPosition += cardHeight + spacing;
        }
      }

      // Adicionar última página com contatos
      doc.addPage();
      doc.setFillColor(parseInt(colors.background.slice(1), 16));
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

      // Título dos contatos
      doc.setTextColor(colors.text);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      // Convert coordinates to strings for text method
      const contactTitleX = doc.internal.pageSize.width / 2;
      const contactTitleY = 40;
      doc.text('FAÇA SEU PEDIDO NOS MEIOS DE CONTATO ABAIXO:', 
        contactTitleX.toString(), contactTitleY.toString(), { align: 'center' });

      // Informações de contato
      doc.setFontSize(14);
      const addressX = doc.internal.pageSize.width / 2;
      const addressY = 70;
      doc.text('R. JACOB GREMMELMAIER, 409 - CENTRO', 
        addressX.toString(), addressY.toString(), { align: 'center' });
      
      doc.setTextColor(colors.primary);
      const phone1X = doc.internal.pageSize.width / 2 - 50;
      const phone2X = doc.internal.pageSize.width / 2;
      const phone3X = doc.internal.pageSize.width / 2 + 50;
      const phoneY = 90;
      doc.text('54 9927-0560', phone1X.toString(), phoneY.toString(), { align: 'center' });
      doc.text('OU', phone2X.toString(), phoneY.toString(), { align: 'center' });
      doc.text('54 9998-6916', phone3X.toString(), phoneY.toString(), { align: 'center' });

      // Download do PDF
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
