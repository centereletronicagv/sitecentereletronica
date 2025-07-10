
import { Product } from "../../types";
import { arCondicionadoProducts } from "./ar-condicionado";
import { automacaoProducts } from "./automacao";
import { instalacoesEletricasProducts } from "./instalacoes-eletricas";
import { cabosProducts } from "./cabos";
import { terminaisProducts } from "./terminais";
import { tomadasIndustriaisProducts } from "./tomadas-industriais";
import { informaticaProducts } from "./informatica";
import { monitoramentoProducts } from "./monitoramento";

// Combine all products from different categories
export const products: Product[] = [
  ...arCondicionadoProducts,
  ...automacaoProducts,
  ...instalacoesEletricasProducts,
  ...cabosProducts,
  ...terminaisProducts,
  ...tomadasIndustriaisProducts,
  ...informaticaProducts,
  ...monitoramentoProducts,
];

// Export individual category products for direct access
export {
  arCondicionadoProducts,
  automacaoProducts,
  instalacoesEletricasProducts,
  cabosProducts,
  terminaisProducts,
  tomadasIndustriaisProducts,
  informaticaProducts,
  monitoramentoProducts,
};
