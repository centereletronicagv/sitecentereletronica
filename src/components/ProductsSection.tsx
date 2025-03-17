
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import ProductGrid from './ProductGrid';

// Sample product data
interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
  popularity: number;
  featured?: boolean;
}

// Sample products for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Abraçadeira 3/4" Tramontina Cinza',
    code: 'ABR-001',
    price: 3.70,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 10,
    featured: true
  },
  {
    id: '2',
    name: 'Luva para Eletroduto 3/4" Tramontina Cinza',
    code: 'LUV-001',
    price: 2.75,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'instalacoes-eletricas',
    popularity: 8,
    featured: true
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
    popularity: 6,
    featured: true
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
    popularity: 7,
    featured: true
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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // Get 4 featured products
  useEffect(() => {
    // First try to get products marked as featured
    let featured = sampleProducts.filter(product => product.featured);
    
    // If we don't have enough featured products, add the most popular ones
    if (featured.length < 4) {
      const nonFeatured = sampleProducts
        .filter(product => !product.featured)
        .sort((a, b) => b.popularity - a.popularity);
      
      // Add as many as needed to reach 4 total
      featured = [...featured, ...nonFeatured.slice(0, 4 - featured.length)];
    } else if (featured.length > 4) {
      // If we have too many, take only the first 4
      featured = featured.slice(0, 4);
    }

    setFeaturedProducts(featured);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <section className="py-16 bg-[#151515] border-y border-[#222222]">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title flex items-center gap-2">
            Produtos em Destaque
            <Star className="w-6 h-6 text-center-orange" />
          </h2>
          
          <Button 
            variant="outline" 
            className="border-center-orange text-center-orange hover:bg-center-orange hover:text-white"
          >
            Ver todos
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-[#1E1E1E] rounded-xl border border-[#333333] overflow-hidden shadow-lg group transition-all duration-300 hover:translate-y-[-8px]"
            >
              <div className="h-48 bg-[#222222] flex items-center justify-center p-4 relative">
                <img 
                  src={product.image.replace('/public', '')} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-center-orange text-white text-xs px-2 py-1 rounded">
                    Cód: {product.code}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium text-base line-clamp-2 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-center-orange font-bold text-lg">
                    {formatCurrency(product.price)}
                  </div>
                  <Button 
                    size="icon" 
                    className="bg-center-orange hover:bg-center-orangeLight text-white rounded-full"
                  >
                    <span className="sr-only">Adicionar ao carrinho</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 4v7M4 7.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
