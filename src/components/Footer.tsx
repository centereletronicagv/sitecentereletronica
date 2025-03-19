
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
    <footer className="bg-center-lightGray border-t border-gray-200">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-center-gray mb-6">
              Loja de produtos Elétricos, Eletrônicos, Automação, Informática e mais.
            </p>
            <div className="space-y-3">
              <a 
                href="tel:5499270560" 
                className="flex items-center gap-2 text-center-darkGray hover:text-center-orange transition-colors"
              >
                <Phone size={18} />
                <span>(54) 9927-0560</span>
              </a>
              <a 
                href="tel:5499986916" 
                className="flex items-center gap-2 text-center-darkGray hover:text-center-orange transition-colors ml-6"
              >
                <span>(54) 9998-6916</span>
              </a>
              <a 
                href="mailto:center@centereletronica.com.br" 
                className="flex items-center gap-2 text-center-darkGray hover:text-center-orange transition-colors"
              >
                <Mail size={18} />
                <span>center@centereletronica.com.br</span>
              </a>
              <div className="flex items-start gap-2 text-center-darkGray">
                <MapPin size={18} className="min-w-[18px] mt-1" />
                <span>Rua Jacob Gremmelmaier, 409 - Centro, Getúlio Vargas - RS, 99900-000</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Categorias</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href}
                    className="flex items-center gap-1 text-center-gray hover:text-center-orange transition-colors"
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Horário de Funcionamento</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-center-darkGray">
                <Clock size={18} className="min-w-[18px] mt-1" />
                <div>
                  <p className="font-medium">Segunda a Sexta</p>
                  <p className="text-center-gray">08:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-center-darkGray ml-6">
                <div>
                  <p className="font-medium">Sábado</p>
                  <p className="text-center-gray">08:00 - 12:00</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-center-darkGray ml-6">
                <div>
                  <p className="font-medium">Domingo</p>
                  <p className="text-center-gray">Fechado</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6 mb-3">Redes Sociais</h3>
            <div className="flex gap-2">
              <a 
                href="https://www.instagram.com/centereletronicagv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-center-orange border border-center-orange/20 hover:bg-center-orange hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/centereletronicagv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-center-orange border border-center-orange/20 hover:bg-center-orange hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-center-gray text-sm mb-4 sm:mb-0">
              &copy; {currentYear} Center Eletrônica. Todos os direitos reservados.
            </p>
            <p className="text-center-gray text-sm">
              Preços sujeitos a alteração sem aviso prévio.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
