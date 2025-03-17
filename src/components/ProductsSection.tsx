
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Filter, Star, Tag, ArrowDownAZ } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { cn } from '@/lib/utils';

// Sample product data
interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
  popularity: number;
}

interface Category {
  name: string;
  slug: string;
  icon?: JSX.Element;
}

// Sample categories - these should match the ones in your Navbar
const categories: Category[] = [
  { name: 'Ar Condicionado', slug: 'ar-condicionado' },
  { name: 'Instalações Elétricas', slug: 'instalacoes-eletricas' },
  { name: 'Terminais', slug: 'terminais' },
  { name: 'Automação', slug: 'automacao' }
];

// Sample products for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Abraçadeira 3/4" Tramontina Cinza',
    code: 'ABR-001',
    price: 3.70,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 10
  },
  {
    id: '2',
    name: 'Luva para Eletroduto 3/4" Tramontina Cinza',
    code: 'LUV-001',
    price: 2.75,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 8
  },
  {
    id: '3',
    name: 'Curva Longa 90° 1/2" com Bolsa Tramontina Cinza',
    code: 'CRV-001',
    price: 17.00,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 5
  },
  {
    id: '4',
    name: 'Curva Longa 90° 3/4" com Bolsa Tramontina Cinza',
    code: 'CRV-002',
    price: 19.50,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 6
  },
  {
    id: '5',
    name: 'Adaptador para Condulete Múltiplo 1.1/2" para 1.1/4" Tramontina',
    code: 'ADP-001',
    price: 25.30,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 4
  },
  {
    id: '6',
    name: 'Adaptador para Condulete Múltiplo 1" Tramontina',
    code: 'ADP-002',
    price: 22.80,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 7
  },
  {
    id: '7',
    name: 'Controlador de Temperatura Digital',
    code: 'CTR-001',
    price: 189.90,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 9
  },
  {
    id: '8',
    name: 'Terminal de Compressão 50mm',
    code: 'TRM-001',
    price: 12.50,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'terminais',
    popularity: 8
  },
  {
    id: '9',
    name: 'Sensor de Temperatura PTC',
    code: 'SNS-001',
    price: 45.90,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'automacao',
    popularity: 7
  },
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState('instalacoes-eletricas');
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobile, setIsMobile] = useState(false);

  // Responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsFilterOpen(false);
      } else {
        setIsFilterOpen(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Filter products by category and price
  useEffect(() => {
    const filtered = sampleProducts
      .filter(product => product.category === activeTab)
      .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    let sorted = [...filtered];

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        sorted = sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'price-low':
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setProducts(sorted);
  }, [activeTab, priceRange, sortBy]);

  // Find min/max prices for the current category
  const minMaxPrices = sampleProducts
    .filter(product => product.category === activeTab)
    .reduce((acc, product) => {
      return {
        min: Math.min(acc.min, product.price),
        max: Math.max(acc.max, product.price)
      };
    }, { min: Infinity, max: 0 });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleResetFilter = () => {
    setPriceRange([minMaxPrices.min, minMaxPrices.max]);
    setSortBy('popularity');
  };

  return (
    <section className="py-16 bg-[#F6F6F7]">
      <div className="container-custom">
        <h2 className="section-title mb-8">Produtos por Categoria</h2>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            <TabsList className="flex w-full overflow-x-auto space-x-1 border-b border-gray-200 bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.slug}
                  value={category.slug}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 text-sm font-medium rounded-t-lg data-[state=active]:border-b-2 data-[state=active]:border-center-orange data-[state=active]:text-center-orange data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-center-orange data-[state=inactive]:hover:bg-gray-50 transition-colors",
                    "data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  )}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent 
              key={category.slug} 
              value={category.slug}
              className="mt-0"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Filters */}
                <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${isFilterOpen ? 'max-md:max-h-screen' : 'max-md:h-16'} max-md:overflow-hidden transition-all duration-300`}>
                  <div className="md:hidden p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                    <div className="flex items-center gap-2">
                      <Filter size={18} />
                      <span className="font-medium">Filtros</span>
                    </div>
                    {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  
                  <div className={`p-4 ${isMobile && !isFilterOpen ? 'hidden' : ''}`}>
                    <div className="mb-6">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleResetFilter}
                      >
                        Limpar Filtro
                      </Button>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-center-darkGray mb-4 flex items-center gap-2">
                        <ArrowDownAZ size={18} />
                        Ordenar por
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sort-popularity" 
                            checked={sortBy === 'popularity'} 
                            onCheckedChange={() => setSortBy('popularity')}
                          />
                          <label 
                            htmlFor="sort-popularity" 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1.5"
                          >
                            <Star size={16} className="text-center-orange" />
                            Mais Vendidos
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sort-price-low" 
                            checked={sortBy === 'price-low'} 
                            onCheckedChange={() => setSortBy('price-low')}
                          />
                          <label 
                            htmlFor="sort-price-low" 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Menor Preço
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sort-price-high" 
                            checked={sortBy === 'price-high'} 
                            onCheckedChange={() => setSortBy('price-high')}
                          />
                          <label 
                            htmlFor="sort-price-high" 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Maior Preço
                          </label>
                        </div>
                      </div>
                    </div>

                    <Collapsible defaultOpen={true}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-center-darkGray flex items-center gap-2">
                          <Tag size={18} />
                          Preço
                        </h3>
                        <CollapsibleTrigger className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-center-gray">R$ {priceRange[0].toFixed(2)}</span>
                            <span className="text-sm text-center-gray">R$ {priceRange[1].toFixed(2)}</span>
                          </div>
                          <Slider 
                            value={priceRange}
                            min={Math.floor(minMaxPrices.min)}
                            max={Math.ceil(minMaxPrices.max)}
                            step={1}
                            onValueChange={setPriceRange}
                            className="mt-6"
                          />
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
                
                {/* Products */}
                <div className="flex-1">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-center-gray">
                        {products.length} produtos encontrados
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-center-darkGray hidden md:inline">Visualizar</span>
                        <Select defaultValue="grid" disabled>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Visualização" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grid">Grade</SelectItem>
                            <SelectItem value="list">Lista</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <ProductGrid products={products} />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
