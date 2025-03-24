import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Flame, Filter, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
  popularity: number;
}

const sampleProducts: Product[] = [
  // SUPORTES
  {
    id: '101',
    name: 'SUPORTE 400MM',
    code: '13160',
    price: 43.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '102',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '103',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '104',
    name: 'SUPORTE 550MM',
    code: '13309',
    price: 156.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '105',
    name: 'SUPORTE 900MM',
    code: '13310',
    price: 255.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // TUBULAÇÃO
  {
    id: '106',
    name: 'TUBULAÇÃO 1/4 Por Metro',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '107',
    name: 'TUBULAÇÃO 3/8 Por Metro',
    code: '12711',
    price: 28.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '108',
    name: 'TUBULAÇÃO 1/2 Por Metro',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '109',
    name: 'TUBULAÇÃO 5/8 Por Metro',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '110',
    name: 'TUBULAÇÃO 3/4 Por Metro',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // TUBEX
  {
    id: '111',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '112',
    name: 'TUBEX 3/8 2m',
    code: '7200',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '113',
    name: 'TUBEX 1/2 2m',
    code: '7201',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '114',
    name: 'TUBEX 5/8 2m',
    code: '10504',
    price: 8.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '115',
    name: 'TUBEX 3/4 2m',
    code: '100232514',
    price: 10.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // FITAS
  {
    id: '116',
    name: 'FITA PVC 10M',
    code: '7202',
    price: 8.00,
    image: '/lovable-uploads/fitapvc.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '117',
    name: 'FITA ALUMINIZADA 45M',
    code: '7195',
    price: 9.00,
    image: '/lovable-uploads/fitaalum.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // DRENO
  {
    id: '118',
    name: 'MANGUEIRA P/ DRENO Por Metro',
    code: '11407',
    price: 5.80,
    image: '/lovable-uploads/dreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '119',
    name: 'MANGUEIRA P/ DRENO CRISTAL Por Metro',
    code: '11993',
    price: 6.50,
    image: '/lovable-uploads/drenocristal.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '120',
    name: 'BICO P/ DRENO',
    code: '12644',
    price: 15.00,
    image: '/lovable-uploads/bicodreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // FLUÍDOS
  {
    id: '121',
    name: 'FLUÍDO R32 650g',
    code: '7899733823641',
    price: 130.00,
    image: '/lovable-uploads/r32650g.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '122',
    name: 'FLUÍDO R32 3Kg',
    code: '7899733819095',
    price: 290.00,
    image: '/lovable-uploads/r323kg.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '123',
    name: 'FLUÍDO R410A 750g',
    code: '7899733805227',
    price: 129.00,
    image: '/lovable-uploads/r410a750g.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '124',
    name: 'FLUÍDO R22 900g',
    code: '7899733805180',
    price: 132.00,
    image: '/lovable-uploads/r22.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // CABOS
  {
    id: '125',
    name: 'CABO PP 4 X 1,5mm Por Metro',
    code: '9947',
    price: 9.50,
    image: '/lovable-uploads/pp4.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '126',
    name: 'CABO PP 5 X 1,5mm Por Metro',
    code: '8492',
    price: 10.20,
    image: '/lovable-uploads/pp5.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // DISJUNTORES
  {
    id: '127',
    name: 'DISJUTNOR 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/weg.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '128',
    name: 'DISJUTNOR 10A B SCHNEIDER',
    code: '7891341466906',
    price: 24.00,
    image: '/lovable-uploads/schneider.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '129',
    name: 'DISJUNTOR 10A C LUKMA',
    code: '5418',
    price: 24.00,
    image: '/lovable-uploads/lukma.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // VÁLVULA
  {
    id: '130',
    name: 'VÁLVULA P/ GÁS 1/2',
    code: '13255',
    price: 42.00,
    image: '/lovable-uploads/valve.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // UNIÃO
  {
    id: '131',
    name: 'UNIÃO REGULAR 1/4',
    code: '10062',
    price: 9.80,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '132',
    name: 'UNIÃO REGULAR 3/8',
    code: '10059',
    price: 20.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '133',
    name: 'UNIÃO REGULAR 1/2',
    code: '10061',
    price: 27.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '134',
    name: 'UNIÃO REGULAR 5/8',
    code: '10060',
    price: 38.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '135',
    name: 'UNIÃO REGULAR 3/4',
    code: '10058',
    price: 55.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // REDUTOR
  {
    id: '136',
    name: 'REDUTOR 3/8 P/ 1/4',
    code: '12717',
    price: 20.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '137',
    name: 'REDUTOR 1/2 P/ 3/8',
    code: '12716',
    price: 25.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '138',
    name: 'REDUTOR 1/2 P/ 1/4',
    code: '12715',
    price: 28.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // PORCA
  {
    id: '139',
    name: 'PORCA 1/4',
    code: '10054',
    price: 9.50,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '140',
    name: 'PORCA 3/8',
    code: '10055',
    price: 9.80,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '141',
    name: 'PORCA 1/2',
    code: '10051',
    price: 12.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '142',
    name: 'PORCA 5/8',
    code: '10053',
    price: 29.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '143',
    name: 'PORCA 3/4',
    code: '10052',
    price: 32.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // CAPACITOR
  {
    id: '144',
    name: 'CAPACITOR 0,9UF 400VAC',
    code: '11305',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '145',
    name: 'CAPACITOR 1UF 400VAC',
    code: '11306',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '146',
    name: 'CAPACITOR 1,5UF 400VAC',
    code: '11307',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '147',
    name: 'CAPACITOR 2UF 400VAC',
    code: '11308',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '148',
    name: 'CAPACITOR 2,5UF 400VAC',
    code: '11309',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '149',
    name: 'CAPACITOR 3UF 380V',
    code: '12642',
    price: 30.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '150',
    name: 'CAPACITOR 15UF 440V',
    code: '7899733814250',
    price: 25.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '151',
    name: 'CAPACITOR 20UF 380VAC',
    code: '11997',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '152',
    name: 'CAPACITOR 25UF 380VAC',
    code: '11327',
    price: 43.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '153',
    name: 'CAPACITOR 25UF 440VAC',
    code: '11325',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '154',
    name: 'CAPACITOR 30UF 380VAC',
    code: '11311',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '155',
    name: 'CAPACITOR 30UF 440VAC',
    code: '11326',
    price: 53.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '156',
    name: 'CAPACITOR 35UF 450/380VAC',
    code: '11312',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '157',
    name: 'CAPACITOR 40UF 380VAC',
    code: '12643',
    price: 52.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '158',
    name: 'CAPACITOR 55UF 380VAC',
    code: '11998',
    price: 65.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '159',
    name: 'CAPACITOR 60UF 380VAC',
    code: '11999',
    price: 45.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '160',
    name: 'CAPACITOR 65UF 380VAC',
    code: '12000',
    price: 27.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '161',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 440VAC',
    code: '12799',
    price: 39.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '162',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 450VAC',
    code: '12485',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '163',
    name: 'CAPACITOR DUPLO 25+ 2,5UF 450V',
    code: '13163',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // CANALETA
  {
    id: '164',
    name: 'CANALETA CB30 2M',
    code: '12651',
    price: 35.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '165',
    name: 'CANALETA CB60 2M',
    code: '12652',
    price: 40.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // TERMINAL ACABAMENTO
  {
    id: '166',
    name: 'TERMINAL ACABAMENT0 CB30',
    code: '12645',
    price: 38.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '167',
    name: 'TERMINAL ACABAMENTO CB60',
    code: '12649',
    price: 55.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // CURVA
  {
    id: '168',
    name: 'CURVA ANG. INTERNO CB60',
    code: '12647',
    price: 13.00,
    image: '/lovable-uploads/curvainterna.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '169',
    name: 'PASSAGEM DE PAREDE CB60',
    code: '12649',
    price: 15.00,
    image: '/lovable-uploads/passagemparede.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '170',
    name: 'CURVA PLANA REGULÁVEL CB60',
    code: '12646',
    price: 21.00,
    image: '/lovable-uploads/curvaregulavel.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // CAIXA DE PASSAGEM
  {
    id: '171',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '7899611800016',
    price: 23.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '172',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '789961180047',
    price: 25.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  // Produtos originais
  {
    id: '1',
    name: 'Abraçadeira 3/4" Tramontina Cinza',
    code: 'ABR-001',
    price: 3.70,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 10,
  },
  {
    id: '2',
    name: 'Luva para Eletroduto 3/4" Tramontina Cinza',
    code: 'LUV-001',
    price: 2.75,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 8,
  },
  {
    id: '3',
    name: 'Curva Longa 90° 1/2" com Bolsa Tramontina Cinza',
    code: 'CRV-001',
    price: 17.00,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 5,
  },
  {
    id: '4',
    name: 'Curva Longa 90° 3/4" com Bolsa Tramontina Cinza',
    code: 'CRV-002',
    price: 19.50,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 6,
  },
  {
    id: '5',
    name: 'Adaptador para Condulete Múltiplo 1.1/2" para 1.1/4" Tramontina',
    code: 'ADP-001',
    price: 25.30,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 4,
  },
  {
    id: '6',
    name: 'Adaptador para Condulete Múltiplo 1" Tramontina',
    code: 'ADP-002',
    price: 22.80,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 6,
  },
  {
    id: '8',
    name: 'Terminal de Compressão 50mm',
    code: 'TRM-001',
    price: 12.50,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'terminais',
    popularity: 8,
  },
  {
    id: '9',
    name: 'Sensor de Temperatura PTC',
    code: 'SNS-001',
    price: 45.90,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'automacao',
    popularity: 7,
  },
];

const categoryLabels: Record<string, string> = {
  'instalacoes-eletricas': 'Instalações Elétricas',
  'terminais': 'Terminais',
  'automacao': 'Automação',
  'suportes': 'Suportes',
  'tubulacao': 'Tubulação',
  'tubex': 'Tubex',
  'fitas': 'Fitas',
  'dreno': 'Dreno',
  'fluidos': 'Fluídos',
  'cabos': 'Cabos',
  'disjuntores': 'Disjuntores',
  'uniao': 'União',
  'redutor': 'Redutor',
  'porca': 'Porca',
  'capacitor': 'Capacitor',
  'acabamento': 'Acabamento',
  'ar-condicionado': 'Ar Condicionado',
};

type SortOption = 'popularity' | 'price-low' | 'price-high';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const categories = Array.from(new Set(sampleProducts.map(product => product.category)));
    setAllCategories(categories);
    
    let filteredProducts = slug 
      ? sampleProducts.filter(product => product.category === slug)
      : sampleProducts;
    
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    switch(sortBy) {
      case 'popularity':
        filteredProducts.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
    
    setProducts(filteredProducts);
    
    if (slug && slug in categoryLabels) {
      document.title = `${categoryLabels[slug]} | Center Eletrônica`;
    } else {
      document.title = "Todos os Produtos | Center Eletrônica";
    }
    
    window.scrollTo(0, 0);
  }, [slug, priceRange, sortBy]);

  const maxPrice = Math.max(...sampleProducts.map(product => product.price));
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <
