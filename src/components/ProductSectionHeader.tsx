
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProductSectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  searchQuery?: string;
}

const ProductSectionHeader: React.FC<ProductSectionHeaderProps> = ({
  title,
  showViewAll = false,
  viewAllLink = '',
  searchQuery = '',
}) => {
  if (searchQuery) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 mt-2">
          Mostrando resultados para: <span className="text-center-orange">"{searchQuery}"</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      {showViewAll && viewAllLink && (
        <Link
          to={viewAllLink}
          className="flex items-center gap-2 text-center-orange hover:text-center-orange/80 transition-colors duration-300"
        >
          <span>Ver todos</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default ProductSectionHeader;
