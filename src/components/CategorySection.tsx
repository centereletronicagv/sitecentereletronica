
import React from "react";
import { Link } from "react-router-dom";
import { AirVent, Plug, Terminal, Settings } from "lucide-react";

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
    icon: <Terminal className="h-6 w-6" />,
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
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md group"
            >
              <div
                className={`${category.color} p-3 rounded-full text-white mb-3 group-hover:scale-110 transition-transform duration-200`}
              >
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
