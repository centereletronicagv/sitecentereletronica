
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/types";
import jsPDF from "jspdf";

interface DownloadCategoryButtonProps {
  products: Product[];
  categoryName: string;
}

export function DownloadCategoryButton({ products, categoryName }: DownloadCategoryButtonProps) {
  const handleDownload = async () => {
    // Criar novo documento PDF
    const doc = new jsPDF();
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
    
    for (const product of products) {
      // Verificar se precisa de nova página
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Fundo do card do produto
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, yPosition, 180, 60, 3, 3, 'F');
      
      try {
        // Carregar e adicionar imagem do produto
        if (product.image) {
          // Remove o /public da URL da imagem
          const imagePath = product.image.replace('/public', '');
          // Adicionar a imagem como um quadrado de 50x50
          doc.addImage(imagePath, 'PNG', 20, yPosition + 5, 50, 50);
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
        
      } catch (error) {
        console.error(`Erro ao processar produto ${product.code}:`, error);
        // Continua para o próximo produto mesmo se houver erro
        yPosition += 70;
      }
    }
    
    // Rodapé em todas as páginas
    // Usando o tamanho do array pages para obter o número de páginas
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
