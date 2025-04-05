
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
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
      <div className="py-20 text-center">
        <h3 className="text-xl font-medium text-white">Nenhum produto encontrado</h3>
        <p className="mt-2 text-gray-400">Tente mudar seus filtros ou busque por outra categoria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-sm">
          <div className="h-32 sm:h-48 bg-[#252525] animate-pulse"></div>
          <div className="p-3 sm:p-4">
            <div className="w-16 h-5 bg-[#252525] animate-pulse rounded-md mb-2"></div>
            <div className="w-full h-4 bg-[#252525] animate-pulse rounded mb-2"></div>
            <div className="w-3/4 h-4 bg-[#252525] animate-pulse rounded mb-3"></div>
            <div className="flex justify-between items-center">
              <div className="w-16 h-6 bg-[#252525] animate-pulse rounded"></div>
              <div className="w-7 h-7 bg-[#252525] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
