
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function FavoritesLink() {
  const { favorites } = useFavorites();

  return (
    <Link 
      to="/favoritos" 
      className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors relative"
      aria-label={`Favoritos (${favorites.length} itens)`}
    >
      <Heart size={20} className={favorites.length > 0 ? 'text-center-orange' : ''} />
      <span className="hidden sm:inline">Favoritos</span>
      {favorites.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-center-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {favorites.length}
        </span>
      )}
    </Link>
  );
}
