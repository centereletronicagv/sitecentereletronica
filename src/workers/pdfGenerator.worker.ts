
import { Product } from "../types";
import { jsPDF } from 'jspdf';

interface WorkerMessage {
  type: 'generate';
  products: Product[];
  categoryName: string;
}

// Optimize image loading with caching
const imageCache = new Map<string, string>();

const loadImage = async (url: string): Promise<string> => {
  // Check cache first
  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        imageCache.set(url, base64data); // Cache the result
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return '';
  }
};

// Pre-define colors to avoid object creation in loops
const colors = {
  background: '#1e1e1e',
  primary: '#FF7A00',
  text: '#333333',
  secondary: '#252525'
} as const;

const generatePdf = async (products: Product[], categoryName: string) => {
  // Create new document PDF with optimizations
  const doc = new jsPDF({
    compress: true,
    putOnlyUsedFonts: true,
  });
  
  // Pre-calculate page dimensions
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const footerHeight = 20;
  const safeAreaHeight = pageHeight - footerHeight - 15;
  const productCardHeight = 35;
  
  // Header (only set these values once)
  doc.setFillColor(colors.background);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor('#FFFFFF');
  doc.setFontSize(24);
  doc.text(`Catálogo - ${categoryName}`, 20, 25);
  
  let yPosition = 50;
  let currentPage = 1;
  let productsPerPage = 0;
  const maxProductsPerPage = 6;
  
  // Process products in larger batches
  const batchSize = 10;
  
  // Pre-load all images before starting PDF generation
  const imagePromises = products.map(product => 
    product.image ? loadImage(product.image) : Promise.resolve('')
  );
  
  // Wait for all images to load
  const imageResults = await Promise.all(imagePromises);
  const imageMap = new Map(products.map((product, index) => [product.image, imageResults[index]]));
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    if (yPosition + productCardHeight > safeAreaHeight || productsPerPage >= maxProductsPerPage) {
      doc.addPage();
      yPosition = 50;
      productsPerPage = 0;
      currentPage++;
    }
    
    // Product card background
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(15, yPosition, 180, 33, 3, 3, 'F');
    
    // Add image if available
    if (product.image) {
      const imageData = imageMap.get(product.image);
      if (imageData) {
        doc.addImage(
          imageData,
          'PNG',
          20,
          yPosition + 2,
          30,
          30,
          undefined,
          'MEDIUM'
        );
      }
    }
    
    // Product information
    doc.setFontSize(11);
    doc.setTextColor(colors.primary);
    doc.text(product.name, 55, yPosition + 12, { maxWidth: 90 });
    
    doc.setFontSize(9);
    doc.setTextColor(colors.text);
    doc.text(`Código: ${product.code}`, 55, yPosition + 25);
    
    doc.setTextColor(colors.primary);
    doc.text(
      `Preço: ${product.price ? `R$ ${product.price.toFixed(2)}` : 'Sob consulta'}`,
      140,
      yPosition + 25
    );
    
    yPosition += 37;
    productsPerPage++;
  }
  
  // Add footer to all pages
  const pageCount = doc.internal.pages.length - 1;
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(colors.primary);
    doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, 'F');
    doc.setTextColor('#FFFFFF');
    doc.setFontSize(10);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }
  
  return doc.output('datauristring');
};

// Event listener to receive messages from main thread
self.addEventListener('message', async (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type === 'generate') {
    const { products, categoryName } = e.data;
    
    try {
      const pdfBase64 = await generatePdf(products, categoryName);
      
      self.postMessage({
        type: 'success',
        pdf: pdfBase64,
        categoryName
      });
    } catch (error) {
      self.postMessage({
        type: 'error',
        error: `${error}`
      });
    }
  }
});

