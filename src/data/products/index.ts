
import { Product } from '@/types/product';
import { airConditioningProducts } from './airConditioningProducts';
import { automationProducts } from './automationProducts';
import { connectorsProducts } from './connectorsProducts';
import { terminalsProducts } from './terminalsProducts';

// Combine all products into a single array
export const allProducts: Product[] = [
  ...airConditioningProducts,
  ...automationProducts,
  ...connectorsProducts,
  ...terminalsProducts
];

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(product => product.category === category);
};

// Get recommended products
export const getRecommendedProducts = (limit: number = 8): Product[] => {
  return allProducts
    .filter(product => product.recommendedOrder !== undefined)
    .sort((a, b) => {
      const orderA = a.recommendedOrder || 999;
      const orderB = b.recommendedOrder || 999;
      return orderA - orderB;
    })
    .slice(0, limit);
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) ||
    product.code.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery)
  );
};

// Get featured products
export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return allProducts
    .filter(product => product.featured === true)
    .sort((a, b) => {
      const popA = a.popularity || 0;
      const popB = b.popularity || 0;
      return popB - popA;
    })
    .slice(0, limit);
};
