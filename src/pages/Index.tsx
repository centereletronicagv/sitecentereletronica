
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ProductsSection from '../components/ProductsSection';
import CategorySection from '../components/CategorySection';
import { useMediaQuery } from '@/hooks/use-mobile';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const location = useLocation();
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    // Evita o scroll desnecessário que pode causar CLS
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
    
    document.title = "Center Eletrônica - Materiais Elétricos e Eletrônicos";
    
    // Extract search query from URL if present
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search') || '';
    const categoryFromUrl = params.get('category') || undefined;
    
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
    
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    } else {
      setCategory(undefined);
    }
  }, [location]);

  useEffect(() => {
    // Listen for search events from the navbar
    const handleSearch = (event: CustomEvent) => {
      setSearchQuery(event.detail.query);
    };

    window.addEventListener('product-search', handleSearch as EventListener);
    
    return () => {
      window.removeEventListener('product-search', handleSearch as EventListener);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-14' : 'pt-16 md:pt-20'}`}>
        {!searchQuery && !category && (
          <>
            <Hero />
            {isMobile && <CategorySection />}
          </>
        )}
        
        <ProductsSection searchQuery={searchQuery} category={category} />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default Index;
