
import { Product, mockProducts } from "@/data/products";

export type CategoryMap = {
  [key: string]: {
    id: string;
    title: string;
    products: Product[];
  };
};

export const CATEGORY_LABELS: { [key: string]: string } = {
  'ar-condicionado': 'Ar Condicionado',
  'automacao': 'Automação',
  'instalacoes-eletricas': 'Instalações Elétricas',
  'terminais': 'Terminais',
};

export const getProductsByCategory = (products: Product[]): CategoryMap => {
  const categorizedProducts: CategoryMap = {};
  
  // Initialize categories
  Object.entries(CATEGORY_LABELS).forEach(([id, title]) => {
    categorizedProducts[id] = {
      id,
      title,
      products: []
    };
  });
  
  // Populate categories with products
  products.forEach(product => {
    if (categorizedProducts[product.category]) {
      categorizedProducts[product.category].products.push(product);
    } else {
      // Create category if it doesn't exist yet
      categorizedProducts[product.category] = {
        id: product.category,
        title: product.category.charAt(0).toUpperCase() + product.category.slice(1).replace(/-/g, ' '),
        products: [product]
      };
    }
  });
  
  return categorizedProducts;
};

export const getRecommendedProducts = (limit: number = 8): Product[] => {
  return [...mockProducts]
    .filter(product => product.recommendedOrder !== undefined)
    .sort((a, b) => {
      const orderA = a.recommendedOrder || 999;
      const orderB = b.recommendedOrder || 999;
      return orderA - orderB;
    })
    .slice(0, limit);
};

export const searchProducts = (query: string = ''): Product[] => {
  if (!query) return mockProducts;
  
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.code.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getProductsBySlug = (categorySlug: string): Product[] => {
  if (!categorySlug) return [];
  return mockProducts.filter(product => product.category === categorySlug);
};
