
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

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
        
        <div className="bg-white">
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
                  src="public/lovable-uploads/f1ae756c-7ca2-45df-b7a5-17eb78492bfd.png" 
                  alt="Produtos de alta qualidade" 
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="py-16 bg-center-lightGray">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 text-center-orange rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Loja Física</h3>
                <p className="text-center-gray mb-4">
                  Visite nossa loja física e conheça todos os nossos produtos.
                </p>
                <address className="text-center-darkGray not-italic mt-auto">
                  Rua Jacob Gremmelmaier, 409<br />
                  Centro, Getúlio Vargas - RS, 99900-000
                </address>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 text-center-orange rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Atendimento</h3>
                  <p className="text-center-gray mb-4">
                    Entre em contato por telefone ou WhatsApp para mais informações.
                  </p>
                  <div className="space-y-1 mt-auto">
                    <a 
                      href="tel:5499270560" 
                      className="block text-center-orange font-medium hover:underline"
                    >
                      (54) 9927-0560
                    </a>
                    <a 
                      href="tel:5499986916" 
                      className="block text-center-orange font-medium hover:underline"
                    >
                      (54) 9998-6916
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 text-center-orange rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M22 8.5h-4l-3-3h-6l-3 3H2"></path><path d="M2 11.5h20"></path><path d="M4 11.5v4"></path><path d="M20 11.5v4"></path></svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Orçamentos</h3>
                  <p className="text-center-gray mb-4">
                    Solicite um orçamento personalizado para suas necessidades.
                  </p>
                  <a 
                    href="https://wa.me/5499270560" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-auto bg-center-orange hover:bg-center-orangeLight px-4 py-2 rounded-md font-medium text-white transition-colors"
                  >
                    Solicitar agora
                    <ArrowRight size={16} />
                  </a>
                </div>
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

function ArrowRight(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

export default Index;
