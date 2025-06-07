
import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Wind, Plug, Terminal, Router, ChevronDown, ChevronRight, ShoppingCart, Grid2X2, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';
import MobileCategoryDrawer from './MobileCategoryDrawer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface NavLink {
  name: string;
  href: string;
  icon?: JSX.Element;
  subCategories?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: 'Início', href: '/' },
  { 
    name: 'Ar Condicionado', 
    href: '/categoria/ar-condicionado', 
    icon: <Wind size={16} />,
    subCategories: [
      { name: 'Tubulação', href: '/categoria/ar-condicionado/tubulacao' },
      { name: 'Suportes', href: '/categoria/ar-condicionado/suportes' },
      { name: 'Gases', href: '/categoria/ar-condicionado/gases' },
    ]
  },
  { 
    name: 'Instalações Elétricas', 
    href: '/categoria/instalacoes-eletricas', 
    icon: <Plug size={16} />,
    subCategories: [
      { name: 'Fios e Cabos', href: '/categoria/instalacoes-eletricas/fios' },
      { name: 'Disjuntores', href: '/categoria/instalacoes-eletricas/disjuntores' },
    ]
  },
  { 
    name: 'Terminais e Conectores', 
    href: '/categoria/terminais', 
    icon: <Terminal size={16} />,
    subCategories: [
      { name: 'Conectores', href: '/categoria/terminais/conectores' },
      { name: 'Terminais Ilhós', href: '/categoria/terminais/ilhos' },
    ]
  },
  { 
    name: 'Automação', 
    href: '/categoria/automacao', 
    icon: <Router size={16} />,
    subCategories: [
      { name: 'Relés', href: '/categoria/automacao/reles' },
      { name: 'Controladores', href: '/categoria/automacao/controladores' },
    ]
  },
  { name: 'Contato', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<{[key: string]: boolean}>({});
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') return;

    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
    
    window.dispatchEvent(new CustomEvent('product-search', { 
      detail: { query: searchQuery } 
    }));
    
    console.log('Searching for:', searchQuery);
    setIsMobileSearchOpen(false);
  };

  const handleMobileSearchOpen = () => {
    console.log('Open mobile search');
    setIsMobileSearchOpen(true);
  };

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleCategoryClick = (link: NavLink) => {
    if (!link.subCategories || link.name === 'Início' || link.name === 'Contato') {
      if (link.name === 'Contato') {
        scrollToContact();
      } else {
        navigate(link.href);
      }
      setIsMenuOpen(false);
    }
    else {
      toggleCategory(link.name);
    }
  };
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#contact');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full">
      <div 
        className={`w-full fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#181818]/95 backdrop-blur-md shadow-lg border-b border-[#333333]' 
            : 'bg-[#181818]/90 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom py-3">
          <div className="flex items-center justify-between gap-4">
            <Link 
              to="/" 
              className="flex items-center transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 group"
            >
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/logonova.png" 
                  alt="Center Eletrônica Logo" 
                  className="h-7 w-auto md:h-8 transition-transform duration-300 group-hover:rotate-3"
                />
                <span className="ml-2 text-base md:text-xl font-display font-semibold tracking-tight text-white">
                  Center <span className="text-center-orange">Eletrônica</span>
                </span>
              </div>
            </Link>

            <div className="flex-1 max-w-2xl hidden sm:block">
              <form onSubmit={handleSearch} className="relative group">
                <Input
                  type="search"
                  placeholder="Olá, o que você procura hoje?"
                  className="pl-4 pr-12 py-3 w-full bg-[#252525]/80 backdrop-blur-sm border-[#3a3a3a] border-[1px] rounded-full text-white focus-visible:ring-center-orange focus-visible:border-center-orange placeholder:text-gray-400 transition-all duration-300 group-hover:bg-[#2a2a2a]/90"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-gray-400 hover:text-center-orange transition-all duration-300 hover:scale-110"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a 
                href="tel:5499270560" 
                className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-[#252525]/50"
              >
                <Phone size={16} />
                <span className="text-sm font-medium whitespace-nowrap">54 9927-0560</span>
              </a>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-all duration-300 relative px-3 py-2 rounded-lg hover:bg-[#252525]/50 hover:scale-105"
                >
                  <ShoppingCart size={20} />
                  <span className="text-sm font-medium">Carrinho</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-center-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button 
                className="p-2 text-gray-300 bg-[#333333]/80 backdrop-blur-sm rounded-lg hover:bg-[#404040] transition-all duration-300 hover:scale-105"
                onClick={() => setIsCategoryDrawerOpen(true)}
                aria-label="Categorias"
              >
                <Grid2X2 size={16} />
              </button>
              
              <button 
                className="p-2 text-gray-300 bg-[#333333]/80 backdrop-blur-sm rounded-lg hover:bg-[#404040] transition-all duration-300 hover:scale-105"
                onClick={handleMobileSearchOpen}
                aria-label="Buscar"
              >
                <Search size={16} />
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-300 bg-[#333333]/80 backdrop-blur-sm rounded-lg hover:bg-[#404040] transition-all duration-300 relative hover:scale-105"
                aria-label="Carrinho"
              >
                <ShoppingCart size={16} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-center-orange text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-[10px] animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 bg-[#333333]/80 backdrop-blur-sm rounded-lg hover:bg-[#404040] transition-all duration-300 hover:scale-105"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          <nav className="hidden md:block mt-4 border-t border-[#333333]/50 pt-4">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  {link.name === 'Contato' ? (
                    <button
                      onClick={scrollToContact}
                      className="flex items-center gap-2 py-2 px-3 text-sm font-medium transition-all duration-300 text-gray-300 hover:text-center-orange rounded-lg hover:bg-[#252525]/50 hover:scale-105"
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`flex items-center gap-2 py-2 px-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-[#252525]/50 hover:scale-105 ${
                        location.pathname === link.href
                          ? 'text-center-orange bg-[#252525]/30'
                          : 'text-gray-300 hover:text-center-orange'
                      }`}
                    >
                      {link.icon && link.icon}
                      {link.name}
                      {link.name !== 'Início' && link.name !== 'Contato' && (
                        <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-gradient-to-b from-[#1a1a1a] to-[#222222] transform transition-transform duration-300 ease-in-out pt-16 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#333333]/80 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-[#404040] transition-all duration-300"
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
        
        <div className="container-custom py-6">
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-12 pr-4 py-4 w-full bg-[#333333]/80 backdrop-blur-sm border-[#404040] text-white rounded-xl focus-visible:ring-center-orange placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </form>
          </div>

          <nav className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-[#333333]/50 last:border-b-0">
                {link.name === 'Contato' ? (
                  <button
                    onClick={scrollToContact}
                    className="flex items-center gap-3 px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 text-gray-300 hover:bg-[#333333]/50 hover:text-center-orange w-full text-left hover:scale-[1.02]"
                  >
                    {link.icon && <span className="text-center-orange">{link.icon}</span>}
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                      location.pathname === link.href
                        ? 'bg-center-orange/10 text-center-orange border border-center-orange/20'
                        : 'text-gray-300 hover:bg-[#333333]/50 hover:text-center-orange'
                    }`}
                  >
                    {link.icon && <span className={location.pathname === link.href ? 'text-center-orange' : 'text-gray-400'}>{link.icon}</span>}
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="mt-6 pt-6 border-t border-[#333333]/50 space-y-3">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-4 text-lg font-medium text-gray-300 hover:bg-[#333333]/50 hover:text-center-orange rounded-xl w-full text-left transition-all duration-300 hover:scale-[1.02]"
              >
                <ShoppingCart size={20} className="text-gray-400" />
                <span>Carrinho</span>
                {getTotalItems() > 0 && (
                  <span className="ml-auto bg-center-orange text-white text-sm w-6 h-6 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <a 
                href="tel:5499270560" 
                className="flex items-center gap-3 px-4 py-4 text-lg font-medium text-white bg-gradient-to-r from-center-orange to-center-orangeLight rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <Phone size={20} />
                <span>Ligar: 54 9927-0560</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
      <MobileCategoryDrawer open={isCategoryDrawerOpen} onOpenChange={setIsCategoryDrawerOpen} />

      <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
        <DialogContent className="sm:max-w-md border-[#333333] bg-gradient-to-b from-[#1E1E1E] to-[#252525] p-0 overflow-hidden rounded-2xl">
          <div className="p-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="O que você procura hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 w-full bg-[#252525]/80 backdrop-blur-sm border-[#3a3a3a] text-white focus-visible:ring-center-orange placeholder:text-gray-400 rounded-xl py-4"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-gray-400 hover:text-center-orange transition-all duration-300 hover:scale-110"
              >
                <Search size={20} />
              </button>
            </form>

            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-300 mb-4">Pesquisas populares:</h4>
              <div className="flex flex-wrap gap-2">
                {['Capacitor', 'Tubulação', 'Disjuntor', 'Suporte', 'Fita'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(new Event('submit') as unknown as FormEvent);
                    }}
                    className="px-4 py-2 bg-[#252525]/80 hover:bg-[#333333] text-gray-300 hover:text-center-orange text-sm rounded-full transition-all duration-300 hover:scale-105"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
