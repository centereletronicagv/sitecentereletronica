
import React from "react";
import { Link } from "react-router-dom";
import { AirVent, Plug, Cable, Settings } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { DownloadCategoryButton } from "./DownloadCategoryButton";
import { products as allProducts } from "@/data/products";
import { motion } from "framer-motion";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function CategorySection() {
  const { isMobile } = useMediaQuery();

  return (
    <div className={`py-8 ${isMobile ? 'px-3' : 'px-4 sm:px-6 lg:px-8'} bg-gradient-to-b from-[#1e1e1e] to-[#252525]`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-white font-display">Categorias</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item} className="aspect-square">
              <Link
                to={`/?category=${category.id}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#2A2A2A] border border-[#3d3d3d] hover:border-center-orange transition-all duration-300 hover:shadow-lg hover:shadow-center-orange/20 group h-full transform hover:-translate-y-1"
              >
                <div
                  className={`${category.color} ${category.hoverColor} p-3.5 rounded-full text-white mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-200 group-hover:text-white text-center transition-colors duration-300">
                  {category.name}
                </span>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
