
import { Product } from "../../types";
import { arCondicionadoProducts } from "./ar-condicionado";
import { automacaoProducts } from "./automacao";
import { instalacoesEletricasProducts } from "./instalacoes-eletricas";
import { terminaisProducts } from "./terminais";

// Combine all products from different categories
export const products: Product[] = [
  ...arCondicionadoProducts,
  ...automacaoProducts,
  ...instalacoesEletricasProducts,
  ...terminaisProducts,
];

// Export individual category products for direct access
export {
  arCondicionadoProducts,
  automacaoProducts,
  instalacoesEletricasProducts,
  terminaisProducts,
};
