
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { allProducts, getProductsByCategory, getRecommendedProducts, searchProducts } from '@/data/products';

export function useProducts(options: {
  category?: string;
  searchQuery?: string;
  recommendedOnly?: boolean;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      
      // Simulate network delay for API-like behavior
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let result: Product[] = [];
      
      // Handle different loading scenarios
      if (options.searchQuery) {
        result = searchProducts(options.searchQuery);
      } else if (options.category) {
        result = getProductsByCategory(options.category);
      } else if (options.recommendedOnly) {
        result = getRecommendedProducts(options.limit || 8);
      } else {
        result = [...allProducts];
      }
      
      // Apply limit if specified
      if (options.limit && !options.searchQuery) {
        result = result.slice(0, options.limit);
      }
      
      setProducts(result);
      setIsLoading(false);
    };

    loadProducts();
  }, [options.category, options.searchQuery, options.recommendedOnly, options.limit]);

  return { products, isLoading };
}
