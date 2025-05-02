
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    // Pré-carrega a imagem do hero
    const img = new Image();
    img.src = "/lovable-uploads/00b83df6-8857-4892-a9a5-37085b5cf813.png";
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <section className="w-full bg-[#181818] pt-16 pb-8 md:pt-24 md:pb-14 relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#181818] to-transparent opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[#181818] bg-opacity-20 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
          <div className="flex flex-col gap-2 md:gap-4 md:max-w-2xl">
            <div className="inline-flex gap-2 items-center">
              <div className="h-1 w-8 bg-center-orange rounded-full"></div>
              <span className="text-center-orange text-sm md:text-base font-medium">Center Eletrônica</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              Produtos <span className="text-center-orange">Eletrônicos</span> 
              <span className="relative inline-block">
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-center-orange opacity-30 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-sm md:text-lg text-gray-300 max-w-2xl">
              Loja de produtos Elétricos, Eletrônicos, Automação, Informática e mais, com qualidade e preços competitivos.
            </p>
            
            <div className="flex flex-wrap gap-2 md:gap-3 mt-1 md:mt-2">
              <Link 
                to="/categoria/ar-condicionado" 
                className="btn-primary flex items-center gap-1 text-xs md:text-base py-1.5 md:py-2.5 px-3 md:px-5 group"
              >
                Ver Produtos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                to="/categoria/ar-condicionado" 
                className="inline-flex items-center gap-1 px-3 md:px-5 py-1.5 md:py-2.5 text-white bg-[#252525] hover:bg-[#333333] rounded-md transition-colors text-xs md:text-base group"
              >
                Faça seu pedido
                <ArrowRight size={14} className="md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-3 md:gap-8 mt-4 md:mt-6">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-center-orange/20 text-center-orange rounded">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
                    <path d="M9 12h6" />
                    <path d="M13 8L9 12l4 4" />
                  </svg>
                </div>
                <span className="text-xs md:text-base text-gray-300">Suportes</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-center-orange/20 text-center-orange rounded">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="6" height="14" x="4" y="5" rx="2" />
                    <rect width="6" height="10" x="14" y="9" rx="2" />
                    <path d="M4 15h16" />
                  </svg>
                </div>
                <span className="text-xs md:text-base text-gray-300">Tubulação</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-center-orange/20 text-center-orange rounded">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8Z" />
                    <path d="M20 10c0 4.4-3.6 8-8 8s-8-3.6-8-8" />
                  </svg>
                </div>
                <span className="text-xs md:text-base text-gray-300">Fluídos</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/5 rounded-lg overflow-hidden shadow-2xl mt-2 md:mt-0 h-auto relative group" style={{minHeight: '200px'}}>
            {/* Placeholder/skeleton */}
            <div className={`absolute inset-0 bg-[#252525] animate-pulse ${isImageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity`}></div>
            
            {/* Orange glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-center-orange to-center-orangeLight opacity-75 blur-sm group-hover:opacity-100 group-hover:blur transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative rounded-lg overflow-hidden border border-gray-700/50">
              <img 
                src="/lovable-uploads/00b83df6-8857-4892-a9a5-37085b5cf813.png" 
                alt="Loja Center Eletrônica" 
                className={`w-full h-auto object-cover rounded-lg transition-all duration-500 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                width="500"
                height="350"
                fetchPriority="high"
                style={{
                  aspectRatio: '500/350',
                  objectFit: 'cover'
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-3 md:p-4">
                <span className="text-xs md:text-sm text-gray-300 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
                  Nossa Loja Física
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
