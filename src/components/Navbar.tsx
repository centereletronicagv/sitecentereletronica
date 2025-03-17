
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Wind, Plug, Terminal, Router, ChevronDown, Heart } from 'lucide-react';
import { Input } from './ui/input';

interface NavLink {
  name: string;
  href: string;
  icon?: JSX.Element;
}

const navLinks: NavLink[] = [
  { name: 'Início', href: '/' },
  { name: 'Ar Condicionado', href: '/categoria/ar-condicionado', icon: <Wind size={16} /> },
  { name: 'Instalações Elétricas', href: '/categoria/instalacoes-eletricas', icon: <Plug size={16} /> },
  { name: 'Terminais', href: '/categoria/terminais', icon: <Terminal size={16} /> },
  { name: 'Automação', href: '/categoria/automacao', icon: <Router size={16} /> },
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
    <header className="w-full">
      {/* Main Navbar */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#181818] shadow-md border-b border-[#333333]' 
            : 'bg-[#181818]'
        }`}
      >
        <div className="container-custom py-5">
          {/* Top bar with logo, search and actions */}
          <div className="flex items-center justify-between gap-4">
            <Link 
              to="/" 
              className="flex items-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center">
                <svg 
                  className="h-8 w-8 text-center-orange" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2L2 12h3v8h14v-8h3L12 2z" />
                </svg>
                <span className="ml-2 text-xl font-display font-semibold tracking-tight text-white">
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
                <Link
                  to="/favoritos"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-center-orange transition-colors"
                >
                  <Heart size={20} />
                  <span className="text-sm font-medium">Favoritos</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <button 
                className="p-2 text-gray-300 bg-[#333333] rounded-full"
                onClick={() => {
                  console.log('Open mobile search');
                }}
              >
                <Search size={18} />
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 rounded-md transition-colors hover:bg-[#333333]"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Bottom navbar with categories - Desktop */}
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

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#222222] transform transition-transform duration-300 ease-in-out ${
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
              <span className="ml-2 text-lg font-display font-semibold tracking-tight text-white">
                Center <span className="text-center-orange">Eletrônica</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-300 rounded-md hover:bg-[#333333]"
            >
              <X size={20} />
            </button>
          </div>

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

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`flex items-center gap-2 px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'bg-center-orange/10 text-center-orange'
                    : 'text-gray-300 hover:bg-[#333333]'
                }`}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="mt-6 pt-4 border-t border-[#333333]">
              <Link
                to="/favoritos"
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-300 hover:bg-[#333333] rounded-md"
              >
                <Heart size={18} />
                <span>Favoritos</span>
              </Link>
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
    </header>
  );
}
