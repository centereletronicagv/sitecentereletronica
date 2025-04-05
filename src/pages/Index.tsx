
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ProductsSection from '../components/ProductsSection';
import { useMediaQuery } from '@/hooks/use-mobile';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Center Eletrônica - Materiais Elétricos e Eletrônicos";
    
    // Extract search query from URL if present
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search') || '';
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
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
        {!searchQuery && <Hero />}
        
        <ProductsSection searchQuery={searchQuery} />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default Index;
