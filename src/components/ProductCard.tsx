
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div 
      className={`group relative flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-md translate-y-[-8px]' : 'shadow-sm hover:shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pt-4 px-4 flex items-center justify-center h-48 bg-center-lightGray/30">
        <div className={`absolute inset-0 bg-gray-200 ${isImageLoaded ? 'opacity-0' : 'opacity-100 animate-pulse'} transition-opacity`}></div>
        <img
          src={product.image} 
          alt={product.name}
          className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-center-orange/10 text-center-orange rounded-md">
            Cód: {product.code}
          </span>
        </div>
        <h3 className="font-medium text-center-darkGray group-hover:text-center-orange transition-colors mb-2">
          {product.name}
        </h3>
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-center-orange">
              {formatPrice(product.price)}
              {product.name.toLowerCase().includes('/m') && <span className="text-xs font-normal text-center-gray">/m</span>}
            </span>
            <a 
              href={`https://wa.me/5499270560?text=Olá, tenho interesse no produto: ${product.name} (Cód: ${product.code})`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full text-center-orange bg-center-orange/10 hover:bg-center-orange hover:text-white transition-colors"
            >
              <ShoppingCart size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
