import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Wind, Plug, Terminal, Router, ChevronDown, ChevronRight, ShoppingCart } from 'lucide-react';
import { Input } from './ui/input';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';
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
    name: 'Terminais', 
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
  { name: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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
      navigate(link.href);
      setIsMenuOpen(false);
    }
    else {
      toggleCategory(link.name);
    }
  };

  return (
    <header className="w-full">
      <div 
        className={`w-full fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#181818] shadow-md border-b border-[#333333]' 
            : 'bg-[#181818]'
        }`}
      >
        <div className="container-custom py-3">
          <div className="flex items-center justify-between gap-2">
            <Link 
              to="/" 
              className="flex items-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center">
                <svg 
                  className="h-6 w-6 md:h-8 md:w-8 text-center-orange" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2L2 12h3v8h14v-8h3L12 2z" />
                </svg>
                <span className="ml-1.5 text-base md:text-xl font-display font-semibold tracking-tight text-white">
                  Center <span className="text-center-orange">Eletrônica</span>
                </span>
              </div>
            </Link>

            <div className="flex-1 max-w-xl hidden sm:block">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Olá, o que você procura hoje?"
                  className="pl-4 pr-12 py-2.5 w-full bg-[#252525] border-[#3a3a3a] border-[1px] rounded-full text-white focus-visible:ring-center-orange placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-center-orange"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a 
                href="tel:5499270560" 
                className="flex items-center gap-1.5 text-gray-300 hover:text-center-orange transition-colors"
              >
                <span className="text-sm font-medium">54 9927-0560</span>
              </a>
              
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-center-orange transition-colors relative"
                >
                  <ShoppingCart size={20} />
                  <span className="text-sm font-medium">Carrinho</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-center-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 md:hidden">
              <button 
                className="p-1.5 text-gray-300 bg-[#333333] rounded-full"
                onClick={handleMobileSearchOpen}
                aria-label="Buscar"
              >
                <Search size={16} />
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-gray-300 bg-[#333333] rounded-full relative"
                aria-label="Carrinho"
              >
                <ShoppingCart size={16} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-center-orange text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 text-gray-300 bg-[#333333] rounded-full"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>

          <nav className="hidden md:block mt-4 border-t border-[#333333] pt-4">
            <ul className="flex items-center gap-12">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`flex items-center gap-2 py-2 text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? 'text-center-orange'
                        : 'text-gray-300 hover:text-center-orange'
                    }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                    {link.name !== 'Início' && link.name !== 'Contato' && <ChevronDown size={14} />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-40 bg-[#222222] transform transition-transform duration-300 ease-in-out pt-16 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-custom py-4">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 w-full bg-[#333333] border-0 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          <nav className="flex flex-col gap-2">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-[#333333]">
                  {link.subCategories && link.name !== 'Início' && link.name !== 'Contato' ? (
                    <Collapsible
                      open={openCategories[link.name] || false}
                      onOpenChange={() => toggleCategory(link.name)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div 
                          className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-md transition-colors ${
                            location.pathname === link.href
                              ? 'text-center-orange'
                              : 'text-gray-300 hover:bg-[#333333]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {link.icon && link.icon}
                            {link.name}
                          </div>
                          <ChevronDown 
                            size={16}
                            className={`transition-transform duration-200 ${
                              openCategories[link.name] ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-l-2 border-[#333333] ml-4 pl-4 py-2 space-y-2">
                          <Link
                            to={link.href}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-center-orange rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Ver todos
                          </Link>
                          {link.subCategories.map((subCat) => (
                            <Link
                              key={subCat.name}
                              to={subCat.href}
                              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-center-orange rounded-md"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <ChevronRight size={14} />
                              {subCat.name}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 text-base font-medium rounded-md transition-colors ${
                        location.pathname === link.href
                          ? 'bg-center-orange/10 text-center-orange'
                          : 'text-gray-300 hover:bg-[#333333]'
                      }`}
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-[#333333]">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-300 hover:bg-[#333333] rounded-md w-full text-left"
              >
                <ShoppingCart size={18} />
                <span>Carrinho</span>
                {getTotalItems() > 0 && (
                  <span className="ml-auto bg-center-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
            
            <a 
              href="tel:5499270560" 
              className="mt-2 flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-center-orange rounded-md"
            >
              <span>Ligar: 54 9927-0560</span>
            </a>
          </nav>
        </div>
      </div>

      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />

      <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
        <DialogContent className="sm:max-w-md border-[#333333] bg-[#1E1E1E] p-0 overflow-hidden">
          <div className="p-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="O que você procura hoje?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 w-full bg-[#252525] border-[#3a3a3a] text-white focus-visible:ring-center-orange placeholder:text-gray-400"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-center-orange"
              >
                <Search size={20} />
              </button>
            </form>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Pesquisas populares:</h4>
              <div className="flex flex-wrap gap-2">
                {['Capacitor', 'Tubulação', 'Disjuntor', 'Suporte', 'Fita'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(new Event('submit') as unknown as FormEvent);
                    }}
                    className="px-3 py-1 bg-[#252525] hover:bg-[#333333] text-gray-300 text-xs rounded-full transition-colors"
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
