
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-[#252a33]"> {/* Changed background color */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 reveal-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance">
              Produtos <span className="text-center-orange">Eletrônicos</span>
            </h1>
            
            <p className="text-lg md:text-xl text-center-gray dark:text-gray-400 max-w-lg">
              Loja de produtos Elétricos, Eletrônicos, Automação, Informática e mais,
              com qualidade e preços competitivos.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/categoria/suportes" 
                className="btn-primary"
              >
                Ver Produtos
              </Link>
              <a 
                href="https://wa.me/5499270560" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-center-darkGray dark:text-gray-300 font-medium hover:text-center-orange transition-colors"
              >
                Faça seu pedido
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-center-orange/10 flex items-center justify-center text-center-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                </div>
                <div>
                  <p className="font-medium text-center-darkGray dark:text-gray-300">Suportes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-center-orange/10 flex items-center justify-center text-center-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 6H3"></path><path d="M10 12H3"></path><path d="M10 18H3"></path><circle cx="17" cy="12" r="3"></circle><path d="M14 19a3 3 0 1 0 6 0v-7a3 3 0 1 0-6 0v7z"></path></svg>
                </div>
                <div>
                  <p className="font-medium text-center-darkGray dark:text-gray-300">Tubulação</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-center-orange/10 flex items-center justify-center text-center-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a4.2 4.2 0 0 0 4 4 4.2 4.2 0 0 1 3 2 4.2 4.2 0 0 1 0 4 4.2 4.2 0 0 1-3 2 4.2 4.2 0 0 0-4 4 4.2 4.2 0 0 1-2 3 4.2 4.2 0 0 1-4 0 4.2 4.2 0 0 1-2-3 4.2 4.2 0 0 0-4-4 4.2 4.2 0 0 1-3-2 4.2 4.2 0 0 1 0-4 4.2 4.2 0 0 1 3-2 4.2 4.2 0 0 0 4-4 4.2 4.2 0 0 1 2-3 4.2 4.2 0 0 1 4 0 4.2 4.2 0 0 1 2 3z"></path></svg>
                </div>
                <div>
                  <p className="font-medium text-center-darkGray dark:text-gray-300">Fluidos</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative reveal-slide-up">
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="/lovable-uploads/d4b35ea4-3198-4c10-b669-1f4f4afd3055.png" 
                alt="Fachada da Center Eletrônica" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 pb-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-800 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 text-white">Loja Física</h3>
            <p className="text-gray-400 mb-4">
              Visite nossa loja física e conheça todos os nossos produtos.
            </p>
            <address className="text-gray-300 not-italic mt-auto">
              Rua Jacob Gremmelmaier, 409<br />
              Centro, Getúlio Vargas - RS, 99900-000
            </address>
          </div>

          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-800 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 text-white">Atendimento</h3>
            <p className="text-gray-400 mb-4">
              Entre em contato por telefone ou WhatsApp para mais informações.
            </p>
            <div className="space-y-2 mt-auto">
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

          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-800 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M22 8.5h-4l-3-3h-6l-3 3H2"></path>
                <path d="M2 11.5h20"></path>
                <path d="M4 11.5v4"></path>
                <path d="M20 11.5v4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2 text-white">Orçamentos</h3>
            <p className="text-gray-400 mb-4">
              Solicite um orçamento personalizado para suas necessidades.
            </p>
            <div className="mt-auto w-full">
              <a 
                href="https://wa.me/5499270560" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-1.5 bg-center-orange hover:bg-center-orangeLight px-4 py-2 rounded-md font-medium text-white transition-colors"
              >
                Solicitar agora
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
