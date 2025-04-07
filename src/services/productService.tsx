
import { ProductType } from "../types/types";
import { automationProducts } from "../data/automationProducts";

// Import other product categories here if they exist
// import { acProducts } from "../data/acProducts";

export const getAllProducts = (): ProductType[] => {
  // Combine all product categories
  return [
    ...automationProducts,
    // Add other product categories here
    // ...acProducts,
  ];
};

export const getProductsByCategory = (category: string): ProductType[] => {
  switch (category) {
    case "automacao":
      return automationProducts;
    // Add other categories here
    // case "ar-condicionado":
    //   return acProducts;
    default:
      return [];
  }
};

export const getProductById = (id: string): ProductType | undefined => {
  return getAllProducts().find((product) => product.id === id);
};

export const getCategoryDetails = (category: string) => {
  switch (category) {
    case "automacao":
      return {
        title: "Automação",
        description: "Produtos para automação industrial e residencial",
        image: "/lovable-uploads/00b83df6-8857-4892-a9a5-37085b5cf813.png",
      };
    // Add other categories here
    // case "ar-condicionado":
    //   return {
    //     title: "Ar Condicionado",
    //     description: "Produtos para instalação e manutenção de ar condicionado",
    //     image: "/placeholder.svg",
    //   };
    default:
      return {
        title: "Categoria",
        description: "Produtos diversos",
        image: "/placeholder.svg",
      };
  }
};

// Get unique subcategories from products
export const getSubcategories = (category: string): string[] => {
  const products = getProductsByCategory(category);
  const subcategories = products.map((product) => product.description);
  return [...new Set(subcategories)];
};

// Get products by subcategory
export const getProductsBySubcategory = (
  category: string,
  subcategory: string
): ProductType[] => {
  const products = getProductsByCategory(category);
  return products.filter((product) => product.description === subcategory);
};

export const getFeaturedProducts = (): ProductType[] => {
  return getAllProducts().filter((product) => product.featured);
};
