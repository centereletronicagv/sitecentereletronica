
import React from "react";
import { Link } from "react-router-dom";
import { AirVent, Plug, Cable, Settings } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { DownloadCategoryButton } from "./DownloadCategoryButton";
import { products as allProducts } from "@/data/products";

// Main categories - keeping the original main categories
const categories = [
  {
    id: "ar-condicionado",
    name: "Ar Condicionado",
    icon: <AirVent className="h-6 w-6" />,
    color: "bg-orange-600",
    hoverColor: "group-hover:bg-orange-500",
  },
  {
    id: "instalacoes-eletricas",
    name: "Instalações Elétricas",
    icon: <Plug className="h-6 w-6" />,
    color: "bg-blue-600",
    hoverColor: "group-hover:bg-blue-500",
  },
  {
    id: "terminais",
    name: "Terminais e Conectores",
    icon: <Cable className="h-6 w-6" />,
    color: "bg-green-600",
    hoverColor: "group-hover:bg-green-500",
  },
  {
    id: "automacao",
    name: "Automação",
    icon: <Settings className="h-6 w-6" />,
    color: "bg-purple-600",
    hoverColor: "group-hover:bg-purple-500",
  },
];

export default function CategorySection() {
  const { isMobile } = useMediaQuery();

  return (
    <div className={`py-8 ${isMobile ? 'px-3' : 'px-4 sm:px-6 lg:px-8'} bg-[#181818] relative overflow-hidden`}>
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF7A00\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-center text-white font-display">Categorias</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-center-orange/20 to-transparent mx-4"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="aspect-square h-full">
              <Link
                to={`/?category=${category.id}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#1e1e1e] border border-[#3d3d3d] hover:border-center-orange transition-all duration-300 hover:shadow-lg group h-full transform hover:-translate-y-1 relative overflow-hidden"
                style={{ height: "100%" }}
              >
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] to-[#252525] opacity-80"></div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-center-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`${category.color} ${category.hoverColor} p-3.5 rounded-full text-white mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white text-center transition-colors duration-300">
                    {category.name}
                  </span>
                </div>
              </Link>
              {/* Only show download button on desktop */}
              {!isMobile && (
                <div className="mt-3">
                  <DownloadCategoryButton 
                    products={allProducts.filter(product => product.category === category.id)}
                    categoryName={category.name}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
