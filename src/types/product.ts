
export interface Product {
  id: string;
  name: string;
  code: string;
  price: number | string;
  image: string;
  category: string;
  recommendedOrder?: number;
  popularity?: number;
  featured?: boolean;
}
