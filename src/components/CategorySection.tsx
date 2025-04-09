
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
    subcategories: [
      { name: "Suportes", href: "/categoria/ar-condicionado?subcategoria=suportes" },
      { name: "Tubulação", href: "/categoria/ar-condicionado?subcategoria=tubulacao" },
      { name: "Tubex", href: "/categoria/ar-condicionado?subcategoria=tubex" },
      { name: "Fluídos", href: "/categoria/ar-condicionado?subcategoria=fluidos" },
      { name: "Fitas", href: "/categoria/ar-condicionado?subcategoria=fitas" },
      { name: "Dreno", href: "/categoria/ar-condicionado?subcategoria=dreno" },
      { name: "Capacitores", href: "/categoria/ar-condicionado?subcategoria=capacitor" },
      { name: "Uniões", href: "/categoria/ar-condicionado?subcategoria=uniao" },
      { name: "Redutores", href: "/categoria/ar-condicionado?subcategoria=redutor" },
      { name: "Porcas", href: "/categoria/ar-condicionado?subcategoria=porca" },
      { name: "Acabamentos", href: "/categoria/ar-condicionado?subcategoria=acabamento" },
    ]
  },
  {
    id: 2,
    name: "Instalações Elétricas",
    icon: <Building className="h-5 w-5" />,
    color: "bg-slate-800",
    textColor: "text-white",
    href: "/categoria/instalacoes-eletricas",
    subcategories: [
      { name: "Disjuntores", href: "/categoria/instalacoes-eletricas?subcategoria=disjuntores" },
      { name: "Cabos", href: "/categoria/instalacoes-eletricas?subcategoria=cabos" },
    ]
  },
  {
    id: 3,
    name: "Terminais e Conectores",
    icon: <Terminal className="h-5 w-5" />,
    color: "bg-slate-800",
    textColor: "text-white",
    href: "/categoria/terminais",
    subcategories: [
      { name: "Terminais", href: "/categoria/terminais?subcategoria=terminais" },
      { name: "Conectores", href: "/categoria/terminais?subcategoria=conectores" },
    ]
  },
  {
    id: 4,
    name: "Automação",
    icon: <Cpu className="h-5 w-5" />,
    color: "bg-slate-800",
    textColor: "text-white",
    href: "/categoria/automacao",
    subcategories: [
      { name: "Botões de Impulso", href: "/categoria/automacao?subcategoria=Botão de Impulso" },
      { name: "Botões de Impulso Duplo", href: "/categoria/automacao?subcategoria=Botão de Impulso Duplo" },
      { name: "Botões Cogumelo", href: "/categoria/automacao?subcategoria=Botão Cogumelo" },
      { name: "Botões de Emergência", href: "/categoria/automacao?subcategoria=Botão de emergência" },
      { name: "Chaves Seletoras", href: "/categoria/automacao?subcategoria=Chave seletora" },
      { name: "Leds", href: "/categoria/automacao?subcategoria=Led" },
      { name: "Sinalizadores", href: "/categoria/automacao?subcategoria=Sinalizadores" },
      { name: "Partida de Motores", href: "/categoria/automacao?subcategoria=Partida de motores" },
      { name: "Relés Temporizadores", href: "/categoria/automacao?subcategoria=Relé temporizador" },
      { name: "Relés de Monitoramento", href: "/categoria/automacao?subcategoria=Relé de monitoramento" },
      { name: "Relés de Nível", href: "/categoria/automacao?subcategoria=Relé de nível" },
      { name: "Relés de Estado Sólido", href: "/categoria/automacao?subcategoria=Relé de estado sólido" },
      { name: "Relés Acopladores", href: "/categoria/automacao?subcategoria=Relé acoplador" },
      { name: "Relés Térmicos", href: "/categoria/automacao?subcategoria=Relé Térmico" },
      { name: "Contatores", href: "/categoria/automacao?subcategoria=Contatores" },
    ]
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
                <div key={category.id} className="flex flex-col border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                  <Link
                    to={category.href}
                    className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
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
                  
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <p className="text-xs text-gray-500 mb-2 font-medium">Subcategorias:</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {category.subcategories.slice(0, 8).map((subcategory, idx) => (
                          <li key={idx}>
                            <Link 
                              to={`${subcategory.href}`}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors inline-block"
                            >
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                        {category.subcategories.length > 8 && (
                          <li>
                            <Link 
                              to={category.href}
                              className="text-xs px-2 py-1 text-center-orange hover:underline inline-block"
                            >
                              +{category.subcategories.length - 8} mais
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
