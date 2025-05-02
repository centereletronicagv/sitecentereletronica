
import React from "react";
import { useNavigate } from "react-router-dom";
import { AirVent, Plug, Cable, Settings, X, Download } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { DownloadCategoryButton } from "./DownloadCategoryButton";
import { products as allProducts } from "@/data/products";
import { Button } from "./ui/button";

const categories = [
  {
    id: "ar-condicionado",
    name: "Ar Condicionado",
    icon: <AirVent className="h-5 w-5" />,
    color: "bg-orange-600",
  },
  {
    id: "instalacoes-eletricas",
    name: "Instalações Elétricas",
    icon: <Plug className="h-5 w-5" />,
    color: "bg-blue-600",
  },
  {
    id: "terminais",
    name: "Terminais e Conectores",
    icon: <Cable className="h-5 w-5" />,
    color: "bg-green-600",
  },
  {
    id: "automacao",
    name: "Automação",
    icon: <Settings className="h-5 w-5" />,
    color: "bg-purple-600",
  },
];

interface MobileCategoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileCategoryDrawer = ({ open, onOpenChange }: MobileCategoryDrawerProps) => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/?category=${categoryId}`);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-[#1E1E1E] border-t border-[#333333]">
        <DrawerHeader className="border-b border-[#333333]">
          <DrawerTitle className="text-white">Categorias</DrawerTitle>
          <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4 grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-2">
              <button
                onClick={() => handleCategorySelect(category.id)}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#252525] border border-[#333333] hover:border-[#444444] transition-all duration-200"
              >
                <div
                  className={`${category.color} p-2.5 rounded-full text-white mb-2`}
                >
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {category.name}
                </span>
              </button>
              
              {/* Add download button for each category */}
              <DownloadCategoryButton 
                products={allProducts.filter(product => product.category === category.id)}
                categoryName={category.name}
              />
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileCategoryDrawer;
