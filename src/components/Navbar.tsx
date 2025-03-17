
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Search, Wind, Plug, Terminal, Router } from 'lucide-react';
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
  { name: 'Automação', href: '/categoria/automacao' },
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
          ? 'bg-black/90 backdrop-blur-md shadow-sm border-b border-gray-900' 
          : 'bg-black'
      }`}
    >
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="relative z-10 flex items-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              <img 
                src="/lovable-uploads/918b6617-96a1-4ab2-bec0-eb860a89bd90.png" 
                alt="Center Eletrônica Logo" 
                className="h-6 w-auto mr-3" 
              />
              <span className="text-xl font-display font-semibold tracking-tight">
                Center <span className="text-center-orange">Eletrônica</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-center-orange'
                      : 'text-center-darkGray dark:text-gray-300 hover:text-center-orange'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="tel:5499270560" 
              className="hidden md:flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-center-orange rounded-md transition-all hover:bg-center-orangeLight"
            >
              <span>54 9927-0560</span>
            </a>
            
            <div className="flex md:hidden items-center gap-3">
              <a 
                href="tel:5499270560" 
                className="flex items-center justify-center w-9 h-9 text-center-orange bg-center-orange/10 rounded-full"
              >
                <Phone size={18} />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center w-9 h-9 text-center-darkGray dark:text-gray-300 rounded-md transition-colors hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex-1 max-w-full mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10 pr-4 py-2 w-full bg-gray-800 border-0 focus-visible:ring-center-orange"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-center-gray dark:text-gray-400" />
          </form>
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-40 bg-black transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-custom py-4">
          <div className="flex justify-between items-center mb-6 pt-2">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/918b6617-96a1-4ab2-bec0-eb860a89bd90.png" 
                alt="Center Eletrônica Logo" 
                className="h-6 w-auto mr-2" 
              />
              <span className="text-lg font-display font-semibold tracking-tight">
                Center <span className="text-center-orange">Eletrônica</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-center-darkGray dark:text-gray-300 rounded-md hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 w-full bg-gray-800 border-0"
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
                    : 'text-center-darkGray dark:text-gray-300 hover:bg-gray-800'
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
