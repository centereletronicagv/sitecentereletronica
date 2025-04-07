import ProductCard from './ProductCard';
import { Product as TypeProduct } from '../types';

interface Product extends TypeProduct {
  code: string;
  recommendedOrder?: number;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  searchQuery?: string;
}

export default function ProductGrid({ products, isLoading = false, searchQuery = '' }: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  // Filter products based on search query if provided
  const filteredProducts = searchQuery
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  if (filteredProducts.length === 0) {
    return (
      <div className="pt-14 pb-10 text-center">
        <h3 className="text-xl font-medium text-white">Nenhum produto encontrado</h3>
        <p className="mt-2 text-gray-400">Tente mudar seus filtros ou busque por outra categoria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 pt-14">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-sm">
          <div className="h-28 sm:h-48 bg-[#252525] animate-pulse"></div>
          <div className="p-2 sm:p-4">
            <div className="w-12 h-4 bg-[#252525] animate-pulse rounded-md mb-2"></div>
            <div className="w-full h-3 bg-[#252525] animate-pulse rounded mb-1.5"></div>
            <div className="w-3/4 h-3 bg-[#252525] animate-pulse rounded mb-2"></div>
            <div className="flex justify-between items-center">
              <div className="w-14 h-5 bg-[#252525] animate-pulse rounded"></div>
              <div className="w-6 h-6 bg-[#252525] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
