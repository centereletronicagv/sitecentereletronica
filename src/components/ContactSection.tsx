
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-16 bg-center-lightGray">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="section-title mb-4">Entre em Contato</h2>
          <p className="text-center-gray">
            Estamos sempre à disposição para atender às suas necessidades. 
            Entre em contato conosco para fazer orçamentos ou tirar dúvidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Cards */}
          <div className="space-y-4">
            {/* Phone Card */}
            <div className="bg-[#222222] rounded-xl p-6 border border-[#333333]">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F97316]/10 rounded-xl">
                  <Phone size={24} className="text-center-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-[#C8C8C9] mb-1">Ligue para nós ou mande uma mensagem.</p>
                  <div className="space-y-2 mt-2">
                    <a href="tel:5499270560" className="block text-center-orange font-medium hover:underline">
                      (54) 9927-0560
                    </a>
                    <a href="tel:5499986916" className="block text-center-orange font-medium hover:underline">
                      (54) 9998-6916
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#222222] rounded-xl p-6 border border-[#333333]">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F97316]/10 rounded-xl">
                  <Mail size={24} className="text-center-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-[#C8C8C9] mb-1">Envie-nos uma mensagem por e-mail.</p>
                  <a 
                    href="mailto:center@centereletronica.com.br" 
                    className="block text-center-orange font-medium hover:underline mt-2"
                  >
                    center@centereletronica.com.br
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-[#222222] rounded-xl p-6 border border-[#333333]">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F97316]/10 rounded-xl">
                  <MapPin size={24} className="text-center-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-[#C8C8C9] mb-1">Visite nossa loja física.</p>
                  <address className="mt-2 not-italic text-white">
                    Rua Jacob Gremmelmaier, 409 - Centro<br />
                    Getúlio Vargas - RS, 99900-000
                  </address>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-[#222222] rounded-xl p-6 border border-[#333333]">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F97316]/10 rounded-xl">
                  <MessageSquare size={24} className="text-center-orange" />
                </div>
                <div className="flex-1">
                  <p className="text-[#C8C8C9] mb-1">Envie-nos uma mensagem diretamente.</p>
                  <a 
                    href="https://wa.me/5499270560" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 bg-center-orange text-white font-medium rounded-md hover:bg-center-orangeLight transition-colors"
                  >
                    Iniciar conversa
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-md h-[400px] md:h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1962748164547!2d-52.22661292347696!3d-27.885811294873484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e4a1e15a58af59%3A0x8ac0d84b5b11eb09!2sR.%20Jacob%20Gremmelmaier%2C%20409%20-%20Centro%2C%20Get%C3%BAlio%20Vargas%20-%20RS%2C%2099900-000!5e0!3m2!1spt-BR!2sbr!4v1720736462743!5m2!1spt-BR!2sbr" 
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
    </section>
  );
}
