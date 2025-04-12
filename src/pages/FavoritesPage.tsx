
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { useLocalStorage } from '@/hooks/use-mobile';
import { Product } from '../types';
import { getAllProducts } from '@/data/products';

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<string[]>("favorites", []);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Favoritos - Center Eletrônica";
    
    // Get all products and filter by favorites
    const allProducts = getAllProducts();
    const favProducts = allProducts.filter(product => favoriteIds.includes(product.id));
    setFavoriteProducts(favProducts);
  }, [favoriteIds]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-16 pb-16' : 'pt-20'}`}>
        <div className="container-custom py-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">
            Meus <span className="text-center-orange">Favoritos</span>
          </h1>
          
          {favoriteProducts.length > 0 ? (
            <ProductGrid products={favoriteProducts} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-400 mb-4">Você ainda não possui produtos favoritos.</h3>
              <Link to="/" className="inline-flex items-center px-5 py-2.5 bg-center-orange hover:bg-center-orange-dark text-white font-medium rounded-md transition-colors">
                Explorar produtos
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
