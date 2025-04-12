
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { categories, getProductsByCategory } from '../data/products';
import { Product } from '../types';
import ProductGrid from '../components/ProductGrid';
import { useMediaQuery } from '@/hooks/use-mobile';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      // Find category by slug
      const category = categories.find(c => c.slug === slug);
      if (category) {
        setCategoryName(category.name);
        document.title = `${category.name} - Center Eletrônica`;
      }
      
      // Get products by category
      const categoryProducts = getProductsByCategory(slug);
      setProducts(categoryProducts);
    }
  }, [slug]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-16 pb-16' : 'pt-20'}`}>
        <div className="container-custom py-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">
            Categoria: <span className="text-center-orange">{categoryName}</span>
          </h1>
          
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-400">Nenhum produto encontrado nesta categoria.</h3>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
