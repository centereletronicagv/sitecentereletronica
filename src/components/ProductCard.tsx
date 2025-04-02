
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number | string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') {
      return price; // Return the string as is (for "Sob Consulta")
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

  // Clean up the product name to remove the "/m" or "Por Metro" text
  const displayName = product.name;

  return (
    <div 
      className={`group relative flex flex-col bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden transition-all duration-300 h-full ${
        isHovered ? 'shadow-lg translate-y-[-4px] border-center-orange/40' : 'shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="relative pt-3 px-3 flex items-center justify-center h-32 sm:h-36 md:h-40 bg-gradient-to-br from-[#252525] to-[#202020]">
        <div className={`absolute inset-0 bg-[#252525] ${isImageLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'} transition-opacity`}></div>
        <img
          src={product.image} 
          alt={displayName}
          className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-center-orange text-white text-xs px-2 py-0.5 rounded-full font-medium truncate max-w-[120px]">
            Cód: {product.code}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-white group-hover:text-center-orange transition-colors mb-2 line-clamp-2 text-sm sm:text-base">
          {displayName}
        </h3>
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className={`text-base sm:text-lg font-semibold ${typeof product.price === 'string' ? 'text-yellow-500' : 'text-center-orange'}`}>
              {formatPrice(product.price)}
              {isSoldByMeter && typeof product.price === 'number' && <span className="text-xs font-normal text-gray-400 ml-1">/m</span>}
            </div>
            <button 
              onClick={handleAddToCart}
              className={`p-1.5 sm:p-2 rounded-full text-center-orange bg-center-orange/10 hover:bg-center-orange hover:text-white transition-colors flex items-center justify-center ${typeof product.price === 'string' ? 'opacity-60 cursor-not-allowed' : ''}`}
              aria-label="Adicionar ao carrinho"
              disabled={typeof product.price === 'string'}
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
