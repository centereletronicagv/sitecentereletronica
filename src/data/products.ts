import { Product } from "../types";

export const products: Product[] = [
  {
    id: "3",
    name: "COMPRESSOR 6HP QJ316PAA TJX4454YXA",
    description: "Compressor de ar condicionado 6HP.",
    price: 1599.0,
    code: "100232515",
    image: "/lovable-uploads/compressao6.png",
    category: "ar-condicionado",
    subcategory: "Compressores",
    inStock: true,
    isFeatured: true,
  },
  // Novos produtos para automação
  {
    id: "a1",
    name: "BOTÃO DE IMPULSO ILUM. 1NA 24V",
    description: "Botão de impulso iluminado com contato normalmente aberto 24V.",
    price: 36.0,
    code: "7898623749054",
    image: "/lovable-uploads/impulsoazul.png",
    category: "automacao",
    subcategory: "Botão de Impulso",
    inStock: true,
    isFeatured: false,
  },
  // ... (all existing automation, air conditioning, and terminal products)
  {
    id: "t47",
    name: "TERMINAL LUVA FÊMEA 2,5MM ISOLADO",
    description: "Terminal luva fêmea isolado para fios de 2,5mm².",
    price: 2.00,
    code: "7899287706209",
    image: "/lovable-uploads/isolado.png",
    category: "terminais",
    subcategory: "Terminais",
    inStock: true,
    isFeatured: false,
  },
];
