
import React from "react";
import { Link } from "react-router-dom";
import { AirVent, Plug, Cable, Settings } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";

const categories = [
  {
    id: "ar-condicionado",
    name: "Ar Condicionado",
    icon: <AirVent className="h-6 w-6" />,
    color: "bg-orange-600",
  },
  {
    id: "instalacoes-eletricas",
    name: "Instalações Elétricas",
    icon: <Plug className="h-6 w-6" />,
    color: "bg-blue-600",
  },
  {
    id: "terminais",
    name: "Terminais e Conectores",
    icon: <Cable className="h-6 w-6" />,
    color: "bg-green-600",
  },
  {
    id: "automacao",
    name: "Automação",
    icon: <Settings className="h-6 w-6" />,
    color: "bg-purple-600",
  },
];

export default function CategorySection() {
  const { isMobile } = useMediaQuery();

  return (
    <div className={`py-6 ${isMobile ? 'px-3' : 'px-4 sm:px-6 lg:px-8'} bg-[#1e1e1e]`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-4 text-white">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/?category=${category.id}`}
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#252525] border border-[#333333] hover:border-gray-300 transition-all duration-200 hover:shadow-md group"
            >
              <div
                className={`${category.color} p-2.5 rounded-full text-white mb-2 group-hover:scale-110 transition-transform duration-200`}
              >
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
