
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Flame } from "lucide-react";

// Sample product data - in a real app, this would come from an API
interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
  popularity: number;
}

// Sample products for demonstration
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
    popularity: 7,
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
];

// Category mapping
const categoryLabels: Record<string, string> = {
  'instalacoes-eletricas': 'Instalações Elétricas',
  'ar-condicionado': 'Ar Condicionado',
  'terminais': 'Terminais',
  'automacao': 'Automação',
};

// Sort options
type SortOption = 'popularity' | 'price-low' | 'price-high';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    // Get all unique categories
    const categories = Array.from(new Set(sampleProducts.map(product => product.category)));
    setAllCategories(categories);
    
    // Filter products by category if slug is provided
    let filteredProducts = slug 
      ? sampleProducts.filter(product => product.category === slug)
      : sampleProducts;
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
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
    
    // Set page title
    if (slug && slug in categoryLabels) {
      document.title = `${categoryLabels[slug]} | Center Eletrônica`;
    } else {
      document.title = "Todos os Produtos | Center Eletrônica";
    }
    
    window.scrollTo(0, 0);
  }, [slug, priceRange, sortBy]);

  // Get max price from all products
  const maxPrice = Math.max(...sampleProducts.map(product => product.price));
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold text-white mb-8">
            {slug && slug in categoryLabels ? categoryLabels[slug] : 'Todos os Produtos'}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with filters */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#1E1E1E] p-6 rounded-xl border border-[#333333]">
                <h2 className="text-white font-semibold text-xl mb-4">Categorias</h2>
                <nav className="space-y-2">
                  {allCategories.map(cat => (
                    <a 
                      key={cat}
                      href={`/categoria/${cat}`}
                      className={`block py-2 px-3 rounded-md text-sm transition-colors ${
                        slug === cat 
                          ? 'bg-center-orange text-white' 
                          : 'text-gray-300 hover:bg-[#333333] hover:text-white'
                      }`}
                    >
                      {categoryLabels[cat] || cat}
                    </a>
                  ))}
                </nav>
              </div>
              
              <div className="bg-[#1E1E1E] p-6 rounded-xl border border-[#333333]">
                <h2 className="text-white font-semibold text-xl mb-4">Filtrar por Preço</h2>
                <div className="px-2">
                  <Slider 
                    defaultValue={priceRange} 
                    max={maxPrice} 
                    step={1}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-white text-sm">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products area */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400">Mostrando {products.length} produto(s)</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 mr-2 text-sm">Ordenar por:</span>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className="w-[180px] bg-[#1E1E1E] border-[#333333] text-white">
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
