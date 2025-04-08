
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) {
      return 'Sob Consulta';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Check if the product is sold by meter
  const isSoldByMeter = 
    product.name.toLowerCase().includes('/m') || 
    product.name.toLowerCase().includes('por metro');

  // Check if the price is "Sob Consulta"
  const isPriceOnRequest = product.price === 0 || product.price === null;

  // Clean up the product name to remove the "/m" or "Por Metro" text
  const displayName = product.name;

  return (
    <div 
      className={`group relative flex flex-col bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-lg translate-y-[-4px] border-center-orange/40' : 'shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if ('ontouchstart' in window) {
          handleAddToCart();
        }
      }}
    >
      <div className="relative pt-3 px-3 flex items-center justify-center h-28 sm:h-48 bg-gradient-to-br from-[#252525] to-[#202020]">
        <div className={`absolute inset-0 bg-[#252525] ${isImageLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'} transition-opacity`}></div>
        <img
          src={product.image} 
          alt={displayName}
          className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          loading="lazy"
          width="120"
          height="120"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-center-orange text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-medium">
            {product.code}
          </span>
        </div>
      </div>

      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-white text-xs sm:text-base group-hover:text-center-orange transition-colors mb-1.5 sm:mb-4 line-clamp-2 h-8 sm:h-12">
          {displayName}
        </h3>
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className="text-sm sm:text-lg font-semibold text-center-orange">
              {isPriceOnRequest ? (
                <span>Sob Consulta</span>
              ) : (
                <>
                  {formatPrice(product.price)}
                  {isSoldByMeter && <span className="text-[10px] sm:text-xs font-normal text-gray-400 ml-1">/m</span>}
                </>
              )}
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="p-1 sm:p-2 rounded-full text-center-orange bg-center-orange/10 hover:bg-center-orange hover:text-white transition-colors flex items-center justify-center"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart size={14} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
