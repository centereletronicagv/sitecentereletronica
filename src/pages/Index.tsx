
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

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
        
        <div className="py-12 bg-[#222222]">
          <div className="container-custom">
            <div className="relative rounded-2xl overflow-hidden bg-[#2A2A2A] border border-[#333333] shadow-lg">
              <div className="p-8 md:p-12">
                <span className="text-sm font-medium px-3 py-1 bg-center-orange/10 backdrop-blur-sm rounded-full inline-flex items-center self-start mb-4">
                  <span className="w-2 h-2 bg-center-orange rounded-full mr-2"></span>
                  Qualidade garantida
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                  Produtos de alta qualidade para instalações elétricas e automação
                </h2>
                <p className="text-[#C8C8C9] mb-6 max-w-xl">
                  Trabalhamos apenas com fornecedores confiáveis para garantir 
                  a durabilidade e eficiência dos produtos.
                </p>
                <a 
                  href="https://wa.me/5499270560" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-center-orange hover:bg-center-orangeLight px-4 py-2 rounded-md font-medium transition-colors text-white"
                >
                  Solicitar orçamento
                  <ArrowRight size={16} />
                </a>
              </div>
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
