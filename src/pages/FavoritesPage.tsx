
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Meus Favoritos | Center Eletrônica";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-[#181818]">
        <div className="container-custom">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-center-orange" fill="#FF5722" />
              <h1 className="text-3xl font-bold">Meus Favoritos</h1>
            </div>
            <p className="text-gray-400">
              Produtos que você marcou como favorito ({favorites.length} {favorites.length === 1 ? 'item' : 'itens'})
            </p>
          </div>

          {favorites.length > 0 ? (
            <ProductGrid products={favorites} />
          ) : (
            <div className="py-20 text-center">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-medium text-white mb-2">Nenhum favorito encontrado</h2>
              <p className="text-gray-400 mb-8">Você ainda não adicionou nenhum produto aos favoritos.</p>
              <a 
                href="/" 
                className="btn-primary inline-flex items-center justify-center"
              >
                Explorar produtos
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
