
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ArrowRight, Wind, Plug, Terminal, Router } from 'lucide-react';

const categories = [
  { name: 'Ar Condicionado', href: '/categoria/ar-condicionado', icon: <Wind size={14} /> },
  { name: 'Instalações Elétricas', href: '/categoria/instalacoes-eletricas', icon: <Plug size={14} /> },
  { name: 'Terminais', href: '/categoria/terminais', icon: <Terminal size={14} /> },
  { name: 'Automação', href: '/categoria/automacao', icon: <Router size={14} /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#222222] text-white border-t border-gray-800">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <p className="text-gray-300 text-sm mb-3">
              Loja de produtos Elétricos, Eletrônicos, Automação, Informática e mais.
            </p>
            <div className="space-y-1.5">
              <a 
                href="tel:5499270560" 
                className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors text-sm"
              >
                <Phone size={16} />
                <span>(54) 9927-0560</span>
              </a>
              <a 
                href="tel:5499986916" 
                className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors text-sm ml-6"
              >
                <span>(54) 9998-6916</span>
              </a>
              <a 
                href="mailto:center@centereletronica.com.br" 
                className="flex items-center gap-2 text-gray-300 hover:text-center-orange transition-colors text-sm"
              >
                <Mail size={16} />
                <span>center@centereletronica.com.br</span>
              </a>
              <div className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin size={16} className="min-w-[16px] mt-1" />
                <span>Rua Jacob Gremmelmaier, 409 - Centro, Getúlio Vargas - RS, 99900-000</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium mb-3">Categorias</h3>
            <ul className="space-y-1.5">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href}
                    className="flex items-center gap-1 text-gray-300 hover:text-center-orange transition-colors text-sm"
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium mb-3">Horário de Funcionamento</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-start gap-2 text-gray-300">
                <Clock size={16} className="min-w-[16px] mt-0.5" />
                <div>
                  <p className="font-medium">Segunda a Sexta</p>
                  <p className="text-gray-400">08:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-300 ml-6">
                <div>
                  <p className="font-medium">Sábado</p>
                  <p className="text-gray-400">08:00 - 12:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-300 ml-6">
                <div>
                  <p className="font-medium">Domingo</p>
                  <p className="text-gray-400">Fechado</p>
                </div>
              </div>
            </div>

            <h3 className="text-base font-medium mt-4 mb-2">Redes Sociais</h3>
            <div className="flex gap-2">
              <a 
                href="https://www.instagram.com/centereletronicagv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 bg-white/10 rounded-full text-white hover:bg-center-orange hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://www.facebook.com/centereletronicagv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 bg-white/10 rounded-full text-white hover:bg-center-orange hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs mb-2 sm:mb-0">
              &copy; {currentYear} Center Eletrônica. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-xs">
              Preços sujeitos a alteração sem aviso prévio.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
