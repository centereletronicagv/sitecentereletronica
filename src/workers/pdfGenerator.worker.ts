
import { jsPDF } from 'jspdf';

interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number | null;
  imageUrl?: string;
  code: string;
  image: string;
  subcategory?: string;
}

interface WorkerMessage {
  type: 'generate';
  products: Product[];
  categoryName: string;
}

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type === 'generate') {
    try {
      const { products, categoryName } = e.data;
      
      console.log('Starting PDF generation for:', categoryName);
      
      // Create PDF
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;
      
      // Add header
      pdf.setFontSize(20);
      pdf.text(`Catálogo - ${categoryName}`, 20, yPosition);
      yPosition += 15;
      
      pdf.setFontSize(12);
      pdf.text('Center Eletrônica', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(10);
      pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, yPosition);
      yPosition += 20;
      
      // Add products
      products.forEach((product, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        
        // Product name
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(product.name, 20, yPosition);
        yPosition += 8;
        
        // Product code
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Código: ${product.code}`, 20, yPosition);
        yPosition += 6;
        
        // Product price
        if (product.price) {
          const formattedPrice = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(product.price);
          pdf.text(`Preço: ${formattedPrice}`, 20, yPosition);
          yPosition += 6;
        }
        
        // Product description
        if (product.description) {
          const lines = pdf.splitTextToSize(product.description, pageWidth - 40);
          pdf.text(lines, 20, yPosition);
          yPosition += lines.length * 5;
        }
        
        // Subcategory
        if (product.subcategory) {
          pdf.text(`Subcategoria: ${product.subcategory}`, 20, yPosition);
          yPosition += 6;
        }
        
        yPosition += 5; // Space between products
      });
      
      // Add footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(
          `Página ${i} de ${totalPages} - Center Eletrônica`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }
      
      // Generate PDF blob
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      console.log('PDF generated successfully');
      
      // Send success response
      self.postMessage({
        type: 'success',
        pdf: pdfUrl,
        categoryName: categoryName
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Send error response
      self.postMessage({
        type: 'error',
        error: error instanceof Error ? error.message : 'Erro desconhecido ao gerar PDF'
      });
    }
  }
};
