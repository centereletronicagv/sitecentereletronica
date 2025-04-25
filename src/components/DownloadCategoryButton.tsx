
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
        
        // Configurações de cores do site
        const colors = {
          background: '#181818',
          primary: '#FF7A00',
          text: '#FFFFFF',
          card: '#1E1E1E',
          border: '#333333'
        };
        
        // Configurações de página
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;
        
        // Função para adicionar cabeçalho
        const addHeader = () => {
          // Fundo do cabeçalho
          doc.setFillColor(colors.background);
          doc.rect(0, 0, pageWidth, 45, 'F');
          
          // Título principal
          doc.setTextColor('#FFFFFF');
          doc.setFontSize(32);
          doc.setFont('helvetica', 'bold');
          doc.text('Center Eletrônica', pageWidth / 2, 25, { align: 'center' });
          
          // Subtítulo (categoria)
          doc.setFontSize(18);
          doc.setFont('helvetica', 'normal');
          doc.text(`Catálogo - ${categoryName}`, pageWidth / 2, 38, { align: 'center' });
        };
        
        // Função para adicionar rodapé apenas na última página
        const addFooter = (isLastPage: boolean) => {
          if (isLastPage) {
            const footerY = pageHeight - 40;
            
            // Faixa laranja no rodapé
            doc.setFillColor(colors.primary);
            doc.rect(0, footerY - 5, pageWidth, 45, 'F');
            
            // Informações de contato
            doc.setTextColor('#FFFFFF');
            doc.setFontSize(10);
            doc.text('(54) 9927-0560 | (54) 9998-6916', pageWidth / 2, footerY + 5, { align: 'center' });
            doc.text('center@centereletronica.com.br', pageWidth / 2, footerY + 15, { align: 'center' });
            doc.text('Rua Jacob Gremmelmaier, 409 - Centro', pageWidth / 2, footerY + 25, { align: 'center' });
            doc.text('Getúlio Vargas - RS, 99900-000', pageWidth / 2, footerY + 35, { align: 'center' });
          }
        };
        
        let currentPage = 1;
        let yPosition = 60;
        const productsPerPage = 6;
        let productsOnCurrentPage = 0;
        
        // Adicionar primeira página
        doc.setFillColor(colors.background);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        addHeader();
        
        // Processar produtos em lotes de 6 por página
        for (let i = 0; i < products.length; i++) {
          const product = products[i];
          
          // Nova página se necessário
          if (productsOnCurrentPage >= productsPerPage) {
            doc.addPage();
            currentPage++;
            doc.setFillColor(colors.background);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            addHeader();
            yPosition = 60;
            productsOnCurrentPage = 0;
          }
          
          // Card do produto
          const cardWidth = (pageWidth - (margin * 3)) / 2;
          const cardHeight = 90;
          const cardX = margin + (productsOnCurrentPage % 2) * (cardWidth + margin);
          
          // Background do card
          doc.setFillColor(colors.card);
          doc.roundedRect(cardX, yPosition, cardWidth, cardHeight, 3, 3, 'F');
          
          try {
            // Imagem do produto
            if (product.image) {
              const imagePath = product.image.replace('/public', '');
              try {
                doc.addImage(imagePath, 'PNG', cardX + 5, yPosition + 5, 80, 80);
              } catch (imageError) {
                console.warn(`Não foi possível carregar imagem para ${product.name}`);
              }
            }
            
            // Informações do produto
            const textX = cardX + 90;
            
            // Código do produto (tag laranja)
            doc.setFillColor(colors.primary);
            doc.roundedRect(textX, yPosition + 10, 45, 15, 2, 2, 'F');
            doc.setTextColor('#FFFFFF');
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(product.code, textX + 22.5, yPosition + 19, { align: 'center' });
            
            // Nome do produto
            doc.setTextColor('#FFFFFF');
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(product.name, textX, yPosition + 40, { maxWidth: cardWidth - 100 });
            
            // Preço
            doc.setTextColor(colors.primary);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(
              product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta',
              textX,
              yPosition + 70
            );
            
          } catch (error) {
            console.error(`Erro ao processar produto ${product.code}:`, error);
          }
          
          productsOnCurrentPage++;
          if (productsOnCurrentPage % 2 === 0) {
            yPosition += cardHeight + 15;
          }
        }
        
        // Adicionar rodapé apenas na última página
        const totalPages = doc.internal.pages.length - 1;
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          addFooter(i === totalPages);
        }
        
        // Download do PDF
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
