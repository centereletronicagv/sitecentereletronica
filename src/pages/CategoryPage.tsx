
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ThumbsUp, Tag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from '@/hooks/use-mobile';
import { Product } from '../types';
import { supabase } from '../integrations/supabase/client';

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
  'informatica': 'Informática',
  'monitoramento': 'Monitoramento',
  'ferramentas': 'Ferramentas',
  'controles': 'Controles',
  'sensores': 'Sensores',
  'solda': 'Solda',
};

type SortOption = 'recommended' | 'price-low' | 'price-high';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

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
      }
    };

    fetchProducts();

    // Configurar listener para atualizações em tempo real
    const channel = supabase
      .channel('category-products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;
    
    console.log("Current slug:", slug);
    console.log("Product categories available:", Array.from(new Set(allProducts.map(p => p.category))));
    
    setIsLoading(true);
    
    if (slug) {
      const categoryProducts = allProducts.filter(product => product.category === slug);
      console.log(`Found ${categoryProducts.length} products for category: ${slug}`);
      
      const subCats = Array.from(new Set(categoryProducts
        .map(product => product.subcategory)
        .filter(Boolean) as string[]));
      
      setSubcategories(subCats);
      
      const subcategoryParam = searchParams.get('subcategoria');
      if (subcategoryParam) {
        setSelectedSubcategories([subcategoryParam]);
      } else {
        setSelectedSubcategories([]);
      }
    }
    
    if (slug && slug in categoryLabels) {
      document.title = `${categoryLabels[slug]} | Center Eletrônica`;
    } else {
      document.title = "Todos os Produtos | Center Eletrônica";
    }
    
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      filterProducts();
      setIsLoading(false);
    }, 100);
  }, [slug, searchParams, allProducts]);

  useEffect(() => {
    filterProducts();
  }, [sortBy, selectedSubcategories, allProducts]);

  const filterProducts = () => {
    console.log("Filtering products with slug:", slug);
    
    let filteredProducts = slug 
      ? allProducts.filter(product => product.category === slug)
      : allProducts;
    
    console.log(`After category filter: ${filteredProducts.length} products`);
    
    if (selectedSubcategories.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => product.subcategory && selectedSubcategories.includes(product.subcategory)
      );
      console.log(`After subcategory filter: ${filteredProducts.length} products`);
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

  const formatSubcategoryName = (name: string) => {
    return categoryLabels[name] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  const categoryName = slug && slug in categoryLabels ? categoryLabels[slug] : 'Todos os Produtos';

  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <Navbar />
      <main className={`flex-grow ${isMobile ? 'pt-16' : 'pt-20'}`}>
        <div className="container-custom py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
              </div>
            </div>
          </motion.div>
          
          {subcategories.length > 0 && (
            <div className="mb-4">
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
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-4 bg-[#1E1E1E] p-4 rounded-xl border border-[#333333]">
              <p className="text-gray-400 text-sm">
                Mostrando <span className="font-medium text-white">{products.length}</span> produto(s)
              </p>
              
              <div className={`flex items-center gap-2 ${isMobile ? 'w-full max-w-48' : ''}`}>
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
            
            <ProductGrid products={products} isLoading={isLoading} />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
