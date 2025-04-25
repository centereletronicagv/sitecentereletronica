
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
          compress: true, // Comprime o conteúdo do PDF
          putOnlyUsedFonts: true, // Inclui apenas fontes utilizadas
        });
        
        let yPosition = 20;
        
        // Configuração das cores do site
        const colors = {
          background: '#1e1e1e',
          primary: '#FF7A00',
          text: '#333333',
          secondary: '#252525'
        };
        
        // Cabeçalho com título
        doc.setFillColor(colors.background);
        doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
        
        doc.setTextColor('#FFFFFF');
        doc.setFontSize(24);
        doc.text(`Catálogo - ${categoryName}`, 20, 25);
        
        yPosition = 50;
        
        // Configurações para o conteúdo
        doc.setFontSize(12);
        doc.setTextColor(colors.text);
        
        // Processar produtos em lotes para melhor performance
        const batchSize = 10;
        const productBatches = [];
        
        for (let i = 0; i < products.length; i += batchSize) {
          productBatches.push(products.slice(i, i + batchSize));
        }
        
        let currentPage = 1;
        let productsPerPage = 0;
        const maxProductsPerPage = 4; // Limitar produtos por página
        
        for (const batch of productBatches) {
          for (const product of batch) {
            // Verificar se precisa de nova página baseado no número de produtos
            if (productsPerPage >= maxProductsPerPage) {
              doc.addPage();
              yPosition = 50;
              productsPerPage = 0;
              currentPage++;
            }
            
            // Fundo do card do produto
            doc.setFillColor(250, 250, 250);
            doc.roundedRect(15, yPosition, 180, 60, 3, 3, 'F');
            
            try {
              // Adicionar informações do produto (imagem condicionalmente)
              if (product.image) {
                try {
                  // Remove o /public da URL da imagem
                  const imagePath = product.image.replace('/public', '');
                  // Adicionar a imagem como um quadrado de 50x50
                  doc.addImage(imagePath, 'PNG', 20, yPosition + 5, 50, 50);
                } catch (imageError) {
                  // Silenciosamente ignorar erros de imagem e continuar sem a imagem
                  console.warn(`Não foi possível carregar imagem para ${product.name}`);
                }
              }
              
              // Informações do produto
              // Nome do produto
              doc.setFontSize(14);
              doc.setTextColor(colors.primary);
              doc.text(product.name, 80, yPosition + 15);
              
              // Código do produto
              doc.setFontSize(10);
              doc.setTextColor(colors.text);
              doc.text(`Código: ${product.code}`, 80, yPosition + 30);
              
              // Preço do produto
              doc.setFontSize(12);
              doc.setTextColor(colors.primary);
              doc.text(
                `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
                80, 
                yPosition + 45
              );
              
              yPosition += 70; // Espaçamento entre produtos
              productsPerPage++;
              
            } catch (error) {
              console.error(`Erro ao processar produto ${product.code}:`, error);
              // Continua para o próximo produto mesmo se houver erro
              yPosition += 70;
              productsPerPage++;
            }
          }
        }
        
        // Rodapé em todas as páginas
        const pageCount = doc.internal.pages.length - 1;
        
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFillColor(colors.primary);
          doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, 'F');
          doc.setTextColor('#FFFFFF');
          doc.setFontSize(10);
          doc.text(
            `Página ${i} de ${pageCount}`, 
            doc.internal.pageSize.width / 2, 
            doc.internal.pageSize.height - 10, 
            { align: 'center' }
          );
        }
        
        // Download do PDF
        doc.save(`catalogo-${categoryName.toLowerCase()}.pdf`);
        
        // Mostrar toast de sucesso após o download
        toast({
          title: "Catálogo gerado!",
          description: "Seu catálogo foi baixado com sucesso.",
          duration: 3000,
        });
      } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        
        // Mostrar toast de erro
        toast({
          title: "Erro ao gerar catálogo",
          description: "Ocorreu um erro ao gerar seu catálogo. Por favor, tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }, 100); // Curto delay para não bloquear a interface
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
