
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
          background: '#1e1e1e',
          primary: '#FF7A00',
          text: '#333333',
          secondary: '#252525'
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
          doc.setFontSize(28);
          doc.setFont('helvetica', 'bold');
          doc.text('Center Eletrônica', pageWidth / 2, 25, { align: 'center' });
          
          // Subtítulo (categoria)
          doc.setFontSize(16);
          doc.setFont('helvetica', 'normal');
          doc.text(`Catálogo - ${categoryName}`, pageWidth / 2, 38, { align: 'center' });
        };
        
        // Função para adicionar rodapé
        const addFooter = (pageNumber: number, totalPages: number) => {
          const footerY = pageHeight - 25;
          
          // Faixa laranja no rodapé
          doc.setFillColor(colors.primary);
          doc.rect(0, footerY - 5, pageWidth, 30, 'F');
          
          // Informações de contato
          doc.setTextColor('#FFFFFF');
          doc.setFontSize(8);
          doc.text('(54) 9927-0560 | (54) 9998-6916 | center@centereletronica.com.br', pageWidth / 2, footerY + 2, { align: 'center' });
          doc.text('Rua Jacob Gremmelmaier, 409 - Centro, Getúlio Vargas - RS, 99900-000', pageWidth / 2, footerY + 8, { align: 'center' });
          
          // Numeração da página
          doc.text(`Página ${pageNumber} de ${totalPages}`, pageWidth / 2, footerY + 14, { align: 'center' });
        };
        
        let currentPage = 1;
        let yPosition = 60;
        const productsPerPage = 6;
        let productsOnCurrentPage = 0;
        
        // Adicionar primeira página
        addHeader();
        
        // Processar produtos em lotes
        for (let i = 0; i < products.length; i++) {
          const product = products[i];
          
          // Nova página se necessário
          if (productsOnCurrentPage >= productsPerPage) {
            doc.addPage();
            currentPage++;
            addHeader();
            yPosition = 60;
            productsOnCurrentPage = 0;
          }
          
          // Card do produto
          doc.setFillColor(250, 250, 250);
          doc.roundedRect(margin, yPosition, pageWidth - (margin * 2), 40, 3, 3, 'F');
          
          // Informações do produto
          try {
            // Imagem do produto (se disponível)
            if (product.image) {
              const imagePath = product.image.replace('/public', '');
              try {
                doc.addImage(imagePath, 'PNG', margin + 5, yPosition + 5, 30, 30);
              } catch (imageError) {
                console.warn(`Não foi possível carregar imagem para ${product.name}`);
              }
            }
            
            // Textos do produto
            const textX = margin + 45;
            
            // Nome do produto
            doc.setTextColor(colors.primary);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(product.name, textX, yPosition + 15);
            
            // Código do produto
            doc.setTextColor(colors.text);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Código: ${product.code}`, textX, yPosition + 25);
            
            // Preço
            doc.setTextColor(colors.primary);
            doc.text(
              `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
              textX,
              yPosition + 35
            );
            
          } catch (error) {
            console.error(`Erro ao processar produto ${product.code}:`, error);
          }
          
          yPosition += 50;
          productsOnCurrentPage++;
        }
        
        // Adicionar rodapé em todas as páginas
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
