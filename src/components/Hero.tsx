
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="w-full bg-[#181818] pt-6 pb-14">
      <div className="container-custom">
        <div className="flex flex-col gap-4 md:max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Produtos <span className="text-center-orange">Eletrônicos</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl">
            Loja de produtos Elétricos, Eletrônicos, Automação, Informática e mais, com qualidade e preços competitivos.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-2">
            <Link 
              to="/produtos" 
              className="btn-primary flex items-center gap-1.5"
            >
              Ver Produtos
            </Link>
            
            <Link 
              to="/contato" 
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white bg-[#252525] hover:bg-[#333333] rounded-md transition-colors"
            >
              Faça seu pedido
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center bg-center-orange/20 text-center-orange rounded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
                  <path d="M9 12h6" />
                  <path d="M13 8L9 12l4 4" />
                </svg>
              </div>
              <span className="text-gray-300">Suportes</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center bg-center-orange/20 text-center-orange rounded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="6" height="14" x="4" y="5" rx="2" />
                  <rect width="6" height="10" x="14" y="9" rx="2" />
                  <path d="M4 15h16" />
                </svg>
              </div>
              <span className="text-gray-300">Tubulação</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center bg-center-orange/20 text-center-orange rounded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8Z" />
                  <path d="M20 10c0 4.4-3.6 8-8 8s-8-3.6-8-8" />
                </svg>
              </div>
              <span className="text-gray-300">Fluídos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
