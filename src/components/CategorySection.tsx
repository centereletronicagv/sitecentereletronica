import React from 'react';
import { Link } from 'react-router-dom';
import { FaDesktop, FaLaptop, FaMobileAlt, FaHeadphones, FaKeyboard, FaMouse, FaGamepad, FaPrint } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const categories = [
  {
    id: 'monitores',
    name: 'Monitores',
    icon: <FaDesktop size={28} />,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  },
  {
    id: 'notebooks',
    name: 'Notebooks',
    icon: <FaLaptop size={28} />,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600'
  },
  {
    id: 'celulares',
    name: 'Celulares',
    icon: <FaMobileAlt size={28} />,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600'
  },
  {
    id: 'fones-de-ouvido',
    name: 'Fones de Ouvido',
    icon: <FaHeadphones size={28} />,
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600'
  },
  {
    id: 'teclados',
    name: 'Teclados',
    icon: <FaKeyboard size={28} />,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600'
  },
  {
    id: 'mouses',
    name: 'Mouses',
    icon: <FaMouse size={28} />,
    color: 'bg-indigo-500',
    hoverColor: 'hover:bg-indigo-600'
  },
  {
    id: 'acessorios-gamer',
    name: 'Acessórios Gamer',
    icon: <FaGamepad size={28} />,
    color: 'bg-teal-500',
    hoverColor: 'hover:bg-teal-600'
  },
  {
    id: 'impressoras',
    name: 'Impressoras',
    icon: <FaPrint size={28} />,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600'
  },
];

export const CategorySection = () => {
  const { isMobile } = useMediaQuery();

  return (
    <div className={`py-12 ${isMobile ? 'px-3' : ''} bg-[#181818] relative overflow-hidden`} data-section="categories">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[#181818] bg-opacity-30 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="mb-8">
          <h2 className="section-title text-center mb-2">Categorias</h2>
          <div className="w-24 h-1 bg-center-orange mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categoria/${category.id}`}
              className="category-card group min-h-[120px] md:min-h-[140px]"
            >
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] to-[#252525] opacity-80 rounded-xl"></div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-center-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={`category-icon group-hover:scale-110 ${category.color} ${category.hoverColor}`}
                >
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300 leading-tight">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
