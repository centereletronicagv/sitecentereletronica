
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  customOrder?: boolean;
}

export default function ProductGrid({ products, isLoading = false, customOrder = false }: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-medium text-white">Nenhum produto encontrado</h3>
        <p className="mt-2 text-gray-400">Tente mudar seus filtros ou busque por outra categoria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-sm">
          <div className="h-48 bg-[#252525] animate-pulse"></div>
          <div className="p-4">
            <div className="w-16 h-6 bg-[#252525] animate-pulse rounded-md mb-2"></div>
            <div className="w-full h-5 bg-[#252525] animate-pulse rounded mb-2"></div>
            <div className="w-3/4 h-5 bg-[#252525] animate-pulse rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="w-20 h-7 bg-[#252525] animate-pulse rounded"></div>
              <div className="w-8 h-8 bg-[#252525] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
