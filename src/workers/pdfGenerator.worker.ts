
import { Product } from "../types";

// Setup para usar jsPDF no Web Worker
self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.1/jspdf.umd.min.js');

// Interface para comunicação com o worker
interface WorkerMessage {
  type: 'generate';
  products: Product[];
  categoryName: string;
}

// Função para gerar o PDF
const generatePdf = (products: Product[], categoryName: string) => {
  const jsPDF = (self as any).jspdf.jsPDF;
  
  // Criar novo documento PDF com otimizações
  const doc = new jsPDF({
    compress: true,
    putOnlyUsedFonts: true,
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
  const batchSize = 5;
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
      
      // Adicionar informações do produto (sem imagens)
      // Nome do produto
      doc.setFontSize(14);
      doc.setTextColor(colors.primary);
      doc.text(product.name, 20, yPosition + 15);
      
      // Código do produto
      doc.setFontSize(10);
      doc.setTextColor(colors.text);
      doc.text(`Código: ${product.code}`, 20, yPosition + 30);
      
      // Preço do produto
      doc.setFontSize(12);
      doc.setTextColor(colors.primary);
      doc.text(
        `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
        20, 
        yPosition + 45
      );
      
      yPosition += 70; // Espaçamento entre produtos
      productsPerPage++;
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
  
  // Retornar o PDF como string base64
  return doc.output('datauristring');
};

// Event listener para receber mensagens do thread principal
self.addEventListener('message', async (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type === 'generate') {
    const { products, categoryName } = e.data;
    
    try {
      // Gerar PDF
      const pdfBase64 = generatePdf(products, categoryName);
      
      // Enviar PDF de volta para o thread principal
      self.postMessage({ 
        type: 'success', 
        pdf: pdfBase64,
        categoryName
      });
    } catch (error) {
      // Enviar erro de volta para o thread principal
      self.postMessage({ 
        type: 'error', 
        error: `${error}`
      });
    }
  }
});
