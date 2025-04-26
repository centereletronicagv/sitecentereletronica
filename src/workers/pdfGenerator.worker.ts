import { Product } from "../types";
import { jsPDF } from 'jspdf';

interface WorkerMessage {
  type: 'generate';
  products: Product[];
  categoryName: string;
}

// Function to load image and convert to base64
const loadImage = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return '';
  }
};

// Function to generate the PDF
const generatePdf = async (products: Product[], categoryName: string) => {
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
  const batchSize = 6;
  const productBatches = [];
  
  for (let i = 0; i < products.length; i += batchSize) {
    productBatches.push(products.slice(i, i + batchSize));
  }
  
  let currentPage = 1;
  let productsPerPage = 0;
  const maxProductsPerPage = 6; // Changed to 6 products per page
  const footerHeight = 20; // Height of the footer
  const pageHeight = doc.internal.pageSize.height;
  const safeAreaHeight = pageHeight - footerHeight - 15; // Safe area for content
  const productCardHeight = 35; // Further reduced height for product card
  
  for (const batch of productBatches) {
    for (const product of batch) {
      // Check if adding this product would exceed the safe area
      if (yPosition + productCardHeight > safeAreaHeight || productsPerPage >= maxProductsPerPage) {
        doc.addPage();
        yPosition = 50;
        productsPerPage = 0;
        currentPage++;
      }
      
      // Product card background - even more compact layout
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, yPosition, 180, 33, 3, 3, 'F');
      
      try {
        // Load and add product image - smaller size
        if (product.image) {
          const imageData = await loadImage(product.image);
          if (imageData) {
            doc.addImage(
              imageData,
              'PNG',
              20,
              yPosition + 2,
              28,
              28,
              undefined,
              'MEDIUM' // compression
            );
          }
        }
      } catch (error) {
        console.error('Error adding image to PDF:', error);
      }
      
      // Product information next to image - adjusted positions for compact layout
      // Product name
      doc.setFontSize(10);
      doc.setTextColor(colors.primary);
      doc.text(product.name, 55, yPosition + 10, { maxWidth: 90 });
      
      // Product code and price on the same line
      doc.setFontSize(9);
      doc.setTextColor(colors.text);
      doc.text(`Código: ${product.code}`, 55, yPosition + 22);
      
      doc.setTextColor(colors.primary);
      doc.text(
        `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
        140,
        yPosition + 22
      );
      
      yPosition += 37; // Reduced spacing between products
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
      const pdfBase64 = await generatePdf(products, categoryName);
      
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
