
import { lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';

// Use lazy loading for ProductGrid to improve performance
const ProductGrid = lazy(() => import('./ProductGrid'));

interface ProductsSectionProps {
  searchQuery?: string;
  category?: string;
}

const ProductsSection = ({ searchQuery = '', category }: ProductsSectionProps) => {
  // Use custom hook for data fetching
  const { products, isLoading } = useProducts({
    category,
    searchQuery,
    recommendedOnly: !searchQuery && !category,
    limit: (!searchQuery && !category) ? 8 : undefined
  });

  // Define section title and link based on context
  const getSectionConfig = () => {
    if (searchQuery) {
      return {
        title: 'Resultados da Pesquisa',
        subtitle: `Mostrando resultados para: "${searchQuery}"`,
        showViewAllLink: false
      };
    }
    
    if (category) {
      const categoryNames: Record<string, string> = {
        'ar-condicionado': 'Ar Condicionado',
        'automacao': 'Automação',
        'conectores': 'Conectores',
        'terminais': 'Terminais'
      };
      
      return {
        title: categoryNames[category] || 'Produtos',
        subtitle: '',
        showViewAllLink: false
      };
    }
    
    return {
      title: 'Produtos Recomendados',
      subtitle: '',
      showViewAllLink: true
    };
  };

  const { title, subtitle, showViewAllLink } = getSectionConfig();
  
  return (
    <section id="products" className="py-16 px-4 bg-[#121212]">
      <div className="container mx-auto">
        <div className={`${showViewAllLink ? 'flex justify-between items-center' : ''} mb-8`}>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-gray-400 mt-2">{subtitle.includes('"') ? 
              <>Mostrando resultados para: <span className="text-center-orange">{searchQuery}</span></> : 
              subtitle}
            </p>}
          </div>
          
          {showViewAllLink && (
            <Link to="/categoria/ar-condicionado" className="flex items-center gap-2 text-center-orange hover:text-center-orange/80 transition-colors duration-300">
              <span>Ver todos</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
        
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-center-orange"></div></div>}>
          <ProductGrid products={products} isLoading={isLoading} searchQuery={searchQuery} />
        </Suspense>
      </div>
    </section>
  );
};

export default ProductsSection;
