
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ProductsSection from '../components/ProductsSection';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Center Eletrônica - Materiais Elétricos e Eletrônicos";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <ProductsSection />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
