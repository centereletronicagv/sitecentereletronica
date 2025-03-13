
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Center Eletrônica - Artigos para Ar Condicionado";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="py-12 bg-center-lightGray">
          <div className="container-custom">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-center-darkGray/80 to-transparent z-10"></div>
              <div className="relative z-20 p-8 md:p-12 flex flex-col max-w-xl text-white">
                <span className="text-sm font-medium px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full inline-flex items-center self-start mb-4">
                  <span className="w-2 h-2 bg-center-orange rounded-full mr-2"></span>
                  Qualidade garantida
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Produtos de alta qualidade para sistemas de ar condicionado
                </h2>
                <p className="text-white/80 mb-6">
                  Trabalhamos apenas com fornecedores confiáveis para garantir 
                  a durabilidade e eficiência dos produtos.
                </p>
                <a 
                  href="https://wa.me/5499270560" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start bg-center-orange hover:bg-center-orangeLight px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Solicitar orçamento
                  <ArrowRight size={16} />
                </a>
              </div>
              <img 
                src="/lovable-uploads/f1ae756c-7ca2-45df-b7a5-17eb78492bfd.png" 
                alt="Produtos de alta qualidade" 
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
