
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { AirVent, Terminal, Building, Cpu } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Ar Condicionado",
    icon: <AirVent className="h-5 w-5" />,
    color: "bg-slate-800",
    textColor: "text-white",
    href: "/categoria/ar-condicionado",
  },
  {
    id: 2,
    name: "Instalações Elétricas",
    icon: <Building className="h-5 w-5" />,
    color: "bg-slate-800",
    textColor: "text-white",
    href: "/categoria/instalacoes-eletricas",
  },
  {
    id: 3,
    name: "Terminais e Conectores",
    icon: <Terminal className="h-5 w-5" />,
    color: "bg-slate-800",
    textColor: "text-white",
    href: "/categoria/terminais",
  },
  {
    id: 4,
    name: "Automação",
    icon: <Cpu className="h-5 w-5" />,
    color: "bg-slate-800",
    textColor: "text-white",
    href: "/categoria/automacao",
  },
];

const CategorySection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Categorias</h2>
        <div className="grid gap-4">
          {isMobile ? (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-md whitespace-nowrap min-w-fit",
                    category.color,
                    category.textColor
                  )}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={category.href}
                  className="flex flex-col items-center justify-center p-6 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div
                    className={cn(
                      "w-12 h-12 flex items-center justify-center rounded-full mb-2",
                      category.color,
                      category.textColor
                    )}
                  >
                    {category.icon}
                  </div>
                  <span className="text-center font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
