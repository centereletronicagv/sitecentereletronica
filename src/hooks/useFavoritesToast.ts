
import { useToast } from "@/hooks/use-toast";

export const useFavoritesToast = () => {
  const { toast } = useToast();

  const showAddedToast = (productName: string) => {
    toast({
      title: "Adicionado aos favoritos",
      description: `${productName} foi adicionado aos seus favoritos`,
      duration: 2000,
    });
  };

  const showRemovedToast = (productName: string) => {
    toast({
      title: "Removido dos favoritos",
      description: `${productName} foi removido dos seus favoritos`,
      duration: 2000,
    });
  };

  return { showAddedToast, showRemovedToast };
};
