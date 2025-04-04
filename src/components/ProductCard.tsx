
import { useState } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
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

  const formatPrice = (price: number) => {
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
      className={`group relative flex flex-col bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-lg translate-y-[-8px] border-center-orange/40' : 'shadow-md hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pt-4 px-4 flex items-center justify-center h-48 bg-gradient-to-br from-[#252525] to-[#202020]">
        <div className={`absolute inset-0 bg-[#252525] ${isImageLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'} transition-opacity`}></div>
        <img
          src={product.image} 
          alt={displayName}
          className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-center-orange text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Cód: {product.code}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-medium text-white group-hover:text-center-orange transition-colors mb-4 line-clamp-2 h-12">
          {displayName}
        </h3>
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-center-orange">
              {formatPrice(product.price)}
              {isSoldByMeter && <span className="text-xs font-normal text-gray-400 ml-1">/m</span>}
            </div>
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full text-center-orange bg-center-orange/10 hover:bg-center-orange hover:text-white transition-colors flex items-center justify-center"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
