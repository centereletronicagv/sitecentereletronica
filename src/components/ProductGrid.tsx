
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
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  const isMobile = useIsMobile();
  // Fixed number of skeleton items for consistent rendering across device sizes
  const skeletonCount = isMobile ? 4 : 8;
  
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pt-10">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-sm">
          <div 
            className="bg-[#252525] animate-pulse" 
            style={{
              aspectRatio: '1/1', 
              width: '100%', 
              height: isMobile ? '140px' : '220px'
            }}
          ></div>
          <div className="p-3 sm:p-4">
            <div className="w-16 h-3 bg-[#252525] animate-pulse rounded-md mb-3"></div>
            <div className="w-full h-3 bg-[#252525] animate-pulse rounded mb-2"></div>
            <div className="w-3/4 h-3 bg-[#252525] animate-pulse rounded mb-3"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="w-20 h-4 bg-[#252525] animate-pulse rounded"></div>
              <div className="w-6 h-6 bg-[#252525] animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
