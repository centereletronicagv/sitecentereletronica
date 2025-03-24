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
    id: '7',
    name: 'Controlador de Temperatura Digital',
    code: 'CTR-001',
    price: 189.90,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 9,
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
  {
    id: '10',
    name: 'SUPORTE 400MM',
    code: '13160',
    price: 43.00,
    image: '/lovable-uploads/20065b43-f5a1-4ad0-a1ac-05d240e41f94.png',
    category: 'ar-condicionado',
    popularity: 8,
  },
  {
    id: '11',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/a3fe7744-ea8c-4391-add1-99a440af1b62.png',
    category: 'ar-condicionado',
    popularity: 7,
  },
  {
    id: '12',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/c022c142-32c1-4a02-9984-c790ede14649.png',
    category: 'ar-condicionado',
    popularity: 9,
  },
  {
    id: '13',
    name: 'MANGUEIRA CRISTAL P/ DRENO',
    code: '11993',
    price: 6.50,
    image: '/lovable-uploads/6148cf1f-a60c-485d-95f4-a3e53c2813e2.png',
    category: 'ar-condicionado',
    popularity: 8,
  },
  {
    id: '14',
    name: 'MANGUEIRA P/ DRENO',
    code: '11407',
    price: 5.80,
    image: '/lovable-uploads/ece740c8-32ff-4509-a849-bc603d2b090f.png',
    category: 'ar-condicionado',
    popularity: 8,
  },
  {
    id: '15',
    name: 'FITA ALUMINIZADA 44MM X 45M',
    code: '7195',
    price: 9.00,
    image: '/lovable-uploads/f0665056-ee3d-48f9-98a6-1e74d30079a1.png',
    category: 'ar-condicionado',
    popularity: 9,
  },
  {
    id: '16',
    name: 'FITA PVC 10M',
    code: '7202',
    price: 8.00,
    image: '/lovable-uploads/3d9d82a0-9f4e-453d-8c39-a01390949f9e.png',
    category: 'ar-condicionado',
    popularity: 8,
  },
  {
    id: '17',
    name: 'TUBULAÇÃO DE COBRE 1/4',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/9278463d-833c-4919-9ff2-99b40bbc4408.png',
    category: 'ar-condicionado',
    popularity: 9,
  },
  {
    id: '18',
    name: 'TUBULAÇÃO DE COBRE 3/8',
    code: '12711',
    price: 29.00,
    image: '/lovable-uploads/f2b81329-0e43-4afc-8090-a9b728aa1c9f.png',
    category: 'ar-condicionado',
    popularity: 9,
  },
  {
    id: '19',
    name: 'TUBULAÇÃO DE COBRE 1/2',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/6804d1a1-8352-4149-b4e6-7d1e3e7c5ebf.png',
    category: 'ar-condicionado',
    popularity: 8,
  },
  {
    id: '20',
    name: 'TUBULAÇÃO DE COBRE 5/8',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/45505ae0-db91-41ac-b02e-5bd595d00ffd.png',
    category: 'ar-condicionado',
    popularity: 8,
  },
  {
    id: '21',
    name: 'TUBULAÇÃO DE COBRE 3/4',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/c7cce0e9-f633-4d33-b834-929465c4d620.png',
    category: 'ar-condicionado',
    popularity: 7,
  },
  {
    id: '22',
    name: 'TUBEX 1/4 2M',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7,
  },
  {
    id: '23',
    name: 'TUBEX 3/8 2M',
    code: '7200',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7,
  },
  {
    id: '24',
    name: 'TUBEX 1/2 2M',
    code: '7201',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7,
  },
  {
    id: '25',
    name: 'TUBEX 5/8 2M',
    code: '10504',
    price: 8.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7,
  },
  {
    id: '26',
    name: 'TUBEX 3/4 2M',
    code: '100232514',
    price: 10.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7,
  },
];

const categoryLabels: Record<string, string> = {
  'instalacoes-eletricas': 'Instalações Elétricas',
  'ar-condicionado': 'Ar Condicionado',
  'terminais': 'Terminais',
  'automacao': 'Automação',
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
          
          <div className="lg:hidden flex justify-between items-center mb-6">
            <p className="text-gray-400">Mostrando {products.length} produto(s)</p>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#252525] border border-[#333] px-3 py-2 rounded-lg text-gray-300"
            >
              <Filter size={16} />
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
                <p className="text-gray-400 font-medium">Mostrando {products.length} produto(s)</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 mr-2 text-sm">Ordenar por:</span>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className="w-[180px] bg-[#252525] border-[#333333] text-white">
                      <SelectValue placeholder="Mais populares" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E1E1E] border-[#333333] text-white">
                      <SelectItem value="popularity" className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-center-orange" /> Mais populares
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
