
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
  const batchSize = 5;
  const productBatches = [];
  
  for (let i = 0; i < products.length; i += batchSize) {
    productBatches.push(products.slice(i, i + batchSize));
  }
  
  let currentPage = 1;
  let productsPerPage = 0;
  const maxProductsPerPage = 4; // Changed from 5 to 4 products per page to prevent footer overlap
  const footerHeight = 20; // Height of the footer
  const pageHeight = doc.internal.pageSize.height;
  const safeAreaHeight = pageHeight - footerHeight - 10; // Safe area for content (with 10pt margin)
  
  for (const batch of productBatches) {
    for (const product of batch) {
      const productCardHeight = 50; // Height of product card with some margin
      
      // Check if adding this product would exceed the safe area
      if (yPosition + productCardHeight > safeAreaHeight || productsPerPage >= maxProductsPerPage) {
        doc.addPage();
        yPosition = 50;
        productsPerPage = 0;
        currentPage++;
      }
      
      // Product card background - reduced height for more compact layout
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, yPosition, 180, 45, 3, 3, 'F');
      
      try {
        // Load and add product image - reduced size
        if (product.image) {
          const imageData = await loadImage(product.image);
          if (imageData) {
            doc.addImage(
              imageData,
              'PNG',
              20,
              yPosition + 5,
              35,
              35,
              undefined,
              'MEDIUM' // compression
            );
          }
        }
      } catch (error) {
        console.error('Error adding image to PDF:', error);
      }
      
      // Product information next to image - adjusted positions
      // Product name
      doc.setFontSize(12);
      doc.setTextColor(colors.primary);
      doc.text(product.name, 60, yPosition + 15, { maxWidth: 80 });
      
      // Product code and price on the same line
      doc.setFontSize(10);
      doc.setTextColor(colors.text);
      doc.text(`Código: ${product.code}`, 60, yPosition + 30);
      
      doc.setTextColor(colors.primary);
      doc.text(
        `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
        140,
        yPosition + 30
      );
      
      yPosition += 50; // Spacing between products
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
