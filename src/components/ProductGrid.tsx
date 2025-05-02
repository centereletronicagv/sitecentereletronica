
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
      <div className="pt-10 pb-8 text-center">
        <h3 className="text-lg font-medium text-white">Nenhum produto encontrado</h3>
        <p className="mt-2 text-sm text-gray-400">Tente mudar seus filtros ou busque por outra categoria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  const isMobile = useIsMobile();
  // Fixed number of skeleton items for consistent rendering across device sizes
  const skeletonCount = isMobile ? 2 : 4;
  
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 pt-10">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-sm">
          <div 
            className="bg-[#252525] animate-pulse" 
            style={{
              aspectRatio: '1/1', 
              width: '100%', 
              height: isMobile ? '120px' : '200px'
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
