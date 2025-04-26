
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
        // Criar novo documento PDF com otimizações
        const doc = new jsPDF({
          compress: true,
          putOnlyUsedFonts: true,
        });
        
        // Configuração das cores do site
        const colors = {
          background: '#181818',
          cardBackground: '#1E1E1E',
          orange: '#FF7A00',
          text: '#FFFFFF',
          border: '#333333'
        };
        
        // Configurações de página
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 15;
        const productsPerPage = 6;
        
        // Função para adicionar cabeçalho (apenas na primeira página)
        const addHeader = (isFirstPage: boolean) => {
          if (!isFirstPage) return;
          
          // Fundo do cabeçalho
          doc.setFillColor(colors.background);
          doc.rect(0, 0, pageWidth, 45, 'F');
          
          // Título principal
          doc.setTextColor(colors.orange);
          doc.setFontSize(28);
          doc.setFont('helvetica', 'bold');
          doc.text('Center Eletrônica', pageWidth / 2, 25, { align: 'center' });
          
          // Subtítulo (categoria)
          doc.setFontSize(16);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(colors.text);
          doc.text(`Catálogo - ${categoryName}`, pageWidth / 2, 38, { align: 'center' });
        };
        
        // Função para adicionar rodapé (apenas na última página)
        const addFooter = (pageNumber: number, totalPages: number) => {
          if (pageNumber !== totalPages) {
            // Para páginas que não são a última, apenas número da página
            doc.setTextColor(colors.text);
            doc.setFontSize(8);
            doc.text(`${pageNumber}/${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
            return;
          }
          
          // Rodapé completo para a última página
          const footerY = pageHeight - 40;
          
          // Faixa de fundo do rodapé
          doc.setFillColor(colors.orange);
          doc.rect(0, footerY - 5, pageWidth, 45, 'F');
          
          // Informações de contato
          doc.setTextColor(colors.text);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('Entre em contato:', pageWidth / 2, footerY + 5, { align: 'center' });
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.text('(54) 9927-0560 | (54) 9998-6916', pageWidth / 2, footerY + 15, { align: 'center' });
          doc.text('center@centereletronica.com.br', pageWidth / 2, footerY + 23, { align: 'center' });
          doc.text('Rua Jacob Gremmelmaier, 409 - Centro', pageWidth / 2, footerY + 31, { align: 'center' });
          doc.text('Getúlio Vargas - RS, 99900-000', pageWidth / 2, footerY + 38, { align: 'center' });
        };
        
        let currentPage = 1;
        let yPosition = 60;
        let productsOnCurrentPage = 0;
        
        // Configurar primeira página
        doc.setFillColor(colors.background);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        addHeader(true);
        
        // Processar produtos
        for (let i = 0; i < products.length; i++) {
          const product = products[i];
          
          // Nova página se necessário
          if (productsOnCurrentPage >= productsPerPage) {
            doc.addPage();
            currentPage++;
            // Fundo da nova página
            doc.setFillColor(colors.background);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            addHeader(false);
            yPosition = 20;
            productsOnCurrentPage = 0;
          }
          
          // Card do produto
          const cardX = margin + (productsOnCurrentPage % 2 * (pageWidth - margin * 2) / 2);
          const cardWidth = (pageWidth - margin * 3) / 2;
          const cardHeight = 80;
          
          // Fundo do card
          doc.setFillColor(parseInt(colors.cardBackground.slice(1, 3), 16), 
                          parseInt(colors.cardBackground.slice(3, 5), 16), 
                          parseInt(colors.cardBackground.slice(5, 7), 16));
          doc.roundedRect(cardX, yPosition, cardWidth, cardHeight, 3, 3, 'F');
          
          // Borda do card
          doc.setDrawColor(colors.border);
          doc.roundedRect(cardX, yPosition, cardWidth, cardHeight, 3, 3, 'S');
          
          try {
            // Imagem do produto
            if (product.image) {
              const imagePath = product.image.replace('/public', '');
              try {
                doc.addImage(imagePath, 'PNG', cardX + 5, yPosition + 5, 70, 70);
              } catch (imageError) {
                console.warn(`Não foi possível carregar imagem para ${product.name}`);
              }
            }
            
            // Informações do produto
            const textX = cardX + 80;
            
            // Nome do produto
            doc.setTextColor(colors.orange);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(product.name, textX, yPosition + 20);
            
            // Código do produto
            doc.setTextColor(colors.text);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Código: ${product.code}`, textX, yPosition + 35);
            
            // Preço
            doc.setTextColor(colors.orange);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(
              `${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
              textX,
              yPosition + 50
            );
            
          } catch (error) {
            console.error(`Erro ao processar produto ${product.code}:`, error);
          }
          
          productsOnCurrentPage++;
          if (productsOnCurrentPage % 2 === 0) {
            yPosition += cardHeight + 10;
          }
        }
        
        // Adicionar rodapés em todas as páginas
        const totalPages = doc.internal.pages.length - 1;
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          addFooter(i, totalPages);
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
