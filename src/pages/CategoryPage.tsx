
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ThumbsUp, Filter, Tag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from '@/hooks/use-mobile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
  recommendedOrder?: number;
  subcategory?: string;
}

const sampleProducts: Product[] = [
  {
    id: '10',
    name: 'SUPORTE 400MM',
    code: '13160',
    price: 43.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 1,
    subcategory: 'suportes'
  },
  {
    id: '11',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 2,
    subcategory: 'suportes'
  },
  {
    id: '12',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 3,
    subcategory: 'suportes'
  },
  {
    id: '13',
    name: 'SUPORTE 550MM',
    code: '13309',
    price: 156.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 4,
    subcategory: 'suportes'
  },
  {
    id: '14',
    name: 'SUPORTE 900MM',
    code: '13310',
    price: 255.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 5,
    subcategory: 'suportes'
  },
  {
    id: '15',
    name: 'TUBULAÇÃO 1/4 Por Metro',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 6,
    subcategory: 'tubulacao'
  },
  {
    id: '16',
    name: 'TUBULAÇÃO 3/8 Por Metro',
    code: '12711',
    price: 28.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 7,
    subcategory: 'tubulacao'
  },
  {
    id: '17',
    name: 'TUBULAÇÃO 1/2 Por Metro',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 8,
    subcategory: 'tubulacao'
  },
  {
    id: '18',
    name: 'TUBULAÇÃO 5/8 Por Metro',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 9,
    subcategory: 'tubulacao'
  },
  {
    id: '19',
    name: 'TUBULAÇÃO 3/4 Por Metro',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 10,
    subcategory: 'tubulacao'
  },
  {
    id: '20',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 11,
    subcategory: 'tubex'
  },
  {
    id: '21',
    name: 'TUBEX 3/8 2m',
    code: '7200',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 12,
    subcategory: 'tubex'
  },
  {
    id: '22',
    name: 'TUBEX 1/2 2m',
    code: '7201',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 13,
    subcategory: 'tubex'
  },
  {
    id: '23',
    name: 'TUBEX 5/8 2m',
    code: '10504',
    price: 8.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 14,
    subcategory: 'tubex'
  },
  {
    id: '24',
    name: 'TUBEX 3/4 2m',
    code: '100232514',
    price: 10.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 15,
    subcategory: 'tubex'
  },
  {
    id: '25',
    name: 'FITA PVC 10M',
    code: '7202',
    price: 8.00,
    image: '/lovable-uploads/fitapvc.png',
    category: 'ar-condicionado',
    recommendedOrder: 16,
    subcategory: 'fitas'
  },
  {
    id: '26',
    name: 'FITA ALUMINIZADA 45M',
    code: '7195',
    price: 9.00,
    image: '/lovable-uploads/fitaalum.png',
    category: 'ar-condicionado',
    recommendedOrder: 17,
    subcategory: 'fitas'
  },
  {
    id: '27',
    name: 'MANGUEIRA P/ DRENO Por Metro',
    code: '11407',
    price: 5.80,
    image: '/lovable-uploads/dreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 18,
    subcategory: 'dreno'
  },
  {
    id: '28',
    name: 'MANGUEIRA P/ DRENO CRISTAL Por Metro',
    code: '11993',
    price: 6.50,
    image: '/lovable-uploads/drenocristal.png',
    category: 'ar-condicionado',
    recommendedOrder: 19,
    subcategory: 'dreno'
  },
  {
    id: '29',
    name: 'BICO P/ DRENO',
    code: '12644',
    price: 15.00,
    image: '/lovable-uploads/bicodreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 20,
    subcategory: 'dreno'
  },
  {
    id: '30',
    name: 'FLUÍDO R32 650g',
    code: '7899733823641',
    price: 130.00,
    image: '/lovable-uploads/r32650g.png',
    category: 'ar-condicionado',
    recommendedOrder: 21,
    subcategory: 'fluidos'
  },
  {
    id: '31',
    name: 'FLUÍDO R32 3Kg',
    code: '7899733819095',
    price: 290.00,
    image: '/lovable-uploads/r323kg.png',
    category: 'ar-condicionado',
    recommendedOrder: 22,
    subcategory: 'fluidos'
  },
  {
    id: '32',
    name: 'FLUÍDO R410A 750g',
    code: '7899733805227',
    price: 129.00,
    image: '/lovable-uploads/r410a750g.png',
    category: 'ar-condicionado',
    recommendedOrder: 23,
    subcategory: 'fluidos'
  },
  {
    id: '33',
    name: 'FLUÍDO R22 900g',
    code: '7899733805180',
    price: 132.00,
    image: '/lovable-uploads/r22.png',
    category: 'ar-condicionado',
    recommendedOrder: 24,
    subcategory: 'fluidos'
  },
  {
    id: '35',
    name: 'CABO PP 4 X 1,5mm Por Metro',
    code: '9947',
    price: 9.50,
    image: '/lovable-uploads/pp4.png',
    category: 'ar-condicionado',
    recommendedOrder: 25
  },
  {
    id: '36',
    name: 'CABO PP 5 X 1,5mm Por Metro',
    code: '8492',
    price: 10.20,
    image: '/lovable-uploads/pp5.png',
    category: 'ar-condicionado',
    recommendedOrder: 26
  },
  {
    id: '37',
    name: 'DISJUTNOR 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/weg.png',
    category: 'ar-condicionado',
    recommendedOrder: 27
  },
  {
    id: '38',
    name: 'DISJUTNOR 10A B SCHNEIDER',
    code: '7891341466906',
    price: 24.00,
    image: '/lovable-uploads/schneider.png',
    category: 'ar-condicionado',
    recommendedOrder: 28
  },
  {
    id: '39',
    name: 'DISJUNTOR 10A C LUKMA',
    code: '5418',
    price: 24.00,
    image: '/lovable-uploads/lukma.png',
    category: 'ar-condicionado',
    recommendedOrder: 29
  },
  {
    id: '34',
    name: 'VÁLVULA P/ GÁS 1/2',
    code: '13255',
    price: 42.00,
    image: '/lovable-uploads/valve.png',
    category: 'ar-condicionado',
    recommendedOrder: 30
  },
  {
    id: '40',
    name: 'UNIÃO REGULAR 1/4',
    code: '10062',
    price: 9.80,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 31
  },
  {
    id: '41',
    name: 'UNIÃO REGULAR 3/8',
    code: '10059',
    price: 20.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 32
  },
  {
    id: '42',
    name: 'UNIÃO REGULAR 1/2',
    code: '10061',
    price: 27.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 33
  },
  {
    id: '43',
    name: 'UNIÃO REGULAR 5/8',
    code: '10060',
    price: 38.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 34
  },
  {
    id: '44',
    name: 'UNIÃO REGULAR 3/4',
    code: '10058',
    price: 55.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 35
  },
  {
    id: '45',
    name: 'REDUTOR 3/8 P/ 1/4',
    code: '12717',
    price: 20.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    recommendedOrder: 36
  },
  {
    id: '46',
    name: 'REDUTOR 1/2 P/ 3/8',
    code: '12716',
    price: 25.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    recommendedOrder: 37
  },
  {
    id: '47',
    name: 'REDUTOR 1/2 P/ 1/4',
    code: '12715',
    price: 28.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    recommendedOrder: 38
  },
  {
    id: '48',
    name: 'PORCA 1/4',
    code: '10054',
    price: 9.50,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 39
  },
  {
    id: '49',
    name: 'PORCA 3/8',
    code: '10055',
    price: 9.80,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 40
  },
  {
    id: '50',
    name: 'PORCA 1/2',
    code: '10051',
    price: 12.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 41
  },
  {
    id: '51',
    name: 'PORCA 5/8',
    code: '10053',
    price: 29.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 42
  },
  {
    id: '52',
    name: 'PORCA 3/4',
    code: '10052',
    price: 32.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 43
  },
  {
    id: '53',
    name: 'CAPACITOR 0,9UF 400VAC',
    code: '11305',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 44
  },
  {
    id: '54',
    name: 'CAPACITOR 1UF 400VAC',
    code: '11306',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 45
  },
  {
    id: '55',
    name: 'CAPACITOR 1,5UF 400VAC',
    code: '11307',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 46
  },
  {
    id: '56',
    name: 'CAPACITOR 2UF 400VAC',
    code: '11308',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 47
  },
  {
    id: '57',
    name: 'CAPACITOR 2,5UF 400VAC',
    code: '11309',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 48
  },
  {
    id: '58',
    name: 'CAPACITOR 3UF 380V',
    code: '12642',
    price: 30.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 49
  },
  {
    id: '59',
    name: 'CAPACITOR 15UF 440V',
    code: '7899733814250',
    price: 25.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 50
  },
  {
    id: '60',
    name: 'CAPACITOR 20UF 380VAC',
    code: '11997',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 51
  },
  {
    id: '61',
    name: 'CAPACITOR 25UF 380VAC',
    code: '11327',
    price: 43.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 52
  },
  {
    id: '62',
    name: 'CAPACITOR 25UF 440VAC',
    code: '11325',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 53
  },
  {
    id: '63',
    name: 'CAPACITOR 30UF 380VAC',
    code: '11311',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 54
  },
  {
    id: '64',
    name: 'CAPACITOR 30UF 440VAC',
    code: '11326',
    price: 53.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 55
  },
  {
    id: '65',
    name: 'CAPACITOR 35UF 450/380VAC',
    code: '11312',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 56
  },
  {
    id: '66',
    name: 'CAPACITOR 40UF 380VAC',
    code: '12643',
    price: 52.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 57
  },
  {
    id: '67',
    name: 'CAPACITOR 55UF 380VAC',
    code: '11998',
    price: 65.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 58
  },
  {
    id: '68',
    name: 'CAPACITOR 60UF 380VAC',
    code: '11999',
    price: 45.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 59
  },
  {
    id: '69',
    name: 'CAPACITOR 65UF 380VAC',
    code: '12000',
    price: 27.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 60
  },
  {
    id: '70',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 440VAC',
    code: '12799',
    price: 39.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    recommendedOrder: 61
  },
  {
    id: '71',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 450VAC',
    code: '12485',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    recommendedOrder: 62
  },
  {
    id: '72',
    name: 'CAPACITOR DUPLO 25+ 2,5UF 450V',
    code: '13163',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    recommendedOrder: 63
  },
  {
    id: '73',
    name: 'CANALETA CB30 2M',
    code: '12651',
    price: 25.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    recommendedOrder: 64
  },
  {
    id: '74',
    name: 'CANALETA CB60 2M',
    code: '12652',
    price: 35.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    recommendedOrder: 65
  },
  {
    id: '75',
    name: 'TERMINAL ACABAMENTO CB30',
    code: '12645',
    price: 38.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    recommendedOrder: 66
  },
  {
    id: '76',
    name: 'TERMINAL ACABAMENTO CB60',
    code: '12649',
    price: 55.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    recommendedOrder: 67
  },
  {
    id: '77',
    name: 'CURVA ANG. INTERNO CB60',
    code: '12647',
    price: 13.00,
    image: '/lovable-uploads/curvainterna.png',
    category: 'ar-condicionado',
    recommendedOrder: 68
  },
  {
    id: '78',
    name: 'PASSAGEM DE PAREDE CB60',
    code: '12649',
    price: 15.00,
    image: '/lovable-uploads/passagemparede.png',
    category: 'ar-condicionado',
    recommendedOrder: 69
  },
  {
    id: '79',
    name: 'CURVA PLANA REGULÁVEL CB60',
    code: '12646',
    price: 21.00,
    image: '/lovable-uploads/curvaregulavel.png',
    category: 'ar-condicionado',
    recommendedOrder: 70
  },
  {
    id: '80',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '7899611800016',
    price: 23.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 71
  },
  {
    id: '81',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '789961180047',
    price: 25.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 72
  },
  {
    id: '1',
    name: 'Abraçadeira 3/4" Tramontina Cinza',
    code: 'ABR-001',
    price: 3.70,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: '2',
    name: 'Luva para Eletroduto 3/4" Tramontina Cinza',
    code: 'LUV-001',
    price: 2.75,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: '3',
    name: 'Curva Longa 90° 1/2" com Bolsa Tramontina Cinza',
    code: 'CRV-001',
    price: 17.00,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: '4',
    name: 'Curva Longa 90° 3/4" com Bolsa Tramontina Cinza',
    code: 'CRV-002',
    price: 19.50,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: '5',
    name: 'Adaptador para Condulete Múltiplo 1.1/2" para 1.1/4" Tramontina',
    code: 'ADP-001',
    price: 25.30,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: '6',
    name: 'Adaptador para Condulete Múltiplo 1" Tramontina',
    code: 'ADP-002',
    price: 22.80,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: '8',
    name: 'Terminal de Compressão 50mm',
    code: 'TRM-001',
    price: 12.50,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'terminais',
  },
  {
    id: '9',
    name: 'Sensor de Temperatura PTC',
    code: 'SNS-001',
    price: 45.90,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'automacao',
  },
];

const categoryLabels: Record<string, string> = {
  'instalacoes-eletricas': 'Instalações Elétricas',
  'terminais': 'Terminais e Conectores',
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

type SortOption = 'recommended' | 'price-low' | 'price-high';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  useEffect(() => {
    const categories = Array.from(new Set(sampleProducts.map(product => product.category)));
    setAllCategories(categories);
    
    if (slug) {
      const categoryProducts = sampleProducts.filter(product => product.category === slug);
      const subCats = Array.from(new Set(categoryProducts
        .map(product => product.subcategory)
        .filter(Boolean) as string[]));
      
      setSubcategories(subCats);
      
      // Check URL for subcategory param
      const subcategoryParam = searchParams.get('subcategoria');
      if (subcategoryParam) {
        setSelectedSubcategories([subcategoryParam]);
      } else {
        setSelectedSubcategories([]);
      }
    }
    
    filterProducts();
    
    if (slug && slug in categoryLabels) {
      document.title = `${categoryLabels[slug]} | Center Eletrônica`;
    } else {
      document.title = "Todos os Produtos | Center Eletrônica";
    }
    
    window.scrollTo(0, 0);
  }, [slug, searchParams]);

  useEffect(() => {
    filterProducts();
  }, [priceRange, sortBy, selectedSubcategories]);

  const filterProducts = () => {
    let filteredProducts = slug 
      ? sampleProducts.filter(product => product.category === slug)
      : sampleProducts;
    
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (selectedSubcategories.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => product.subcategory && selectedSubcategories.includes(product.subcategory)
      );
    }
    
    switch(sortBy) {
      case 'recommended':
        filteredProducts.sort((a, b) => {
          if (a.recommendedOrder !== undefined && b.recommendedOrder !== undefined) {
            return a.recommendedOrder - b.recommendedOrder;
          }
          if (a.recommendedOrder !== undefined) {
            return -1;
          }
          if (b.recommendedOrder !== undefined) {
            return 1;
          }
          return 0;
        });
        break;
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
    
    setProducts(filteredProducts);
  };

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories(prev => {
      const newSelection = prev.includes(subcategory)
        ? prev.filter(sc => sc !== subcategory)
        : [...prev, subcategory];
      
      // Update URL with selected subcategory
      if (newSelection.length === 0) {
        searchParams.delete('subcategoria');
      } else {
        searchParams.set('subcategoria', newSelection[0]);
      }
      setSearchParams(searchParams);
      
      return newSelection;
    });
  };

  const clearSubcategoryFilters = () => {
    setSelectedSubcategories([]);
    searchParams.delete('subcategoria');
    setSearchParams(searchParams);
  };

  const maxPrice = Math.max(...sampleProducts.map(product => product.price));
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatSubcategoryName = (name: string) => {
    return categoryLabels[name] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {slug && slug in categoryLabels ? categoryLabels[slug] : 'Todos os Produtos'}
            </h1>
            <p className="text-gray-400">Encontre os melhores produtos para seu projeto</p>
          </motion.div>
          
          {subcategories.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <h2 className="text-lg text-white font-medium flex items-center gap-2">
                  <Tag size={16} className="text-center-orange" />
                  Subcategorias
                </h2>
                
                {selectedSubcategories.length > 0 && (
                  <button 
                    onClick={clearSubcategoryFilters}
                    className="text-sm text-center-orange hover:text-center-orange/80 transition-colors"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 bg-[#222] p-3 rounded-lg">
                {subcategories.map(subcategory => (
                  <button
                    key={subcategory}
                    onClick={() => toggleSubcategory(subcategory)}
                    className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 transition-colors ${
                      selectedSubcategories.includes(subcategory)
                        ? 'bg-center-orange text-white'
                        : 'bg-[#333] text-gray-300 hover:bg-[#444]'
                    }`}
                  >
                    {selectedSubcategories.includes(subcategory) && (
                      <Check size={14} className="text-white" />
                    )}
                    {formatSubcategoryName(subcategory)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="lg:hidden flex justify-between items-center mb-6">
            <div className="text-gray-400 text-sm flex items-center">
              <span>Mostrando</span>
              <span className="font-semibold text-white mx-1">{products.length}</span>
              <span>produto(s)</span>
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 bg-[#252525] border border-[#333] px-2.5 py-1.5 rounded-lg text-gray-300 text-sm"
            >
              <Filter size={14} />
              <span>Filtros</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`lg:col-span-1 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="bg-gradient-to-b from-[#1E1E1E] to-[#232323] p-6 rounded-xl border border-[#333333] shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={18} className="text-center-orange" />
                  <h2 className="text-white font-semibold text-xl">Categorias</h2>
                </div>
                <nav className="space-y-2">
                  {allCategories.map(cat => (
                    <a 
                      key={cat}
                      href={`/categoria/${cat}`}
                      className={`block py-2.5 px-4 rounded-md text-sm transition-all duration-200 ${
                        slug === cat 
                          ? 'bg-center-orange text-white font-medium shadow-md shadow-center-orange/20' 
                          : 'text-gray-300 hover:bg-[#333333] hover:text-white'
                      }`}
                    >
                      {categoryLabels[cat] || cat}
                    </a>
                  ))}
                </nav>
              </div>
              
              {subcategories.length > 0 && (
                <div className="bg-gradient-to-b from-[#1E1E1E] to-[#232323] p-6 rounded-xl border border-[#333333] shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={18} className="text-center-orange" />
                    <h2 className="text-white font-semibold text-xl">Subcategorias</h2>
                  </div>
                  
                  <div className="space-y-2">
                    {subcategories.map(subcategory => (
                      <label 
                        key={subcategory}
                        className="flex items-center gap-3 py-2 px-4 rounded-md text-sm cursor-pointer hover:bg-[#333333]"
                      >
                        <input 
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={() => toggleSubcategory(subcategory)}
                          className="rounded border-gray-500 text-center-orange focus:ring-center-orange"
                        />
                        <span className="text-gray-300">{formatSubcategoryName(subcategory)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-b from-[#1E1E1E] to-[#232323] p-6 rounded-xl border border-[#333333] shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <ArrowUpNarrowWide size={18} className="text-center-orange" />
                  <h2 className="text-white font-semibold text-xl">Filtrar por Preço</h2>
                </div>
                <div className="px-2">
                  <Slider 
                    defaultValue={priceRange} 
                    max={maxPrice} 
                    step={1}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-white text-sm bg-[#252525] p-3 rounded-lg">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center justify-between mb-6 bg-[#1E1E1E] p-4 rounded-xl border border-[#333333]">
                <p className="text-gray-400 text-sm hidden md:block">
                  Mostrando <span className="font-medium text-white">{products.length}</span> produto(s)
                </p>
                
                <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                  <span className="text-gray-400 text-xs md:text-sm whitespace-nowrap">Ordenar por:</span>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className={`bg-[#252525] border-[#333333] text-white ${isMobile ? 'text-xs h-8 flex-1' : 'w-[180px]'}`}>
                      <SelectValue placeholder="Recomendado" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E1E1E] border-[#333333] text-white">
                      <SelectItem value="recommended" className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-center-orange" /> Recomendado
                      </SelectItem>
                      <SelectItem value="price-low" className="flex items-center gap-2">
                        <ArrowUpNarrowWide className="w-4 h-4" /> Menor preço
                      </SelectItem>
                      <SelectItem value="price-high" className="flex items-center gap-2">
                        <ArrowDownNarrowWide className="w-4 h-4" /> Maior preço
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <ProductGrid products={products} />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
