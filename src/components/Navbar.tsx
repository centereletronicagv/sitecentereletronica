import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Snowflake, Zap, Cable, Plug, Monitor, Eye, User, Heart, LogOut, ShoppingCart, MessageCircle, Grid2X2 } from 'lucide-react';
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
}

const navLinks: NavLink[] = [
  { name: 'Início', href: '/' },
  { 
    name: 'Ar Condicionado', 
    href: '/categoria/ar-condicionado', 
    icon: <Snowflake size={16} />
  },
  { 
    name: 'Instalações Elétricas', 
    href: '/categoria/instalacoes-eletricas', 
    icon: <Zap size={16} />
  },
  { 
    name: 'Cabos', 
    href: '/categoria/cabos', 
    icon: <Cable size={16} />
  },
  { 
    name: 'Terminais e Conectores', 
    href: '/categoria/terminais', 
    icon: <Plug size={16} />
  },
  { 
    name: 'Tomadas Industriais', 
    href: '/categoria/tomadas-industriais', 
    icon: <Plug size={16} />
  },
  { 
    name: 'Automação', 
    href: '/categoria/automacao', 
    icon: <Grid2X2 size={16} />
  },
  { 
    name: 'Informática', 
    href: '/categoria/informatica', 
    icon: <Monitor size={16} />
  },
  { 
    name: 'Monitoramento', 
    href: '/categoria/monitoramento', 
    icon: <Eye size={16} />
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
    'cabos': 'Cabos',
    'terminais': 'Terminais e Conectores',
    'tomadas-industriais': 'Tomadas Industriais',
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
        {/* Desktop Version */}
        <div className="hidden lg:block">
          {/* Top Bar */}
          <div className="container-custom py-2 border-b border-[#2a2a2a]">
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
              <div className="flex-1 max-w-2xl">
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
              <div className="flex items-center gap-6">
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
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="container-custom">
            <nav className="py-2">
              <div className="flex items-center gap-2">
                {/* Departments Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-center-orange text-white font-medium rounded-md hover:bg-center-orange/90 transition-colors">
                    <Grid2X2 size={16} />
                    Departamentos
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

                {/* Main Navigation Links - showing categories with icons */}
                <div className="flex items-center ml-4">
                  {[
                    { name: 'Ar Condicionado', href: '/categoria/ar-condicionado', icon: <Snowflake size={16} /> },
                    { name: 'Instalações Elétricas', href: '/categoria/instalacoes-eletricas', icon: <Zap size={16} /> },
                    { name: 'Cabos', href: '/categoria/cabos', icon: <Cable size={16} /> },
                    { name: 'Terminais e Conectores', href: '/categoria/terminais', icon: <Plug size={16} /> },
                    { name: 'Automação', href: '/categoria/automacao', icon: <Grid2X2 size={16} /> }
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                        location.pathname === link.href
                          ? 'text-center-orange'
                          : 'text-gray-300 hover:text-center-orange'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Favorites positioned after Automação */}
                <div className="ml-2">
                  <FavoritesLink />
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Version - New Layout */}
        <div className="lg:hidden">
          {/* Top Row */}
          <div className="px-4 py-3 border-b border-[#2a2a2a]">
            <div className="flex items-center justify-between">
              {/* Left: User Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 text-gray-300 hover:bg-[#333333] rounded-full transition-colors">
                    <User size={18} />
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

              {/* Center: Logo */}
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/logonova.png" 
                  alt="Center Eletrônica Logo" 
                  className="h-10 w-auto"
                />
              </Link>

              {/* Right: Departments, Favorites, Cart */}
              <div className="flex items-center gap-1">
                {/* Departments Button */}
                <button
                  onClick={() => setIsCategoryDrawerOpen(true)}
                  className="p-2 text-gray-300 hover:bg-[#333333] rounded-full transition-colors"
                  aria-label="Departamentos"
                >
                  <Grid2X2 size={20} />
                </button>

                {/* Favorites */}
                <Link to="/favoritos" className="p-2 text-gray-300 hover:bg-[#333333] rounded-full transition-colors relative">
                  <Heart size={18} />
                </Link>

                {/* Cart */}
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
              </div>
            </div>
          </div>

          {/* Bottom Row: Search Bar */}
          <div className="px-4 py-3">
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
        </div>
      </div>

      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
      <MobileCategoryDrawer open={isCategoryDrawerOpen} onOpenChange={setIsCategoryDrawerOpen} />
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </header>
  );
}
