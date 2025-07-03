import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Wind, Plug, Terminal, Router, ChevronDown, ChevronRight, ShoppingCart, Grid2X2, MessageCircle, Monitor, Eye, User, Heart, LogOut } from 'lucide-react';
import { Input } from './ui/input';
import { useCart } from '@/context/CartContext';
import CartModal from './CartModal';
import MobileCategoryDrawer from './MobileCategoryDrawer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { DownloadCategoryButton } from './DownloadCategoryButton';
import { products as allProducts } from '@/data/products';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';
import FavoritesLink from './FavoritesLink';

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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();

  // Get current category info
  const currentCategory = getCategoryInfo(location.pathname);

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
  
  const handleWhatsAppClick = () => {
    const phoneNumber = '5499270560';
    const message = 'Olá! Gostaria de mais informações sobre os produtos da Center Eletrônica.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleUserMenuClick = () => {
    if (isAuthenticated) {
      // User is logged in, show user menu (handled by dropdown)
      return;
    } else {
      // User is not logged in, show auth modal
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full">
      <div 
        className={`w-full fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#181818] shadow-lg border-b border-[#333333]' 
            : 'bg-[#181818]'
        }`}
      >
        {/* Top Bar */}
        <div className="container-custom py-3 border-b border-[#2a2a2a]">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/logonova.png" 
                  alt="Center Eletrônica Logo" 
                  className="h-8 w-auto md:h-9"
                />
                <span className="ml-2 text-lg md:text-xl font-display font-bold tracking-tight text-white">
                  Center <span className="text-center-orange">Eletrônica</span>
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden sm:block">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Olá, o que você procura hoje?"
                  className="pl-4 pr-12 py-3 w-full bg-[#252525] border-[#3a3a3a] border-2 rounded-full text-white focus-visible:ring-center-orange focus-visible:border-center-orange placeholder:text-gray-400 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-gray-400 hover:text-center-orange hover:bg-center-orange/10 rounded-full transition-all duration-200"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Top Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-4">
                {currentCategory && (
                  <DownloadCategoryButton 
                    products={allProducts.filter(product => product.category === currentCategory.id)}
                    categoryName={currentCategory.name}
                  />
                )}
                
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors"
                >
                  <MessageCircle size={18} />
                  <span className="text-sm font-medium">Contato</span>
                </button>

                {/* User Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors">
                      <User size={18} />
                      <span className="text-sm font-medium">
                        {isAuthenticated ? user?.name?.split(' ')[0] : 'Minha Conta'}
                      </span>
                      <ChevronDown size={14} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-[#1a1a1a] border-[#333333] shadow-xl">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 border-b border-[#333333]">
                          <p className="text-sm text-white font-medium">{user?.name}</p>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-[#333333] focus:bg-[#333333] focus:text-white">
                          <User size={16} className="mr-2" />
                          Meu Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-[#333333] focus:bg-[#333333] focus:text-white">
                          <ShoppingCart size={16} className="mr-2" />
                          Meus Pedidos
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#333333]" />
                        <DropdownMenuItem 
                          onClick={handleLogout}
                          className="text-red-400 hover:text-red-300 hover:bg-[#333333] focus:bg-[#333333] focus:text-red-300"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sair
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="text-gray-300 hover:text-white hover:bg-[#333333] focus:bg-[#333333] focus:text-white"
                      >
                        <User size={16} className="mr-2" />
                        Entrar / Criar Conta
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="flex items-center gap-4">
                <FavoritesLink />

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors relative"
                >
                  <ShoppingCart size={20} />
                  <span className="text-sm font-medium">Meu Carrinho</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-center-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button 
                className="p-2 text-gray-300 hover:bg-[#333333] rounded-full transition-colors"
                onClick={handleMobileSearchOpen}
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-300 hover:bg-[#333333] rounded-full relative transition-colors"
                aria-label="Carrinho"
              >
                <ShoppingCart size={18} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-center-orange text-white text-xs w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:bg-[#333333] rounded-full transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="container-custom">
          <nav className="hidden lg:block py-3">
            <div className="flex items-center gap-2">
              {/* Departments Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-center-orange text-white font-medium rounded-md hover:bg-center-orange/90 transition-colors">
                  <Grid2X2 size={16} />
                  Departamentos
                  <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-[#1a1a1a] border-[#333333] shadow-xl">
                  {navLinks.slice(1).map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                      <Link
                        to={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#333333] transition-colors"
                      >
                        {link.icon}
                        <span className="font-medium">{link.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Main Navigation Links */}
              <div className="flex items-center ml-4">
                {navLinks.slice(0, 4).map((link) => (
                  <div key={link.name} className="relative group">
                    <Link
                      to={link.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                        location.pathname === link.href
                          ? 'text-center-orange'
                          : 'text-gray-300 hover:text-center-orange'
                      }`}
                    >
                      {link.name}
                      {link.subCategories && <ChevronDown size={12} />}
                    </Link>
                    
                    {/* Dropdown for subcategories */}
                    {link.subCategories && (
                      <div className="absolute top-full left-0 w-48 bg-[#1a1a1a] border border-[#333333] rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {link.subCategories.map((subCategory) => (
                          <Link
                            key={subCategory.name}
                            to={subCategory.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#333333] transition-colors"
                          >
                            {subCategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Special Offers */}
              <div className="ml-auto">
                <span className="text-center-orange text-sm font-bold">
                  🔥 5% OFF para você
                </span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#222222] transform transition-transform duration-300 ease-in-out pt-20 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#333333] text-gray-300 hover:text-white"
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
        
        <div className="container-custom py-4">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-3 w-full bg-[#333333] border-0 text-white rounded-full"
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
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 text-base font-medium rounded-md transition-colors ${
                      location.pathname === link.href
                        ? 'bg-center-orange/10 text-center-orange'
                        : 'text-gray-300 hover:bg-[#333333]'
                    }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
            
            {currentCategory && (
              <div className="mt-4 pt-4 border-t border-[#333333]">
                <div className="px-4">
                  <DownloadCategoryButton 
                    products={allProducts.filter(product => product.category === currentCategory.id)}
                    categoryName={currentCategory.name}
                  />
                </div>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-[#333333] space-y-2">
              {/* User Account Button */}
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    // Show user menu or profile - for now just close menu
                    setIsMenuOpen(false);
                  } else {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-300 hover:bg-[#333333] rounded-md w-full text-left"
              >
                <User size={18} />
                <span>{isAuthenticated ? user?.name : 'Minha Conta'}</span>
              </button>

              {isAuthenticated && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-400 hover:bg-[#333333] rounded-md w-full text-left"
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-300 hover:bg-[#333333] rounded-md w-full text-left"
              >
                <ShoppingCart size={18} />
                <span>Meu Carrinho</span>
                {getTotalItems() > 0 && (
                  <span className="ml-auto bg-center-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <Link
                to="/favoritos"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-300 hover:bg-[#333333] rounded-md w-full text-left"
              >
                <Heart size={18} />
                <span>Favoritos</span>
              </Link>
            </div>
            
            <button
              onClick={handleWhatsAppClick}
              className="mt-2 flex items-center gap-3 px-4 py-3 text-base font-medium text-white bg-center-orange rounded-md hover:bg-center-orange/90 transition-colors"
            >
              <MessageCircle size={18} />
              <span>Contato WhatsApp</span>
            </button>
          </nav>
        </div>
      </div>

      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
      <MobileCategoryDrawer open={isCategoryDrawerOpen} onOpenChange={setIsCategoryDrawerOpen} />
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />

      {/* Mobile Search Dialog */}
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
                      className="px-4 py-2 bg-[#252525] hover:bg-center-orange hover:text-white text-gray-300 text-sm rounded-full transition-all duration-200 border border-[#3a3a3a] hover:border-center-orange"
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
