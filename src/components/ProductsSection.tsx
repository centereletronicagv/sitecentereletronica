import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { Product } from '../types';
import { products } from '../data/products'; // Updated import path

// Define categoryLabels before using it
const categoryLabels: Record<string, string> = {
  'automacao': 'Automação',
  'ar-condicionado': 'Ar Condicionado',
  'instalacoes-eletricas': 'Instalações Elétricas',
  'cabos': 'Cabos',
  'terminais': 'Terminais e Conectores',
  'tomadas-industriais': 'Tomadas Industriais',
  'botão de impulso': 'Botão de Impulso',
  'botão de impulso duplo': 'Botão de Impulso Duplo',
  'botão cogumelo': 'Botão Cogumelo',
  'botão de emergência': 'Botão de Emergência',
  'chave seletora': 'Chave Seletora',
  'led': 'Led',
  'sinalizadores': 'Sinalizadores',
  'partida de motores': 'Partida de Motores',
  'relé temporizador': 'Relé Temporizador',
  'relé de monitoramento': 'Relé de Monitoramento',
  'relé de nível': 'Relé de Nível',
  'relé de estado sólido': 'Relé de Estado Sólido',
  'relé acoplador': 'Relé Acoplador',
  'relé térmico': 'Relé Térmico',
  'contatores': 'Contatores',
  'disjuntores': 'Disjuntores',
  'dps': 'DPS',
  'idr': 'IDR',
  'suportes': 'Suportes',
  'tubulação': 'Tubulação',
  'tubex': 'Tubex',
  'fitas': 'Fitas',
  'dreno': 'Dreno',
  'fluidos': 'Fluídos',
  'fluídos': 'Fluídos',
  'cabo-pp': 'Cabo PP',
  'cabo-flex': 'Cabo Flex',
  'cordao-paralelo': 'Cordão Paralelo',
  'cabo-coaxial': 'Cabo Coaxial',
  'cabo-ethernet': 'Cabo Ethernet',
  'união': 'União',
  'uniao': 'União',
  'redutor': 'Redutor',
  'porca': 'Porca',
  'capacitor': 'Capacitor',
  'acabamento': 'Acabamento',
  'ferramentas': 'Ferramentas',
  'plugs-industriais': 'Plugs Industriais',
  'acopladores-industriais': 'Acopladores Industriais',
  'tomadas-de-embutir': 'Tomadas de Embutir',
  'tomadas-de-sobrepor': 'Tomadas de Sobrepor',
};

interface ProductsSectionProps {
  searchQuery?: string;
  category?: string; // Adicionando suporte para filtrar por categoria
}

const ProductsSection = ({ searchQuery = '', category }: ProductsSectionProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filtrar produtos com base na categoria e pesquisa
    let filtered = products;
    
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (!category) {
      // Se não houver pesquisa nem categoria, mostrar produtos em destaque ou os primeiros 8 produtos
      const featured = filtered.filter(product => product.isFeatured);
      filtered = featured.length > 0 ? featured : filtered.slice(0, 8);
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, category]);

  const sectionTitle = 
    searchQuery ? `Resultados para "${searchQuery}"` : 
    category ? `Produtos de ${categoryLabels[category] || category}` : 
    'Produtos Destacados';

  return (
    <section className="py-2 md:py-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-white mb-2">
              {sectionTitle}
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              {searchQuery 
                ? `${filteredProducts.length} produto(s) encontrado(s)` 
                : category 
                  ? `Explore nossa seleção de ${categoryLabels[category]?.toLowerCase() || category}`
                  : 'Confira nossa seleção especial de produtos'
              }
            </p>
          </div>
          {!searchQuery && !category && filteredProducts.length > 0 && (
            <Link 
              to="/produtos" 
              className="flex items-center gap-2 text-center-orange hover:text-center-orangeLight transition-colors text-sm md:text-base font-medium group"
            >
              Ver todos 
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        
        <ProductGrid products={filteredProducts} />
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
                Tente uma nova pesquisa ou navegue por nossas categorias para encontrar o que você precisa.
              </p>
              <Link 
                to="/" 
                className="btn-primary inline-flex items-center gap-2"
              >
                Voltar ao início
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
