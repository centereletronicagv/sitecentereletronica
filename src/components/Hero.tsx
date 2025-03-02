
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-white to-center-lightGray dark:from-card dark:to-background hero-triangle">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 reveal-slide-up">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-center-orange/10 text-center-orange">
              <span className="animate-pulse mr-1.5">●</span> Catálogo Digital
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance">
              Artigos para <span className="text-center-orange">Ar Condicionado</span>
            </h1>
            
            <p className="text-lg md:text-xl text-center-gray dark:text-gray-400 max-w-lg">
              Tudo o que você precisa para instalação e manutenção de sistemas de ar condicionado,
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
                src="public/lovable-uploads/0a217023-653b-422c-806e-ea826fee50b0.png" 
                alt="Artigos para Ar Condicionado" 
                className="w-full h-auto object-cover image-loading"
                loading="lazy"
              />
            </div>
            
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-center-orange rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-center-orange rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
        
        <div className="mt-16 py-8 px-6 sm:px-10 rounded-xl bg-white dark:bg-card shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-6">
            {['Suportes', 'Tubulação', 'Dreno', 'Fluidos', 'Conexões', 'Cabeamento', 'Fixação', 'Capacitores', 'Mais'].map((category, index) => (
              <Link 
                key={category}
                to={`/categoria/${category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-lg bg-center-lightGray dark:bg-gray-800 group-hover:bg-center-orange/10 flex items-center justify-center text-center-gray group-hover:text-center-orange transition-colors">
                  <CategoryIcon index={index} />
                </div>
                <span className="text-sm font-medium text-center text-center-darkGray dark:text-gray-300">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/2 h-full bg-center-orange/5 dark:bg-center-orange/2 z-0"></div>
      <div className="absolute top-24 left-6 w-20 h-20 rounded-full bg-center-orange/10 z-0"></div>
      <div className="absolute bottom-32 right-12 w-16 h-16 rounded-full bg-center-orange/20 z-0"></div>
    </section>
  );
}

function CategoryIcon({ index }: { index: number }) {
  const icons = [
    // Suportes
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"></path><path d="M6 18h12"></path><path d="M6 14h12"></path><rect x="6" y="10" width="12" height="12"></rect></svg>,
    // Tubulação
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16v4"></path><path d="M10 16v4"></path><rect x="8" y="9" width="12" height="7" rx="2"></rect><path d="M5 13a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2.5"></path><path d="M19 5a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2"></path><path d="M18 9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"></path></svg>,
    // Dreno
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2h8"></path><path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"></path><path d="M7 15h10"></path></svg>,
    // Fluidos
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 14h8"></path><path d="M6 18h8"></path><path d="M9 22h2"></path><path d="M4 9V5a1 1 0 0 1 1-1h4"></path><path d="M20 9V5a1 1 0 0 0-1-1h-4"></path><rect x="3" y="9" width="18" height="5" rx="2"></rect></svg>,
    // Conexões
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
    // Cabeamento
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8.2s1.3-1.2 3.3-1.2c3 0 5.7 3 8.2 3 1.7 0 2.8-.8 3.5-1.2"></path><path d="M5 15.8s1.3 1.2 3.3 1.2c3 0 5.7-3 8.2-3 1.7 0 2.8.8 3.5 1.2"></path><path d="M19 4v16"></path><path d="M5 4v16"></path></svg>,
    // Fixação
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-6"></path><path d="M12 8V2"></path><path d="M4 12H2"></path><path d="M10 12H8"></path><path d="M16 12h-2"></path><path d="M22 12h-2"></path><path d="m15 19-3 3-3-3"></path><path d="m15 5-3-3-3 3"></path><path d="m19 15 3 3-3 3"></path><path d="m19 9 3-3-3-3"></path><path d="m5 15-3 3 3 3"></path><path d="m5 9-3-3 3-3"></path></svg>,
    // Capacitores
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="6" x2="6" y1="18" y2="22"></line><line x1="18" x2="18" y1="18" y2="22"></line></svg>,
    // Mais
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v12"></path><path d="M6 12h12"></path></svg>,
  ];

  return icons[index] || icons[8];
}
