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
import { getProductsByCategory, getCategoryDetails } from '../services/productService';
import { ProductType } from "../types/types";

type SortOption = 'recommended' | 'price-low' | 'price-high';

const categoryLabels: Record<string, string> = {
  'instalacoes-eletricas': 'Instalações Elétricas',
  'terminais': 'Terminais e Conectores',
  'automacao': 'Automação',
  'ar-condicionado': 'Ar Condicionado',
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
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<{ title: string, description: string, image: string }>({
    title: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (slug) {
      const categoryProducts = getProductsByCategory(slug);
      console.log("Fetched products for category:", slug, categoryProducts);
      
      // Get subcategories from products
      const subCats = Array.from(new Set(categoryProducts
        .map(product => product.description)
        .filter(Boolean)));
      
      setSubcategories(subCats);
      
      // Get category details
      const details = getCategoryDetails(slug);
      setCategoryDetails(details);
      
      // Check URL for subcategory param
      const subcategoryParam = searchParams.get('subcategoria');
      if (subcategoryParam) {
        setSelectedSubcategories([subcategoryParam]);
      } else {
        setSelectedSubcategories([]);
      }

      // Set available categories based on our known categories
      setAllCategories(Object.keys(categoryLabels));
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
  }, [priceRange, sortBy, selectedSubcategories, slug]);

  const filterProducts = () => {
    if (!slug) return;
    
    let filteredProducts = getProductsByCategory(slug);
    
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (selectedSubcategories.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => product.description && selectedSubcategories.includes(product.description)
      );
    }
    
    switch(sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'recommended':
      default:
        // Keep original order or sort by featured if available
        filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
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

  const maxPrice = Math.max(...products.map(product => product.price), 400);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatSubcategoryName = (name: string) => {
    return categoryLabels[name] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Convert products to the format expected by ProductGrid
  const formattedProducts = products.map(product => ({
    ...product,
    code: product.barcode || product.id
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {categoryDetails.title || (slug && categoryLabels[slug]) || 'Produtos'}
            </h1>
            <p className="text-gray-400">{categoryDetails.description || 'Encontre os melhores produtos para seu projeto'}</p>
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
                    {subcategory}
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
                        <span className="text-gray-300">{subcategory}</span>
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
              
              <ProductGrid products={formattedProducts} />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
