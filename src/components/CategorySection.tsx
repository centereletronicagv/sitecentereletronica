
import React from "react";
import { Link } from "react-router-dom";
import { Snowflake, Zap, Cable, Plug, Grid2X2, Monitor, Eye } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

// Main categories - complete list with updated icons
const categories = [
  {
    id: "ar-condicionado",
    name: "Ar Condicionado",
    icon: <Snowflake className="h-6 w-6" />,
    color: "bg-blue-600",
    hoverColor: "group-hover:bg-blue-500",
  },
  {
    id: "instalacoes-eletricas",
    name: "Instalações Elétricas",
    icon: <Zap className="h-6 w-6" />,
    color: "bg-yellow-600",
    hoverColor: "group-hover:bg-yellow-500",
  },
  {
    id: "cabos",
    name: "Cabos",
    icon: <Cable className="h-6 w-6" />,
    color: "bg-gray-600",
    hoverColor: "group-hover:bg-gray-500",
  },
  {
    id: "terminais",
    name: "Terminais e Conectores",
    icon: <Plug className="h-6 w-6" />,
    color: "bg-green-600",
    hoverColor: "group-hover:bg-green-500",
  },
  {
    id: "tomadas-industriais",
    name: "Tomadas Industriais",
    icon: <Plug className="h-6 w-6" />,
    color: "bg-red-600",
    hoverColor: "group-hover:bg-red-500",
  },
  {
    id: "automacao",
    name: "Automação",
    icon: <Grid2X2 className="h-6 w-6" />,
    color: "bg-purple-600",
    hoverColor: "group-hover:bg-purple-500",
  },
  {
    id: "informatica",
    name: "Informática",
    icon: <Monitor className="h-6 w-6" />,
    color: "bg-cyan-600",
    hoverColor: "group-hover:bg-cyan-500",
  },
  {
    id: "monitoramento",
    name: "Monitoramento",
    icon: <Eye className="h-6 w-6" />,
    color: "bg-indigo-600",
    hoverColor: "group-hover:bg-indigo-500",
  },
];

export default function CategorySection() {
  const { isMobile } = useMediaQuery();

  return (
    <section className="py-16 bg-[#181818] relative overflow-hidden" data-section="categories">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[#181818] bg-opacity-30 z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Categorias</h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-center-orange to-transparent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categoria/${category.id}`}
              className="group flex flex-col items-center justify-center p-6 rounded-xl bg-[#1e1e1e] border border-[#3d3d3d] hover:border-center-orange transition-all duration-300 hover:shadow-lg h-full transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e1e] to-[#252525] opacity-80"></div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-center-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`${category.color} ${category.hoverColor} p-4 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-200 group-hover:text-white text-center transition-colors duration-300">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
