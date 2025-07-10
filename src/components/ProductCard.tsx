
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { Product } from '../types';
import { useFavoritesToast } from '@/hooks/useFavoritesToast';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { showAddedToast, showRemovedToast } = useFavoritesToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Clicou no favorito para produto:', product.name);
    if (isFavorite(product.id)) {
      console.log('Removendo dos favoritos:', product.id);
      removeFromFavorites(product.id);
      showRemovedToast(product.name);
    } else {
      console.log('Adicionando aos favoritos:', product.id);
      addToFavorites(product);
      showAddedToast(product.name);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const isProductFavorite = isFavorite(product.id);
  console.log('Produto', product.name, 'é favorito?', isProductFavorite);

  // Check if the product is sold by meter
  const isSoldByMeter = 
    product.name.toLowerCase().includes('/m') || 
    product.name.toLowerCase().includes('por metro');

  // Check if the price is "Sob Consulta"
  const isPriceOnRequest = product.price === 0 || product.price === null;

  // Clean up the product name to remove the "/m" or "Por Metro" text
  const displayName = product.name;

  return (
    <>
      <div 
        className={`group relative flex flex-col bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden transition-all duration-300 cursor-pointer ${
          isHovered ? 'shadow-lg translate-y-[-4px] border-center-orange/40' : 'shadow-md hover:shadow-lg'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        style={{contain: 'layout style paint'}}
      >
        <div className="relative pt-3 px-3 flex items-center justify-center h-28 sm:h-48 bg-gradient-to-br from-[#252525] to-[#202020]">
          <div className={`absolute inset-0 bg-[#252525] ${isImageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity`} style={{contain: 'layout style paint'}}></div>
          <img
            src={product.image} 
            alt={displayName}
            className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            loading="lazy"
            width="120"
            height="120"
            decoding="async"
            style={{contentVisibility: 'auto'}}
          />
          <div className="absolute top-2 left-2">
            <span className="bg-center-orange text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-medium">
              {product.code}
            </span>
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
              isProductFavorite 
                ? 'bg-center-orange text-white' 
                : 'bg-black/50 text-gray-400 hover:bg-black/70 hover:text-white'
            }`}
            aria-label={isProductFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart 
              size={12} 
              className={`sm:w-[14px] sm:h-[14px] ${isProductFavorite ? 'fill-current' : ''}`}
            />
          </button>
        </div>

        <div className="p-2 sm:p-4 flex flex-col flex-grow">
          <h3 className="font-medium text-white text-xs sm:text-base group-hover:text-center-orange transition-colors mb-1.5 sm:mb-4 line-clamp-2 h-8 sm:h-12">
            {displayName}
          </h3>
          <div className="mt-auto">
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
          </div>
        </div>
      </div>

      <ProductModal 
        product={product}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
