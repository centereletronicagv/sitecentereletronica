
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Início', href: '/' },
  { name: 'Suportes', href: '/categoria/suportes' },
  { name: 'Tubulação', href: '/categoria/tubulacao' },
  { name: 'Fluidos', href: '/categoria/fluidos' },
  { name: 'Conexões', href: '/categoria/conexoes' },
  { name: 'Capacitores', href: '/categoria/capacitores' },
  { name: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-10 flex items-center transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 overflow-hidden">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[40px] border-b-center-orange border-r-[20px] border-r-transparent"></div>
            </div>
            <span className="ml-2 text-xl font-display font-semibold tracking-tight">
              Center <span className="text-center-orange">Eletrônica</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'text-center-orange'
                    : 'text-center-darkGray hover:text-center-orange hover:bg-center-orange/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="tel:5499270560" 
              className="ml-2 flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-center-orange rounded-md transition-all hover:bg-center-orangeLight"
            >
              <Phone size={16} />
              <span>54 9927-0560</span>
            </a>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-4 md:hidden">
            <a 
              href="tel:5499270560" 
              className="flex items-center justify-center w-9 h-9 text-center-orange bg-center-orange/10 rounded-full"
            >
              <Phone size={18} />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-9 h-9 text-center-darkGray rounded-md transition-colors hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-custom py-4">
          <div className="flex justify-between items-center mb-8 pt-2">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 overflow-hidden">
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-b-[32px] border-b-center-orange border-r-[16px] border-r-transparent"></div>
              </div>
              <span className="ml-2 text-lg font-display font-semibold tracking-tight">
                Center <span className="text-center-orange">Eletrônica</span>
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-center-darkGray rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'bg-center-orange/10 text-center-orange'
                    : 'text-center-darkGray hover:bg-gray-50'
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
