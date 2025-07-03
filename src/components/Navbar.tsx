
import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Wind, Plug, Terminal, Router, MessageCircle, Monitor, Eye, ShoppingCart } from 'lucide-react';
import { Input } from './ui/input';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';
import MobileCategoryDrawer from './MobileCategoryDrawer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { DownloadCategoryButton } from './DownloadCategoryButton';
import { products as allProducts } from '@/data/products';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

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
  { 
    name: 'Informática', 
    href: '/categoria/informatica', 
    icon: <Monitor size={16} />,
    subCategories: [
      { name: 'Cabos', href: '/categoria/informatica/cabos' },
      { name: 'Conectores', href: '/categoria/informatica/conectores' },
    ]
  },
  { 
    name: 'Monitoramento', 
    href: '/categoria/monitoramento', 
    icon: <Eye size={16} />,
    subCategories: [
      { name: 'Câmeras', href: '/categoria/monitoramento/cameras' },
      { name: 'DVRs', href: '/categoria/monitoramento/dvrs' },
    ]
  },
];

// Helper function to get category info from URL
const getCategoryInfo = (pathname: string) => {
  const categoryMatch = pathname.match(/\/categoria\/([^/]+)/);
  if (!categoryMatch) return null;
  
  const categoryId = categoryMatch[1];
  const categoryMap: { [key: string]: string } = {
    'ar-condicionado': 'Ar Condicionado',
    'instalacoes-eletricas': 'Instalações Elétricas',
    'terminais': 'Terminais e Conectores',
    'automacao': 'Automação',
    'informatica': 'Informática',
    'monitoramento': 'Monitoramento'
  };
  
  return {
    id: categoryId,
    name: categoryMap[categoryId] || categoryId
  };
};

const ListItem = ({ className, title, children, href, ...props }: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const isMobile = useIsMobile();

  // Get current category info
  const currentCategory = getCategoryInfo(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
    
    setIsMobileSearchOpen(false);
  };

  const handleMobileSearchOpen = () => {
    setIsMobileSearchOpen(true);
  };
  
  const handleWhatsAppClick = () => {
    const phoneNumber = '5499270560';
    const message = 'Olá! Gostaria de mais informações sobre os produtos da Center Eletrônica.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="w-full">
      <div 
        className={cn(
          "w-full fixed top-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out",
          scrolled 
            ? 'bg-[#181818]/95 backdrop-blur-md shadow-lg border-b border-[#333333]/50' 
            : 'bg-[#181818]'
        )}
      >
        <div className="container-custom py-3">
          <div className="flex items-center justify-between gap-2">
            <Link 
              to="/" 
              className="flex items-center transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/logonova.png" 
                  alt="Center Eletrônica Logo" 
                  className="h-7 w-auto md:h-8 transition-transform duration-300"
                />
                <span className="ml-1.5 text-base md:text-xl font-display font-semibold tracking-tight text-white">
                  Center <span className="text-center-orange">Eletrônica</span>
                </span>
              </div>
            </Link>

            <div className="flex-1 max-w-xl hidden sm:block">
              <form onSubmit={handleSearch} className="relative group">
                <Input
                  type="search"
                  placeholder="Olá, o que você procura hoje?"
                  className="pl-4 pr-12 py-2.5 w-full bg-[#252525]/80 backdrop-blur-sm border-[#3a3a3a] border-[1px] rounded-full text-white focus-visible:ring-center-orange focus-visible:ring-2 focus-visible:border-center-orange placeholder:text-gray-400 transition-all duration-300 group-hover:bg-[#252525] focus:bg-[#252525]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-center-orange transition-colors duration-200"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4">
                {currentCategory && (
                  <DownloadCategoryButton 
                    products={allProducts.filter(product => product.category === currentCategory.id)}
                    categoryName={currentCategory.name}
                  />
                )}
                
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-center-orange transition-all duration-200 hover:scale-105"
                >
                  <MessageCircle size={16} />
                  <span className="text-sm font-medium">Contato</span>
                </button>
              </div>
              
              <div className="flex items-center gap-5">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-center-orange transition-all duration-200 hover:scale-105 relative"
                >
                  <ShoppingCart size={20} />
                  <span className="text-sm font-medium">Carrinho</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-center-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button 
                className="p-1.5 text-gray-300 bg-[#333333]/80 backdrop-blur-sm rounded-full hover:bg-[#333333] transition-all duration-200 hover:scale-110"
                onClick={handleMobileSearchOpen}
                aria-label="Buscar"
              >
                <Search size={16} />
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-gray-300 bg-[#333333]/80 backdrop-blur-sm rounded-full hover:bg-[#333333] transition-all duration-200 hover:scale-110 relative"
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
                className="p-1.5 text-gray-300 bg-[#333333]/80 backdrop-blur-sm rounded-full hover:bg-[#333333] transition-all duration-200 hover:scale-110"
                aria-label="Menu"
              >
                <div className="relative w-4 h-4">
                  <span className={cn(
                    "absolute h-0.5 w-4 bg-current transition-all duration-300",
                    isMenuOpen ? "top-1.5 rotate-45" : "top-0"
                  )} />
                  <span className={cn(
                    "absolute top-1.5 h-0.5 w-4 bg-current transition-all duration-300",
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  )} />
                  <span className={cn(
                    "absolute h-0.5 w-4 bg-current transition-all duration-300",
                    isMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                  )} />
                </div>
              </button>
            </div>
          </div>

          <nav className="hidden md:block mt-4 border-t border-[#333333]/50 pt-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className={cn(
                      "flex items-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200",
                      location.pathname === '/'
                        ? 'text-center-orange bg-center-orange/10'
                        : 'text-gray-300 hover:text-center-orange hover:bg-[#333333]/50'
                    )}
                  >
                    Início
                  </Link>
                </NavigationMenuItem>
                
                {navLinks.slice(1).map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuTrigger 
                      className={cn(
                        "flex items-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 bg-transparent hover:bg-[#333333]/50 data-[active]:bg-center-orange/10 data-[state=open]:bg-[#333333]/50",
                        location.pathname === link.href
                          ? 'text-center-orange'
                          : 'text-gray-300 hover:text-center-orange'
                      )}
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#1E1E1E] border-[#333333]">
                        <div className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-center-orange/20 to-center-orange/10 p-6 no-underline outline-none focus:shadow-md hover:from-center-orange/30 hover:to-center-orange/20 transition-all duration-200"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium text-white">
                                {link.name}
                              </div>
                              <p className="text-sm leading-tight text-gray-300">
                                Explore nossa linha completa de produtos para {link.name.toLowerCase()}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                        {link.subCategories?.map((subCategory) => (
                          <ListItem
                            key={subCategory.name}
                            href={subCategory.href}
                            title={subCategory.name}
                          >
                            Produtos especializados em {subCategory.name.toLowerCase()}
                          </ListItem>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-[#222222]/95 backdrop-blur-md transform transition-all duration-500 ease-in-out pt-16",
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}
      >
        <div className="container-custom py-4">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 w-full bg-[#333333]/80 backdrop-blur-sm border-0 text-white rounded-lg focus-visible:ring-center-orange"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          <nav className="flex flex-col gap-2">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-[#333333]/50">
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-base font-medium rounded-md transition-all duration-200",
                      location.pathname === link.href
                        ? 'bg-center-orange/10 text-center-orange'
                        : 'text-gray-300 hover:bg-[#333333]/50 hover:text-white'
                    )}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
            
            {currentCategory && (
              <div className="mt-4 pt-4 border-t border-[#333333]/50">
                <div className="px-4">
                  <DownloadCategoryButton 
                    products={allProducts.filter(product => product.category === currentCategory.id)}
                    categoryName={currentCategory.name}
                  />
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-[#333333]/50">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-300 hover:bg-[#333333]/50 hover:text-white rounded-md w-full text-left transition-all duration-200"
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
            
            <button
              onClick={handleWhatsAppClick}
              className="mt-2 flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-center-orange rounded-md hover:bg-center-orange/90 transition-all duration-200 hover:scale-105"
            >
              <MessageCircle size={18} />
              <span>Contato WhatsApp</span>
            </button>
          </nav>
        </div>
      </div>

      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
      <MobileCategoryDrawer open={isCategoryDrawerOpen} onOpenChange={setIsCategoryDrawerOpen} />

      <Dialog open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
        <DialogContent className="sm:max-w-md border-[#333333] bg-[#1E1E1E] p-0 overflow-hidden mx-auto my-auto max-h-[90vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="relative">
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-[#333333] text-gray-300 hover:text-white transition-colors"
              aria-label="Fechar busca"
            >
              <X size={18} />
            </button>
            
            <div className="p-6 pr-16">
              <h3 className="text-lg font-semibold text-white mb-4">O que você procura hoje?</h3>
              
              <form onSubmit={handleSearch} className="relative mb-6">
                <Input
                  type="search"
                  placeholder="Digite aqui para buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-12 py-3 w-full bg-[#252525] border-[#3a3a3a] border-2 text-white focus-visible:ring-center-orange focus-visible:border-center-orange placeholder:text-gray-400 rounded-lg"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 flex items-center justify-center text-gray-400 hover:text-center-orange transition-colors bg-[#333333] rounded-md"
                >
                  <Search size={18} />
                </button>
              </form>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">Pesquisas populares:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Capacitor', 'Tubulação', 'Disjuntor', 'Suporte', 'Fita'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        handleSearch(new Event('submit') as unknown as FormEvent);
                      }}
                      className="px-4 py-2 bg-[#252525] hover:bg-center-orange hover:text-white text-gray-300 text-sm rounded-full transition-all duration-200 border border-[#3a3a3a] hover:border-center-orange hover:scale-105"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
