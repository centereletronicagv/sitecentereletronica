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

  const handleDepartmentsClick = () => {
    // Scroll to categories section
    const categoriesSection = document.querySelector('[data-section="categories"]');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const whatsappNumber = "5511999999999"; // Update this with the actual store number
    const message = "Olá! Gostaria de fazer um pedido.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="w-full bg-[#181818] pt-21 pb-8 md:pt-24 md:pb-14 relative overflow-hidden">
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
            
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 mt-4 md:mt-6">
              <button 
                onClick={handleDepartmentsClick}
                className="btn-primary flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base py-2 sm:py-3 md:py-3 px-3 sm:px-6 md:px-8 group font-medium flex-1 sm:flex-none justify-center"
              >
                Ver Departamentos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              
              <button 
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-3 text-white bg-[#252525] hover:bg-[#333333] rounded-md transition-colors text-xs sm:text-sm md:text-base group font-medium border border-[#333333] hover:border-[#404040] flex-1 sm:flex-none justify-center"
              >
                Entre em Contato
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4" />
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
    </section>
  );
}
