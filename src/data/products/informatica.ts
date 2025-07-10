
import { Product } from "../../types";

export const informaticaProducts: Product[] = [
  {
    id: "cabo-cat6",
    name: "Cabo de Rede Cat6",
    brand: "Genérico",
    model: "Cat6 UTP",
    price: 2.50,
    image: "/lovable-uploads/cat6.png",
    category: "informatica",
    description: "Cabo de rede Cat6 UTP para conexões Ethernet de alta velocidade",
    features: ["Cat6 UTP", "Alta velocidade", "Conectores RJ45"]
  },
  {
    id: "conector-rj45",
    name: "Conector RJ45",
    brand: "Genérico",
    model: "RJ45",
    price: 0.50,
    image: "/lovable-uploads/generico.png",
    category: "informatica",
    description: "Conector RJ45 para cabos de rede Ethernet",
    features: ["Padrão RJ45", "Conectores de qualidade", "Fácil instalação"]
  }
];
