import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, Search, Wind, Plug, Terminal, Square, Signal, ToggleLeft, Router } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Input } from './ui/input';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Início', href: '/' },
  { name: 'Ar Condicionado', href: '/categoria/ar-condicionado' },
  { name: 'Instalações Elétricas', href: '/categoria/instalacoes-eletricas' },
  { name: 'Terminais', href: '/categoria/terminais' },
  { name: 'Botoeiras', href: '/categoria/botoeiras' },
  { name: 'Sinalizadores', href: '/categoria/sinalizadores' },
  { name: 'Contatores', href: '/categoria/contatores' },
  { name: 'Relés', href: '/categoria/reles' },
  { name: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

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
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-card/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="relative z-10 flex items-center transition-transform duration-300 hover:-translate-y-0.5"
          >
            <img 
              src="/public/lovable-uploads/9b2aa237-3c25-41e5-89fc-4a1be00b9aec.png" 
              alt="Center Eletrônica Logo" 
              className="h-10 w-auto" 
            />
            <span className="ml-2 text-xl font-display font-semibold tracking-tight">
              Center <span className="text-center-orange">Eletrônica</span>
            </span>
          </Link>

          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 border-0 focus-visible:ring-center-orange"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-center-gray dark:text-gray-400" />
            </form>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'text-center-orange'
                    : 'text-center-darkGray dark:text-gray-300 hover:text-center-orange hover:bg-center-orange/5 dark:hover:bg-center-orange/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <a 
                href="tel:5499270560" 
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-center-orange rounded-md transition-all hover:bg-center-orangeLight"
              >
                <Phone size={16} />
                <span>54 9927-0560</span>
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button 
              className="p-2 text-center-darkGray dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full"
              onClick={() => {
                console.log('Open mobile search');
              }}
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
            <a 
              href="tel:5499270560" 
              className="flex items-center justify-center w-9 h-9 text-center-orange bg-center-orange/10 rounded-full"
            >
              <Phone size={18} />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-9 h-9 text-center-darkGray dark:text-gray-300 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-40 bg-white dark:bg-card transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-custom py-4">
          <div className="flex justify-between items-center mb-8 pt-2">
            <Link to="/" className="flex items-center">
              <img 
                src="/public/lovable-uploads/9b2aa237-3c25-41e5-89fc-4a1be00b9aec.png" 
                alt="Center Eletrônica Logo" 
                className="h-8 w-auto" 
              />
              <span className="ml-2 text-lg font-display font-semibold tracking-tight">
                Center <span className="text-center-orange">Eletrônica</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-center-darkGray dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-center-gray dark:text-gray-400" />
            </form>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'bg-center-orange/10 text-center-orange'
                    : 'text-center-darkGray dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="tel:5499270560" 
              className="mt-2 flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-center-orange rounded-md"
            >
              <Phone size={18} />
              <span>Ligar: 54 9927-0560</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
