
import ProductCard from './ProductCard';
import { Product } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  searchQuery?: string;
  category?: string; // Mantendo para compatibilidade
}

export default function ProductGrid({ 
  products, 
  isLoading = false
}: ProductGridProps) {
  const isMobile = useIsMobile();
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // Effect to mark the end of initial render for performance optimization
  useEffect(() => {
    if (isInitialRender) {
      // Use requestIdleCallback to defer non-critical work
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setIsInitialRender(false);
        });
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          setIsInitialRender(false);
        }, 200);
      }
    }
  }, [isInitialRender]);

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="pt-10 pb-8 text-center">
        <h3 className="text-lg font-medium text-white">Nenhum produto encontrado</h3>
        <p className="mt-2 text-sm text-gray-400">Tente mudar seus filtros ou busque por outra categoria.</p>
      </div>
    );
  }

  // For mobile, show only the first batch of products initially to improve first paint
  const visibleProducts = isInitialRender && isMobile ? products.slice(0, 4) : products;

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {visibleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  const isMobile = useIsMobile();
  // Reduced number of skeleton items for faster mobile rendering
  const skeletonCount = isMobile ? 2 : 4;
  
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 pt-10">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div 
          key={index} 
          className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-sm"
          style={{
            // Set explicit height to prevent layout shift
            height: isMobile ? '250px' : '360px',
            contain: 'layout'
          }}
        >
          <div 
            className="bg-[#252525] animate-pulse" 
            style={{
              aspectRatio: '1/1', 
              width: '100%',
              height: isMobile ? '140px' : '220px',
              contain: 'layout'
            }}
          ></div>
          <div className="p-2 sm:p-4">
            <div className="w-12 h-3 bg-[#252525] animate-pulse rounded-md mb-2"></div>
            <div className="w-full h-2 bg-[#252525] animate-pulse rounded mb-1"></div>
            <div className="w-3/4 h-2 bg-[#252525] animate-pulse rounded mb-2"></div>
            <div className="flex justify-between items-center">
              <div className="w-12 h-4 bg-[#252525] animate-pulse rounded"></div>
              <div className="w-5 h-5 bg-[#252525] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
