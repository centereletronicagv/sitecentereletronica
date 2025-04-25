
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
    // Mostrar toast para informar que o download está em andamento
    toast({
      title: "Gerando catálogo",
      description: "Por favor, aguarde enquanto preparamos seu catálogo...",
      duration: 3000,
    });
    
    // Usar setTimeout para não bloquear a interface do usuário
    setTimeout(() => {
      try {
        // Criar novo documento PDF com otimizações
        const doc = new jsPDF({
          compress: true,
          putOnlyUsedFonts: true,
        });
        
        // Configuração das cores do site
        const colors = {
          primary: '#FF7A00',
          background: '#1e1e1e',
          text: '#FFFFFF',
          muted: '#A1A3A9',
          border: '#333333'
        };
        
        // Header com fundo e título
        doc.setFillColor(colors.background);
        doc.rect(0, 0, doc.internal.pageSize.width, 50, 'F');
        
        // Logo e título
        doc.setTextColor(colors.primary);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('CENTER ELETRÔNICA', doc.internal.pageSize.width / 2, 25, { align: 'center' });
        
        doc.setTextColor(colors.text);
        doc.setFontSize(18);
        doc.text(`Catálogo - ${categoryName}`, doc.internal.pageSize.width / 2, 40, { align: 'center' });
        
        let yPosition = 70;
        
        // Configurações para o conteúdo
        doc.setFontSize(12);
        doc.setTextColor('#333333');
        
        // Processar produtos em lotes
        const batchSize = 10;
        const productBatches = [];
        
        for (let i = 0; i < products.length; i += batchSize) {
          productBatches.push(products.slice(i, i + batchSize));
        }
        
        let currentPage = 1;
        let productsPerPage = 0;
        const maxProductsPerPage = 3; // Reduzido para melhor espaçamento
        
        for (const batch of productBatches) {
          for (const product of batch) {
            // Nova página se necessário
            if (productsPerPage >= maxProductsPerPage) {
              doc.addPage();
              // Resetar posição Y e contador
              yPosition = 70;
              productsPerPage = 0;
              currentPage++;
            }
            
            // Card do produto com sombra
            doc.setFillColor(250, 250, 250);
            doc.setDrawColor(colors.border);
            doc.roundedRect(15, yPosition, 180, 80, 3, 3, 'FD');
            
            try {
              if (product.image) {
                const imagePath = product.image.replace('/public', '');
                // Imagem do produto
                doc.addImage(imagePath, 'PNG', 20, yPosition + 5, 70, 70);
              }
              
              // Informações do produto
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(14);
              doc.setTextColor(colors.primary);
              doc.text(product.name, 100, yPosition + 20);
              
              doc.setFont('helvetica', 'normal');
              doc.setFontSize(12);
              doc.setTextColor(colors.text);
              doc.text(`Código: ${product.code}`, 100, yPosition + 35);
              
              doc.setFontSize(12);
              doc.setTextColor(colors.primary);
              doc.text(
                `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
                100,
                yPosition + 50
              );
              
              yPosition += 100; // Aumentado o espaçamento entre produtos
              productsPerPage++;
              
            } catch (error) {
              console.error(`Erro ao processar produto ${product.code}:`, error);
              yPosition += 100;
              productsPerPage++;
            }
          }
        }
        
        // Adicionar rodapé em todas as páginas
        const pageCount = doc.internal.pages.length - 1;
        
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          
          // Fundo do rodapé
          doc.setFillColor(colors.background);
          doc.rect(0, doc.internal.pageSize.height - 40, doc.internal.pageSize.width, 40, 'F');
          
          // Informações de contato no rodapé
          doc.setTextColor(colors.text);
          doc.setFontSize(8);
          doc.text('Center Eletrônica', 15, doc.internal.pageSize.height - 30);
          doc.text('Rua Jacob Gremmelmaier, 409 - Centro', 15, doc.internal.pageSize.height - 25);
          doc.text('Getúlio Vargas - RS, 99900-000', 15, doc.internal.pageSize.height - 20);
          
          // Contatos à direita
          doc.text('Telefones:', doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 30);
          doc.text('(54) 9927-0560 | (54) 9998-6916', doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 25);
          doc.text('center@centereletronica.com.br', doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 20);
          
          // Número da página centralizado
          doc.setTextColor(colors.primary);
          doc.text(
            `Página ${i} de ${pageCount}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 15,
            { align: 'center' }
          );
        }
        
        // Download do PDF
        doc.save(`catalogo-${categoryName.toLowerCase()}.pdf`);
        
        // Toast de sucesso
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

