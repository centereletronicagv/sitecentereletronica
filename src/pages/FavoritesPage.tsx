
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Heart } from 'lucide-react';
import { Product } from '../types';

// This is a placeholder. In a real implementation, favorites would be stored
// and retrieved from localStorage or a backend service
const sampleFavorites: Product[] = [
  {
    id: '1',
    name: 'Abraçadeira 3/4" Tramontina Cinza',
    code: 'ABR-001',
    price: 3.70,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    subcategory: 'abraçadeiras',
    description: 'Abraçadeira para instalações elétricas',
    isFeatured: false,
    inStock: true
  },
  {
    id: '3',
    name: 'Curva Longa 90° 1/2" com Bolsa Tramontina Cinza',
    code: 'CRV-001',
    price: 17.00,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    subcategory: 'curvas',
    description: 'Curva longa para instalações elétricas',
    isFeatured: false,
    inStock: true
  },
];

const FavoritesPage = () => {
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
            <p className="text-gray-400">Produtos que você marcou como favorito</p>
          </div>

          {sampleFavorites.length > 0 ? (
            <ProductGrid products={sampleFavorites} />
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
