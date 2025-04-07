
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  code?: string;
  image?: string;
  recommendedOrder?: number;
  popularity?: number;
  featured?: boolean;
  subcategory?: string;
}
