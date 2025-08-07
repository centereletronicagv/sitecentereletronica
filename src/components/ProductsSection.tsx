import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { Product } from '../types';
import { supabase } from '../integrations/supabase/client';

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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar produtos do Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories(name)
          `)
          .eq('in_stock', true);
        
        if (error) {
          console.error('Erro ao buscar produtos:', error);
          return;
        }

        const formattedProducts: Product[] = (data || []).map(product => ({
          id: product.id,
          name: product.name,
          category: product.categories?.name || 'Geral',
          description: product.description || '',
          price: product.price || 0,
          imageUrl: product.image_url,
          isFeatured: product.is_featured,
          code: product.code || '',
          image: product.image_url || '',
          recommendedOrder: product.popularity || 0,
          popularity: product.popularity || 0,
          featured: product.is_featured,
          inStock: product.in_stock
        }));

        setAllProducts(formattedProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Configurar listener para atualizações em tempo real
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchProducts(); // Recarregar produtos quando houver mudanças
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  useEffect(() => {
    // Filtrar produtos com base na categoria e pesquisa
    let filtered = allProducts;
    
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
  }, [searchQuery, category, allProducts]);

  const sectionTitle = 
    searchQuery ? `Resultados para "${searchQuery}"` : 
    category ? `Produtos de ${categoryLabels[category] || category}` : 
    'Produtos Destacados';

  if (loading) {
    return (
      <section className="py-2 md:py-6">
        <div className="container-custom">
          <div className="text-center py-16">
            <p className="text-gray-400">Carregando produtos...</p>
          </div>
        </div>
      </section>
    );
  }

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
