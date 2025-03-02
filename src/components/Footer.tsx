
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Suportes', href: '/categoria/suportes' },
  { name: 'Tubulação', href: '/categoria/tubulacao' },
  { name: 'Dreno', href: '/categoria/dreno' },
  { name: 'Fluidos', href: '/categoria/fluidos' },
  { name: 'Conexões', href: '/categoria/conexoes' },
  { name: 'Cabeamento', href: '/categoria/cabeamento' },
  { name: 'Fixação', href: '/categoria/fixacao' },
  { name: 'Capacitores', href: '/categoria/capacitores' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-center-lightGray border-t border-gray-200">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 overflow-hidden">
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-b-[32px] border-b-center-orange border-r-[16px] border-r-transparent"></div>
              </div>
              <span className="ml-2 text-xl font-display font-semibold tracking-tight">
                Center <span className="text-center-orange">Eletrônica</span>
              </span>
            </div>
            <p className="text-center-gray mb-6">
              Especialista em artigos para instalação e manutenção de sistemas de ar condicionado.
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
                href="mailto:contato@centereletronica.com.br" 
                className="flex items-center gap-2 text-center-darkGray hover:text-center-orange transition-colors"
              >
                <Mail size={18} />
                <span>contato@centereletronica.com.br</span>
              </a>
              <div className="flex items-start gap-2 text-center-darkGray">
                <MapPin size={18} className="min-w-[18px] mt-1" />
                <span>R. Jacob Gremmelmaier, 409 - Centro, Passo Fundo - RS</span>
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
                    <ArrowRight size={14} />
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
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-center-orange border border-center-orange/20 hover:bg-center-orange hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-center-orange border border-center-orange/20 hover:bg-center-orange hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Localização</h3>
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white h-[200px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.9701067861644!2d-52.409487!3d-28.262581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e2bf0b9af7de49%3A0x1c2fb7cf5b9ffa1!2sR.%20Jacob%20Gremmelmaier%2C%20409%20-%20Centro%2C%20Passo%20Fundo%20-%20RS%2C%2099010-170!5e0!3m2!1spt-BR!2sbr!4v1720627230252!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Center Eletrônica"
              ></iframe>
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
