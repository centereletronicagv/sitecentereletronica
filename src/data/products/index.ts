
import { Product } from "../../types";
import { arCondicionadoProducts } from "./ar-condicionado";
import { automacaoProducts } from "./automacao";
import { instalacoesEletricasProducts } from "./instalacoes-eletricas";
import { terminaisProducts } from "./terminais";
import { suportesProducts } from "./suportes";
import { tubulacaoProducts } from "./tubulacao";
import { tubexProducts } from "./tubex";
import { fitasProducts } from "./fitas";
import { drenoProducts } from "./dreno";
import { fluidosProducts } from "./fluidos";
import { cabosProducts } from "./cabos";
import { uniaoProducts } from "./uniao";
import { redutorProducts } from "./redutor";
import { porcaProducts } from "./porca";
import { capacitorProducts } from "./capacitor";
import { acabamentoProducts } from "./acabamento";

// Combine all products from different categories
export const products: Product[] = [
  ...arCondicionadoProducts,
  ...automacaoProducts,
  ...instalacoesEletricasProducts,
  ...terminaisProducts,
  ...suportesProducts,
  ...tubulacaoProducts,
  ...tubexProducts,
  ...fitasProducts,
  ...drenoProducts,
  ...fluidosProducts,
  ...cabosProducts,
  ...uniaoProducts,
  ...redutorProducts,
  ...porcaProducts,
  ...capacitorProducts,
  ...acabamentoProducts,
];

// Export individual category products for direct access
export {
  arCondicionadoProducts,
  automacaoProducts,
  instalacoesEletricasProducts,
  terminaisProducts,
  suportesProducts,
  tubulacaoProducts,
  tubexProducts,
  fitasProducts,
  drenoProducts,
  fluidosProducts,
  cabosProducts,
  uniaoProducts,
  redutorProducts,
  porcaProducts,
  capacitorProducts,
  acabamentoProducts,
};
