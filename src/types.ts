export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  code: string;
  image: string;
  category: string;
  subcategory: string;
  inStock: boolean;
  isFeatured: boolean;
  priceInfo?: string; // For products with "Sob Consulta" price
  recommendedOrder?: number;
}
