
import { Product } from "../types";
import { jsPDF } from 'jspdf';

// Interface for communication with the worker
interface WorkerMessage {
  type: 'generate';
  products: Product[];
  categoryName: string;
}

// Function to generate the PDF
const generatePdf = (products: Product[], categoryName: string) => {
  // Create new document PDF with optimizations
  const doc = new jsPDF({
    compress: true,
    putOnlyUsedFonts: true,
  });
  
  let yPosition = 20;
  
  // Configuration of site colors
  const colors = {
    background: '#1e1e1e',
    primary: '#FF7A00',
    text: '#333333',
    secondary: '#252525'
  };
  
  // Header with title
  doc.setFillColor(colors.background);
  doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
  
  doc.setTextColor('#FFFFFF');
  doc.setFontSize(24);
  doc.text(`Catálogo - ${categoryName}`, 20, 25);
  
  yPosition = 50;
  
  // Settings for content
  doc.setFontSize(12);
  doc.setTextColor(colors.text);
  
  // Process products in batches for better performance
  const batchSize = 5;
  const productBatches = [];
  
  for (let i = 0; i < products.length; i += batchSize) {
    productBatches.push(products.slice(i, i + batchSize));
  }
  
  let currentPage = 1;
  let productsPerPage = 0;
  const maxProductsPerPage = 4; // Limit products per page
  
  for (const batch of productBatches) {
    for (const product of batch) {
      // Check if a new page is needed based on number of products
      if (productsPerPage >= maxProductsPerPage) {
        doc.addPage();
        yPosition = 50;
        productsPerPage = 0;
        currentPage++;
      }
      
      // Product card background
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, yPosition, 180, 60, 3, 3, 'F');
      
      // Add product information (without images)
      // Product name
      doc.setFontSize(14);
      doc.setTextColor(colors.primary);
      doc.text(product.name, 20, yPosition + 15);
      
      // Product code
      doc.setFontSize(10);
      doc.setTextColor(colors.text);
      doc.text(`Código: ${product.code}`, 20, yPosition + 30);
      
      // Product price
      doc.setFontSize(12);
      doc.setTextColor(colors.primary);
      doc.text(
        `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
        20, 
        yPosition + 45
      );
      
      yPosition += 70; // Spacing between products
      productsPerPage++;
    }
  }
  
  // Footer on all pages
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
  
  // Return PDF as base64 string
  return doc.output('datauristring');
};

// Event listener to receive messages from main thread
self.addEventListener('message', async (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type === 'generate') {
    const { products, categoryName } = e.data;
    
    try {
      // Generate PDF
      const pdfBase64 = generatePdf(products, categoryName);
      
      // Send PDF back to main thread
      self.postMessage({ 
        type: 'success', 
        pdf: pdfBase64,
        categoryName
      });
    } catch (error) {
      // Send error back to main thread
      self.postMessage({ 
        type: 'error', 
        error: `${error}`
      });
    }
  }
});
