
import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import ProductSectionHeader from './ProductSectionHeader';
import { Product } from '@/data/products';
import { 
  getRecommendedProducts, 
  searchProducts,
  getProductsBySlug
} from '@/utils/productCategories';
import { CATEGORY_LABELS } from '@/utils/productCategories';

interface ProductsSectionProps {
  searchQuery?: string;
  categorySlug?: string;
}

const ProductsSection = ({ searchQuery = '', categorySlug = '' }: ProductsSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredProducts: Product[] = [];
      
      // Case 1: Category page
      if (categorySlug) {
        filteredProducts = getProductsBySlug(categorySlug);
      }
      // Case 2: Search results
      else if (searchQuery) {
        filteredProducts = searchProducts(searchQuery);
      }
      // Case 3: Homepage recommended products
      else {
        filteredProducts = getRecommendedProducts(8);
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, categorySlug]);

  // Determine title based on context
  const getSectionTitle = (): string => {
    if (searchQuery) return 'Resultados da Pesquisa';
    if (categorySlug) return CATEGORY_LABELS[categorySlug] || 'Produtos';
    return 'Produtos Recomendados';
  };

  return (
    <section id="products" className="py-16 px-4 bg-[#121212]">
      <div className="container mx-auto">
        <ProductSectionHeader 
          title={getSectionTitle()}
          showViewAll={!searchQuery && !categorySlug}
          viewAllLink="/categoria/ar-condicionado"
          searchQuery={searchQuery}
        />
        
        <ProductGrid 
          products={products} 
          isLoading={isLoading} 
          searchQuery={searchQuery} 
        />
      </div>
    </section>
  );
};

export default ProductsSection;
