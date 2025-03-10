
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
}

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  slug: string;
  products: Product[];
}

export default function CategorySection({ title, subtitle, slug, products }: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px tolerance
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [products]);

  const handleScroll = () => {
    checkScrollButtons();
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newPosition =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 relative">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="text-center-gray">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollTo('left')}
                disabled={!canScrollLeft}
                className={`p-2 rounded-full border ${
                  canScrollLeft 
                    ? 'border-gray-200 text-center-darkGray hover:bg-gray-50' 
                    : 'border-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scrollTo('right')}
                disabled={!canScrollRight}
                className={`p-2 rounded-full border ${
                  canScrollRight 
                    ? 'border-gray-200 text-center-darkGray hover:bg-gray-50' 
                    : 'border-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <Link 
              to={`/categoria/${slug}`} 
              className="inline-flex items-center gap-1 text-sm font-medium text-center-orange hover:text-center-orangeDark transition-colors"
            >
              Ver todos
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="snap-start flex-shrink-0 w-[280px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
