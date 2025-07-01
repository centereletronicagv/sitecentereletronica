
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ArrowRight, Wind, Plug, Terminal, Router, Grid3X3 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const categories = [
  { name: 'Ar Condicionado', href: '/categoria/ar-condicionado', icon: <Wind size={14} /> },
  { name: 'Instalações Elétricas', href: '/categoria/instalacoes-eletricas', icon: <Plug size={14} /> },
  { name: 'Terminais e Conectores', href: '/categoria/terminais', icon: <Terminal size={14} /> },
  { name: 'Automação', href: '/categoria/automacao', icon: <Router size={14} /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#222222] text-white border-t border-gray-800">
      <div className="container-custom py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Information */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-base font-medium mb-4">Center Eletrônica</h3>
            <p className="text-gray-300 text-sm mb-4">
              Loja de produtos Elétricos, Eletrônicos, Automação, Informática e mais.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-center-orange" />
                <div className="space-y-1">
                  <a 
                    href="tel:5499270560" 
                    className="text-gray-300 hover:text-center-orange transition-colors text-sm"
                  >
                    (54) 9927-0560
                  </a>
                  <a 
                    href="tel:5499986916" 
                    className="block text-gray-300 hover:text-center-orange transition-colors text-sm"
                  >
                    (54) 9998-6916
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-center-orange" />
                <a 
                  href="mailto:center@centereletronica.com.br" 
                  className="text-gray-300 hover:text-center-orange transition-colors text-sm"
                >
                  center@centereletronica.com.br
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-center-orange mt-1 min-w-[18px]" />
                <span className="text-gray-300 text-sm">
                  Rua Jacob Gremmelmaier, 409 - Centro, Getúlio Vargas - RS, 99900-000
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <Grid3X3 size={18} className="text-center-orange" />
              <h3 className="text-base font-medium">Categorias</h3>
            </div>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors text-sm group"
                  >
                    <span className="bg-gray-800 p-1.5 rounded text-center-orange group-hover:bg-center-orange/20 transition-colors">
                      {category.icon}
                    </span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-center-orange" />
              <h3 className="text-base font-medium">Horário de Funcionamento</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <div>
                  <p className="text-white text-sm font-medium">Segunda a Sexta</p>
                  <p className="text-gray-400 text-sm">08:00 - 18:00</p>
                </div>
                
                <div>
                  <p className="text-white text-sm font-medium">Sábado</p>
                  <p className="text-gray-400 text-sm">08:00 - 12:00</p>
                </div>
                
                <div>
                  <p className="text-white text-sm font-medium">Domingo</p>
                  <p className="text-gray-400 text-sm">Fechado</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h3 className="text-base font-medium mb-3">Redes Sociais</h3>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/centereletronicagv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-center-orange rounded-full text-white transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.facebook.com/centereletronicagv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-center-orange rounded-full text-white transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <Separator className="my-8 bg-gray-800" />

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-2 sm:mb-0">
            &copy; {currentYear} Center Eletrônica. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-xs">
            Preços sujeitos a alteração sem aviso prévio.
          </p>
        </div>
      </div>
    </footer>
  );
}
