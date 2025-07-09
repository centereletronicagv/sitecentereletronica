
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import MobileCategoryDrawer from './MobileCategoryDrawer';

export default function Hero() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  
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
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center min-h-[400px]">
          <div className="flex flex-col gap-4 md:gap-6 md:max-w-2xl flex-1">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight">
              Center <span className="text-center-orange">Eletrônica</span> 
              <span className="relative inline-block">
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-center-orange opacity-30 rounded-full"></span>
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
              Aqui você encontra uma ampla linha de produtos Elétricos, Eletrônicos, de Automação e Informática, selecionados com rigor para garantir qualidade, inovação e desempenho.
            </p>
            
            <div className="flex justify-center md:justify-start mt-4 md:mt-6">
              <button 
                onClick={() => setIsDepartmentsOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-center-orange to-center-orangeLight hover:from-center-orangeLight hover:to-center-orange text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-lg border border-center-orange/20"
              >
                <Menu className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                <span>Departamentos</span>
                <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
          
          <div className="md:w-2/5 lg:w-1/3 rounded-lg overflow-hidden shadow-2xl mt-4 md:mt-0 h-auto relative flex-shrink-0" style={{minHeight: '250px'}}>
            {/* Placeholder/skeleton */}
            <div className={`absolute inset-0 bg-[#252525] animate-pulse ${isImageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity`}></div>
            
            <div className="relative rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-600/60 transition-colors">
              <img 
                src="/lovable-uploads/00b83df6-8857-4892-a9a5-37085b5cf813.png" 
                alt="Loja Center Eletrônica" 
                className={`w-full h-auto object-cover rounded-lg transition-all duration-500 hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                width="500"
                height="350"
                style={{
                  aspectRatio: '500/350',
                  objectFit: 'cover'
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Category Drawer */}
      <MobileCategoryDrawer 
        open={isDepartmentsOpen} 
        onOpenChange={setIsDepartmentsOpen} 
      />
    </section>
  );
}
