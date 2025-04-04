
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsSection from '../components/ProductsSection';
import { CATEGORY_LABELS } from '@/utils/productCategories';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = slug ? (CATEGORY_LABELS[slug] || slug) : '';
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${categoryName} | Center Eletrônica`;
  }, [categoryName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <ProductsSection categorySlug={slug} />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
