
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

// Product data from the catalog
const supportesProducts = [
  {
    id: '1',
    name: 'SUPORTE 400MM',
    code: 'Y5180',
    price: 43.00,
    image: 'public/lovable-uploads/edd0d643-9bf8-4686-9008-3bae055f26b2.png',
    category: 'suportes'
  },
  {
    id: '2',
    name: 'SUPORTE 450MM',
    code: 'Y5182',
    price: 49.00,
    image: 'public/lovable-uploads/edd0d643-9bf8-4686-9008-3bae055f26b2.png',
    category: 'suportes'
  },
  {
    id: '3',
    name: 'SUPORTE 500MM',
    code: '7304',
    price: 75.00,
    image: 'public/lovable-uploads/edd0d643-9bf8-4686-9008-3bae055f26b2.png',
    category: 'suportes'
  },
  {
    id: '4',
    name: 'MANGUEIRA CRISTAL P/ DRENO',
    code: 'Y5193',
    price: 5.50,
    image: 'public/lovable-uploads/edd0d643-9bf8-4686-9008-3bae055f26b2.png',
    category: 'dreno'
  },
  {
    id: '5',
    name: 'MANGUEIRA P/ DRENO',
    code: 'Y5407',
    price: 5.80,
    image: 'public/lovable-uploads/edd0d643-9bf8-4686-9008-3bae055f26b2.png',
    category: 'dreno'
  },
  {
    id: '6',
    name: 'FITA ALUMINIZADA 48MM X 45M',
    code: '7195',
    price: 9.00,
    image: 'public/lovable-uploads/edd0d643-9bf8-4686-9008-3bae055f26b2.png',
    category: 'suportes'
  },
];

const tubulacaoProducts = [
  {
    id: '7',
    name: 'FITA PVC 10M',
    code: '7292',
    price: 13.00,
    image: 'public/lovable-uploads/ec9a4d91-02b3-45d4-acc7-4bcd3aee248d.png',
    category: 'tubulacao'
  },
  {
    id: '8',
    name: 'TUBULAÇÃO DE COBRE 1/4',
    code: '12710',
    price: 13.00,
    image: 'public/lovable-uploads/ec9a4d91-02b3-45d4-acc7-4bcd3aee248d.png',
    category: 'tubulacao'
  },
  {
    id: '9',
    name: 'TUBULAÇÃO DE COBRE 3/8',
    code: '12711',
    price: 23.00,
    image: 'public/lovable-uploads/ec9a4d91-02b3-45d4-acc7-4bcd3aee248d.png',
    category: 'tubulacao'
  },
  {
    id: '10',
    name: 'TUBULAÇÃO DE COBRE 1/2',
    code: '12709',
    price: 37.00,
    image: 'public/lovable-uploads/ec9a4d91-02b3-45d4-acc7-4bcd3aee248d.png',
    category: 'tubulacao'
  },
  {
    id: '11',
    name: 'TUBULAÇÃO DE COBRE 5/8',
    code: '12712',
    price: 49.00,
    image: 'public/lovable-uploads/ec9a4d91-02b3-45d4-acc7-4bcd3aee248d.png',
    category: 'tubulacao'
  },
  {
    id: '12',
    name: 'TUBULAÇÃO DE COBRE 3/4',
    code: '12713',
    price: 59.00,
    image: 'public/lovable-uploads/ec9a4d91-02b3-45d4-acc7-4bcd3aee248d.png',
    category: 'tubulacao'
  },
];

const fluidosProducts = [
  {
    id: '13',
    name: 'FLUÍDO R410A 750g',
    code: '789973380527',
    price: 129.00,
    image: 'public/lovable-uploads/357d0184-2f60-47eb-9bd7-1c749908460c.png',
    category: 'fluidos'
  },
  {
    id: '14',
    name: 'FLUÍDO R22 900g',
    code: '789973380180',
    price: 132.00,
    image: 'public/lovable-uploads/357d0184-2f60-47eb-9bd7-1c749908460c.png',
    category: 'fluidos'
  },
  {
    id: '15',
    name: 'FLUÍDO R32 3kg',
    code: '789973818095',
    price: 290.00,
    image: 'public/lovable-uploads/357d0184-2f60-47eb-9bd7-1c749908460c.png',
    category: 'fluidos'
  },
  {
    id: '16',
    name: 'GÁS MAPP 400g',
    code: '789973380684',
    price: 38.00,
    image: 'public/lovable-uploads/357d0184-2f60-47eb-9bd7-1c749908460c.png',
    category: 'fluidos'
  },
  {
    id: '17',
    name: 'CABO PP 4X1,5MM',
    code: '9947',
    price: 9.50,
    image: 'public/lovable-uploads/357d0184-2f60-47eb-9bd7-1c749908460c.png',
    category: 'cabeamento'
  },
  {
    id: '18',
    name: 'CABO PP 5X1,5MM',
    code: '9492',
    price: 10.20,
    image: 'public/lovable-uploads/357d0184-2f60-47eb-9bd7-1c749908460c.png',
    category: 'cabeamento'
  },
];

const capacitoresProducts = [
  {
    id: '19',
    name: 'CAPACITOR 20UF 380VAC',
    code: '11997',
    price: 35.00,
    image: 'public/lovable-uploads/96037f4f-0b81-4d7d-ae70-14ce81fef601.png',
    category: 'capacitores'
  },
  {
    id: '20',
    name: 'CAPACITOR 25UF 380VAC',
    code: '11327',
    price: 43.00,
    image: 'public/lovable-uploads/96037f4f-0b81-4d7d-ae70-14ce81fef601.png',
    category: 'capacitores'
  },
  {
    id: '21',
    name: 'CAPACITOR 25UF 440VAC',
    code: '11325',
    price: 48.00,
    image: 'public/lovable-uploads/96037f4f-0b81-4d7d-ae70-14ce81fef601.png',
    category: 'capacitores'
  },
  {
    id: '22',
    name: 'CAPACITOR 30UF 380VAC',
    code: '11311',
    price: 48.00,
    image: 'public/lovable-uploads/96037f4f-0b81-4d7d-ae70-14ce81fef601.png',
    category: 'capacitores'
  },
  {
    id: '23',
    name: 'CAPACITOR 30UF 440VAC',
    code: '11326',
    price: 53.00,
    image: 'public/lovable-uploads/96037f4f-0b81-4d7d-ae70-14ce81fef601.png',
    category: 'capacitores'
  },
  {
    id: '24',
    name: 'CAPACITOR 35UF 450/3E',
    code: '11312',
    price: 35.00,
    image: 'public/lovable-uploads/96037f4f-0b81-4d7d-ae70-14ce81fef601.png',
    category: 'capacitores'
  },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Center Eletrônica - Artigos para Ar Condicionado";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="bg-white">
          <CategorySection 
            title="Suportes, Dreno e Fitas" 
            subtitle="Suportes resistentes, sistemas de dreno eficientes e fitas especializadas para instalações."
            slug="suportes" 
            products={supportesProducts} 
          />

          <div className="py-12 bg-center-lightGray">
            <div className="container-custom">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-center-darkGray/80 to-transparent z-10"></div>
                <div className="relative z-20 p-8 md:p-12 flex flex-col max-w-xl text-white">
                  <span className="text-sm font-medium px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full inline-flex items-center self-start mb-4">
                    <span className="w-2 h-2 bg-center-orange rounded-full mr-2"></span>
                    Qualidade garantida
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    Produtos de alta qualidade para sistemas de ar condicionado
                  </h2>
                  <p className="text-white/80 mb-6">
                    Trabalhamos apenas com fornecedores confiáveis para garantir 
                    a durabilidade e eficiência dos produtos.
                  </p>
                  <a 
                    href="https://wa.me/5499270560" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start bg-center-orange hover:bg-center-orangeLight px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Solicitar orçamento
                    <ArrowRight size={16} />
                  </a>
                </div>
                <img 
                  src="public/lovable-uploads/f1ae756c-7ca2-45df-b7a5-17eb78492bfd.png" 
                  alt="Produtos de alta qualidade" 
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>

          <CategorySection 
            title="Tubulação e Tubex" 
            subtitle="Tubulações de cobre e acessórios essenciais para sistemas de ar condicionado."
            slug="tubulacao" 
            products={tubulacaoProducts} 
          />

          <CategorySection 
            title="Fluidos e Cabeamento" 
            subtitle="Fluidos refrigerantes e cabos elétricos para sistemas de ar condicionado."
            slug="fluidos" 
            products={fluidosProducts} 
          />

          <div className="py-16 bg-center-lightGray">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 text-center-orange rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Loja Física</h3>
                  <p className="text-center-gray mb-4">
                    Visite nossa loja física e conheça todos os nossos produtos.
                  </p>
                  <address className="text-center-darkGray not-italic mt-auto">
                    R. Jacob Gremmelmaier, 409<br />
                    Centro, Passo Fundo - RS
                  </address>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 text-center-orange rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Atendimento</h3>
                  <p className="text-center-gray mb-4">
                    Entre em contato por telefone ou WhatsApp para mais informações.
                  </p>
                  <div className="space-y-1 mt-auto">
                    <a 
                      href="tel:5499270560" 
                      className="block text-center-orange font-medium hover:underline"
                    >
                      (54) 9927-0560
                    </a>
                    <a 
                      href="tel:5499986916" 
                      className="block text-center-orange font-medium hover:underline"
                    >
                      (54) 9998-6916
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-center-orange/10 text-center-orange rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M22 8.5h-4l-3-3h-6l-3 3H2"></path><path d="M2 11.5h20"></path><path d="M4 11.5v4"></path><path d="M20 11.5v4"></path></svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Orçamentos</h3>
                  <p className="text-center-gray mb-4">
                    Solicite um orçamento personalizado para suas necessidades.
                  </p>
                  <a 
                    href="https://wa.me/5499270560" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-auto bg-center-orange hover:bg-center-orangeLight px-4 py-2 rounded-md font-medium text-white transition-colors"
                  >
                    Solicitar agora
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <CategorySection 
            title="Capacitores" 
            subtitle="Variedade completa de capacitores para sistemas de ar condicionado."
            slug="capacitores" 
            products={capacitoresProducts} 
          />
        </div>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

function ArrowRight(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

export default Index;
