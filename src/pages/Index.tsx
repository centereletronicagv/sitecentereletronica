
import { useEffect, useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ProductsSection from '../components/ProductsSection';
import { useMediaQuery } from '@/hooks/use-mobile';

// Lazy load non-critical components with explicit loading states
const ContactSection = lazy(() => import('../components/ContactSection'));
const CategorySection = lazy(() => import('../components/CategorySection'));

// Simple lightweight placeholder for lazy-loaded components
const LazyLoadPlaceholder = ({ height }: { height: string }) => (
  <div 
    className="bg-[#181818]" 
    style={{ 
      height, 
      width: '100%',
      contain: 'strict'  // Improve CLS by preventing layout shifts
    }}
  />
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const location = useLocation();
  const { isMobile } = useMediaQuery();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Register performance mark for LCP optimization
    if ('performance' in window) {
      performance.mark('app-ready');
    }
    
    // Mark that initial load is complete after a small delay
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setIsInitialLoad(false);
        
        // Give a bit more time before loading secondary content
        setTimeout(() => {
          setIsContentReady(true);
        }, 300);
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        setIsInitialLoad(false);
        
        setTimeout(() => {
          setIsContentReady(true);
        }, 200);
      }, 100);
    }
    
    return () => {
      if ('performance' in window) {
        performance.clearMarks('app-ready');
      }
    };
  }, []);

  useEffect(() => {
    // Avoid unnecessary scroll that may cause CLS
    const hash = location.hash;
    if (hash) {
      // Use requestAnimationFrame to ensure the DOM is ready
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
      <main className={`flex-grow ${isMobile ? 'pt-14' : 'pt-16 md:pt-20'}`}>
        {!searchQuery && !category && (
          <>
            <Hero />
            {isMobile && (
              <Suspense fallback={<LazyLoadPlaceholder height="36px" />}>
                {!isInitialLoad && <CategorySection />}
              </Suspense>
            )}
          </>
        )}
        
        <ProductsSection searchQuery={searchQuery} category={category} />
        
        {isContentReady && (
          <Suspense fallback={<LazyLoadPlaceholder height="40px" />}>
            <ContactSection />
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Index;
