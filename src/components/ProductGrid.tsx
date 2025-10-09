
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { useIsMobile } from '@/hooks/use-mobile';

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
  
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-medium text-white mb-2">Nenhum produto encontrado</h3>
        <p className="text-base text-gray-400">Tente mudar seus filtros ou busque por outra categoria.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="list" />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  const isMobile = useIsMobile();
  // Fixed number of skeleton items for consistent rendering across device sizes
  const skeletonCount = isMobile ? 4 : 8;
  
  return (
    <div className="flex flex-col gap-3 pt-10">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-sm flex flex-row">
          <div 
            className="bg-[#252525] animate-pulse flex-shrink-0" 
            style={{
              width: isMobile ? '120px' : '180px',
              height: isMobile ? '120px' : '180px'
            }}
          ></div>
          <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
            <div>
              <div className="w-16 h-3 bg-[#252525] animate-pulse rounded-md mb-3"></div>
              <div className="w-full max-w-md h-3 bg-[#252525] animate-pulse rounded mb-2"></div>
              <div className="w-3/4 max-w-sm h-3 bg-[#252525] animate-pulse rounded mb-3"></div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="w-24 h-5 bg-[#252525] animate-pulse rounded"></div>
              <div className="w-8 h-8 bg-[#252525] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
