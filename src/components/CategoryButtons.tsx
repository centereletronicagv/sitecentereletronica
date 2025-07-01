
import React from "react";
import { useNavigate } from "react-router-dom";
import { AirVent, Plug, Cable, Settings, Monitor, Eye } from "lucide-react";

const categories = [
  {
    id: "ar-condicionado",
    name: "Ar Condicionado",
    icon: <AirVent className="h-8 w-8" />,
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
  },
  {
    id: "instalacoes-eletricas",
    name: "Instalações Elétricas",
    icon: <Plug className="h-8 w-8" />,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: "terminais",
    name: "Terminais e Conectores",
    icon: <Cable className="h-8 w-8" />,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    id: "automacao",
    name: "Automação",
    icon: <Settings className="h-8 w-8" />,
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
  },
  {
    id: "informatica",
    name: "Informática",
    icon: <Monitor className="h-8 w-8" />,
    color: "bg-cyan-500",
    hoverColor: "hover:bg-cyan-600",
  },
  {
    id: "monitoramento",
    name: "Monitoramento",
    icon: <Eye className="h-8 w-8" />,
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
  },
];

export default function CategoryButtons() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/?category=${categoryId}`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-[#181818]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Categorias de Produtos
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`${category.color} ${category.hoverColor} rounded-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-white/20 rounded-full">
                  {category.icon}
                </div>
                <span className="text-sm md:text-base font-medium text-center leading-tight">
                  {category.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
