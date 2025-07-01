
import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ProductsSection from '../components/ProductsSection';
import CategoryButtons from '../components/CategoryButtons';
import { useMediaQuery } from '@/hooks/use-mobile';

// Lazy load non-critical components
const ContactSection = lazy(() => import('../components/ContactSection'));
const CategorySection = lazy(() => import('../components/CategorySection'));

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const location = useLocation();
  const { isMobile } = useMediaQuery();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Mark that initial load is complete after a small delay
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Avoid unnecessary scroll that may cause CLS
    const hash = location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
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
      <main className={`flex-grow ${isMobile ? 'pt-14' : 'pt-16 md:pt-20'} bg-[#181818]`}>
        {!searchQuery && !category && (
          <>
            <Hero />
            <CategoryButtons />
            {isMobile && (
              <Suspense fallback={<div className="h-36 bg-[#181818]"></div>}>
                {!isInitialLoad && <CategorySection />}
              </Suspense>
            )}
          </>
        )}
        
        <ProductsSection searchQuery={searchQuery} category={category} />
        
        <Suspense fallback={<div className="h-40 bg-[#181818]"></div>}>
          {!isInitialLoad && <ContactSection />}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default Index;
