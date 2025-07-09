
import React from "react";
import { useNavigate } from "react-router-dom";
import { Snowflake, Zap, Cable, Plug, Grid2X2, Monitor, Eye, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

// Updated categories with new icons matching the image
const categories = [
  {
    id: "ar-condicionado",
    name: "Ar Condicionado",
    icon: <Snowflake className="h-5 w-5" />,
    color: "bg-blue-600",
    hoverColor: "group-hover:bg-blue-500",
  },
  {
    id: "instalacoes-eletricas",
    name: "Instalações Elétricas",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-yellow-600",
    hoverColor: "group-hover:bg-yellow-500",
  },
  {
    id: "cabos",
    name: "Cabos",
    icon: <Cable className="h-5 w-5" />,
    color: "bg-gray-600",
    hoverColor: "group-hover:bg-gray-500",
  },
  {
    id: "terminais",
    name: "Terminais e Conectores",
    icon: <Plug className="h-5 w-5" />,
    color: "bg-green-600",
    hoverColor: "group-hover:bg-green-500",
  },
  {
    id: "tomadas-industriais",
    name: "Tomadas Industriais",
    icon: <Plug className="h-5 w-5" />,
    color: "bg-red-600",
    hoverColor: "group-hover:bg-red-500",
  },
  {
    id: "automacao",
    name: "Automação",
    icon: <Grid2X2 className="h-5 w-5" />,
    color: "bg-purple-600",
    hoverColor: "group-hover:bg-purple-500",
  },
  {
    id: "informatica",
    name: "Informática",
    icon: <Monitor className="h-5 w-5" />,
    color: "bg-cyan-600",
    hoverColor: "group-hover:bg-cyan-500",
  },
  {
    id: "monitoramento",
    name: "Monitoramento",
    icon: <Eye className="h-5 w-5" />,
    color: "bg-indigo-600",
    hoverColor: "group-hover:bg-indigo-500",
  },
];

interface MobileCategoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileCategoryDrawer = ({ open, onOpenChange }: MobileCategoryDrawerProps) => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/categoria/${categoryId}`);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-gradient-to-b from-[#1E1E1E] to-[#252525] border-t border-[#3d3d3d]">
        <DrawerHeader className="border-b border-[#3d3d3d]">
          <DrawerTitle className="text-white">Categorias</DrawerTitle>
          <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#2A2A2A] border border-[#3d3d3d] hover:border-center-orange transition-all duration-300 h-full group"
                style={{ minHeight: "120px" }}
              >
                <div
                  className={`${category.color} ${category.hoverColor} p-3 rounded-full text-white mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileCategoryDrawer;
