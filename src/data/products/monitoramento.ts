
import { Product } from "../../types";

export const monitoramentoProducts: Product[] = [
  {
    id: "cabo-cftv",
    name: "Cabo Coaxial RG59",
    brand: "Genérico",
    model: "RG59",
    price: 3.20,
    image: "/lovable-uploads/rg59.png",
    category: "monitoramento",
    description: "Cabo coaxial RG59 para sistemas de CFTV e monitoramento",
    features: ["RG59 Coaxial", "Blindagem dupla", "Baixa perda de sinal"]
  },
  {
    id: "camera-cftv",
    name: "Câmera CFTV",
    brand: "Genérico",
    model: "CFTV HD",
    price: 120.00,
    image: "/lovable-uploads/cftv.png",
    category: "monitoramento",
    description: "Câmera para sistema de circuito fechado de TV",
    features: ["Alta definição", "Visão noturna", "Resistente às intempéries"]
  }
];
