import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ThumbsUp, Filter, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from '@/hooks/use-mobile';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number | string;
  image: string;
  category: string;
  recommendedOrder?: number;
}

const sampleProducts: Product[] = [
  {
    id: '10',
    name: 'SUPORTE 400MM',
    code: '13160',
    price: 43.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 1
  },
  {
    id: '11',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 2
  },
  {
    id: '12',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 3
  },
  {
    id: '13',
    name: 'SUPORTE 550MM',
    code: '13309',
    price: 156.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 4
  },
  {
    id: '14',
    name: 'SUPORTE 900MM',
    code: '13310',
    price: 255.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 5
  },
  {
    id: '15',
    name: 'TUBULAÇÃO 1/4 Por Metro',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 6
  },
  {
    id: '16',
    name: 'TUBULAÇÃO 3/8 Por Metro',
    code: '12711',
    price: 28.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 7
  },
  {
    id: '17',
    name: 'TUBULAÇÃO 1/2 Por Metro',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 8
  },
  {
    id: '18',
    name: 'TUBULAÇÃO 5/8 Por Metro',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 9
  },
  {
    id: '19',
    name: 'TUBULAÇÃO 3/4 Por Metro',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 10
  },
  {
    id: '20',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 11
  },
  {
    id: '21',
    name: 'TUBEX 3/8 2m',
    code: '7200',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 12
  },
  {
    id: '22',
    name: 'TUBEX 1/2 2m',
    code: '7201',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 13
  },
  {
    id: '23',
    name: 'TUBEX 5/8 2m',
    code: '10504',
    price: 8.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 14
  },
  {
    id: '24',
    name: 'TUBEX 3/4 2m',
    code: '100232514',
    price: 10.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    recommendedOrder: 15
  },
  {
    id: '25',
    name: 'FITA PVC 10M',
    code: '7202',
    price: 8.00,
    image: '/lovable-uploads/fitapvc.png',
    category: 'ar-condicionado',
    recommendedOrder: 16
  },
  {
    id: '26',
    name: 'FITA ALUMINIZADA 45M',
    code: '7195',
    price: 9.00,
    image: '/lovable-uploads/fitaalum.png',
    category: 'ar-condicionado',
    recommendedOrder: 17
  },
  {
    id: '27',
    name: 'MANGUEIRA P/ DRENO Por Metro',
    code: '11407',
    price: 5.80,
    image: '/lovable-uploads/dreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 18
  },
  {
    id: '28',
    name: 'MANGUEIRA P/ DRENO CRISTAL Por Metro',
    code: '11993',
    price: 6.50,
    image: '/lovable-uploads/drenocristal.png',
    category: 'ar-condicionado',
    recommendedOrder: 19
  },
  {
    id: '29',
    name: 'BICO P/ DRENO',
    code: '12644',
    price: 15.00,
    image: '/lovable-uploads/bicodreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 20
  },
  {
    id: '30',
    name: 'FLUÍDO R32 650g',
    code: '7899733823641',
    price: 130.00,
    image: '/lovable-uploads/r32650g.png',
    category: 'ar-condicionado',
    recommendedOrder: 21
  },
  {
    id: '31',
    name: 'FLUÍDO R32 3Kg',
    code: '7899733819095',
    price: 290.00,
    image: '/lovable-uploads/r323kg.png',
    category: 'ar-condicionado',
    recommendedOrder: 22
  },
  {
    id: '32',
    name: 'FLUÍDO R410A 750g',
    code: '7899733805227',
    price: 129.00,
    image: '/lovable-uploads/r410a750g.png',
    category: 'ar-condicionado',
    recommendedOrder: 23
  },
  {
    id: '33',
    name: 'FLUÍDO R22 900g',
    code: '7899733805180',
    price: 132.00,
    image: '/lovable-uploads/r22.png',
    category: 'ar-condicionado',
    recommendedOrder: 24
  },
  {
    id: '35',
    name: 'CABO PP 4 X 1,5mm Por Metro',
    code: '9947',
    price: 9.50,
    image: '/lovable-uploads/pp4.png',
    category: 'ar-condicionado',
    recommendedOrder: 25
  },
  {
    id: '36',
    name: 'CABO PP 5 X 1,5mm Por Metro',
    code: '8492',
    price: 10.20,
    image: '/lovable-uploads/pp5.png',
    category: 'ar-condicionado',
    recommendedOrder: 26
  },
  {
    id: '37',
    name: 'DISJUTNOR 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/weg.png',
    category: 'ar-condicionado',
    recommendedOrder: 27
  },
  {
    id: '38',
    name: 'DISJUTNOR 10A B SCHNEIDER',
    code: '7891341466906',
    price: 24.00,
    image: '/lovable-uploads/schneider.png',
    category: 'ar-condicionado',
    recommendedOrder: 28
  },
  {
    id: '39',
    name: 'DISJUNTOR 10A C LUKMA',
    code: '5418',
    price: 24.00,
    image: '/lovable-uploads/lukma.png',
    category: 'ar-condicionado',
    recommendedOrder: 29
  },
  {
    id: '34',
    name: 'VÁLVULA P/ GÁS 1/2',
    code: '13255',
    price: 42.00,
    image: '/lovable-uploads/valve.png',
    category: 'ar-condicionado',
    recommendedOrder: 30
  },
  {
    id: '40',
    name: 'UNIÃO REGULAR 1/4',
    code: '10062',
    price: 9.80,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 31
  },
  {
    id: '41',
    name: 'UNIÃO REGULAR 3/8',
    code: '10059',
    price: 20.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 32
  },
  {
    id: '42',
    name: 'UNIÃO REGULAR 1/2',
    code: '10061',
    price: 27.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 33
  },
  {
    id: '43',
    name: 'UNIÃO REGULAR 5/8',
    code: '10060',
    price: 38.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 34
  },
  {
    id: '44',
    name: 'UNIÃO REGULAR 3/4',
    code: '10058',
    price: 55.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    recommendedOrder: 35
  },
  {
    id: '45',
    name: 'REDUTOR 3/8 P/ 1/4',
    code: '12717',
    price: 20.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    recommendedOrder: 36
  },
  {
    id: '46',
    name: 'REDUTOR 1/2 P/ 3/8',
    code: '12716',
    price: 25.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    recommendedOrder: 37
  },
  {
    id: '47',
    name: 'REDUTOR 1/2 P/ 1/4',
    code: '12715',
    price: 28.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    recommendedOrder: 38
  },
  {
    id: '48',
    name: 'PORCA 1/4',
    code: '10054',
    price: 9.50,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 39
  },
  {
    id: '49',
    name: 'PORCA 3/8',
    code: '10055',
    price: 9.80,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 40
  },
  {
    id: '50',
    name: 'PORCA 1/2',
    code: '10051',
    price: 12.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 41
  },
  {
    id: '51',
    name: 'PORCA 5/8',
    code: '10053',
    price: 29.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 42
  },
  {
    id: '52',
    name: 'PORCA 3/4',
    code: '10052',
    price: 32.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    recommendedOrder: 43
  },
  {
    id: '53',
    name: 'CAPACITOR 0,9UF 400VAC',
    code: '11305',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 44
  },
  {
    id: '54',
    name: 'CAPACITOR 1UF 400VAC',
    code: '11306',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 45
  },
  {
    id: '55',
    name: 'CAPACITOR 1,5UF 400VAC',
    code: '11307',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 46
  },
  {
    id: '56',
    name: 'CAPACITOR 2UF 400VAC',
    code: '11308',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 47
  },
  {
    id: '57',
    name: 'CAPACITOR 2,5UF 400VAC',
    code: '11309',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    recommendedOrder: 48
  },
  {
    id: '58',
    name: 'CAPACITOR 3UF 380V',
    code: '12642',
    price: 30.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 49
  },
  {
    id: '59',
    name: 'CAPACITOR 15UF 440V',
    code: '7899733814250',
    price: 25.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 50
  },
  {
    id: '60',
    name: 'CAPACITOR 20UF 380VAC',
    code: '11997',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 51
  },
  {
    id: '61',
    name: 'CAPACITOR 25UF 380VAC',
    code: '11327',
    price: 43.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 52
  },
  {
    id: '62',
    name: 'CAPACITOR 25UF 440VAC',
    code: '11325',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 53
  },
  {
    id: '63',
    name: 'CAPACITOR 30UF 380VAC',
    code: '11311',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 54
  },
  {
    id: '64',
    name: 'CAPACITOR 30UF 440VAC',
    code: '11326',
    price: 53.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 55
  },
  {
    id: '65',
    name: 'CAPACITOR 35UF 450/380VAC',
    code: '11312',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 56
  },
  {
    id: '66',
    name: 'CAPACITOR 40UF 380VAC',
    code: '12643',
    price: 52.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 57
  },
  {
    id: '67',
    name: 'CAPACITOR 55UF 380VAC',
    code: '11998',
    price: 65.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 58
  },
  {
    id: '68',
    name: 'CAPACITOR 60UF 380VAC',
    code: '11999',
    price: 45.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 59
  },
  {
    id: '69',
    name: 'CAPACITOR 65UF 380VAC',
    code: '12000',
    price: 27.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    recommendedOrder: 60
  },
  {
    id: '70',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 440VAC',
    code: '12799',
    price: 39.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    recommendedOrder: 61
  },
  {
    id: '71',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 450VAC',
    code: '12485',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    recommendedOrder: 62
  },
  {
    id: '72',
    name: 'CAPACITOR DUPLO 25+ 2,5UF 450V',
    code: '13163',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    recommendedOrder: 63
  },
  {
    id: '73',
    name: 'CANALETA CB30 2M',
    code: '12651',
    price: 25.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    recommendedOrder: 64
  },
  {
    id: '74',
    name: 'CANALETA CB60 2M',
    code: '12652',
    price: 35.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    recommendedOrder: 65
  },
  {
    id: '75',
    name: 'TERMINAL ACABAMENTO CB30',
    code: '12645',
    price: 38.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    recommendedOrder: 66
  },
  {
    id: '76',
    name: 'TERMINAL ACABAMENTO CB60',
    code: '12649',
    price: 55.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    recommendedOrder: 67
  },
  {
    id: '77',
    name: 'CURVA ANG. INTERNO CB60',
    code: '12647',
    price: 13.00,
    image: '/lovable-uploads/curvainterna.png',
    category: 'ar-condicionado',
    recommendedOrder: 68
  },
  {
    id: '78',
    name: 'PASSAGEM DE PAREDE CB60',
    code: '12649',
    price: 15.00,
    image: '/lovable-uploads/passagemparede.png',
    category: 'ar-condicionado',
    recommendedOrder: 69
  },
  {
    id: '79',
    name: 'CURVA PLANA REGULÁVEL CB60',
    code: '12646',
    price: 21.00,
    image: '/lovable-uploads/curvaregulavel.png',
    category: 'ar-condicionado',
    recommendedOrder: 70
  },
  {
    id: '80',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '7899611800016',
    price: 23.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 71
  },
  {
    id: '81',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '789961180047',
    price: 25.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    recommendedOrder: 72
  },
  {
    id: '8',
    name: 'Terminal de Compressão 50mm',
    code: 'TRM-001',
    price: 12.50,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'terminais',
  },
  {
    id: 'e1',
    name: 'DISJUNTOR MONO 6A C WEG',
    code: '7909522567707',
    price: 23.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e2',
    name: 'DISJUNTOR MONO 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e3',
    name: 'DISJUNTOR MONO 10A B SCHNEIDER',
    code: '7891341466906',
    price: 24.00,
    image: '/lovable-uploads/schneidermono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e4',
    name: 'DISJUNTOR MONO 10A C LUKMA',
    code: '5418',
    price: 24.00,
    image: '/lovable-uploads/lukmamono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e5',
    name: 'DISJUNTOR MONO 16A C WEG',
    code: '7909522567714',
    price: 14.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e6',
    name: 'DISJUNTOR MONO 20A C WEG',
    code: '7909522567721',
    price: 12.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e7',
    name: 'DISJUNTOR MONO 20A C TRAMONTINA',
    code: '7891435964288',
    price: 27.00,
    image: '/lovable-uploads/tramontinamono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e8',
    name: 'DISJUNTOR MONO 25A C WEG',
    code: '7909522667738',
    price: 24.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e9',
    name: 'DISJUNTOR MONO 25A B SCHNEIDER',
    code: '7891341466937',
    price: 14.00,
    image: '/lovable-uploads/schneidermono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e10',
    name: 'DISJUNTOR MONO 32A C WEG',
    code: '7909522567745',
    price: 14.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e11',
    name: 'DISJUNTOR MONO 32A C TRAMONTINA',
    code: '7891435094329',
    price: 15.70,
    image: '/lovable-uploads/tramontinamono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e12',
    name: 'DISJUNTOR MONO 40A C WEG',
    code: '7909522567752',
    price: 19.80,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e13',
    name: 'DISJUNTOR MONO 40A C TRAMONTINA',
    code: '7891435094336',
    price: 19.90,
    image: '/lovable-uploads/tramontinamono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e14',
    name: 'DISJUNTOR MONO 40A C TRAMONTINA',
    code: '7891435964318',
    price: 28.70,
    image: '/lovable-uploads/tramontinamono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e15',
    name: 'DISJUNTOR MONO 40A B SCHNEIDER',
    code: '7891341467224',
    price: 28.00,
    image: '/lovable-uploads/schneidermono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e16',
    name: 'DISJUNTOR MONO 50A C WEG',
    code: '7891435094336',
    price: 19.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e17',
    name: 'DISJUNTOR MONO 50A C TRAMONTINA',
    code: '100232514',
    price: 20.00,
    image: '/lovable-uploads/tramontinamono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e18',
    name: 'DISJUNTOR MONO 63A C WEG',
    code: '7909522567776',
    price: 20.00,
    image: '/lovable-uploads/wegmono.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e19',
    name: 'DISJUNTOR BIF. 16A C WEG',
    code: '7909522567820',
    price: 45.00,
    image: '/lovable-uploads/wegbif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e20',
    name: 'DISJUNTOR BIF. 20A C WEG',
    code: '7909522567837',
    price: 45.00,
    image: '/lovable-uploads/wegbif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e21',
    name: 'DISJUNTOR BIF. 32A C WEG',
    code: '7909522567851',
    price: 45.00,
    image: '/lovable-uploads/wegbif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e22',
    name: 'DISJUNTOR BIF. 40A C WEG',
    code: '7909522567868',
    price: 48.00,
    image: '/lovable-uploads/wegbif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e23',
    name: 'DISJUNTOR BIF. 50A C TRAMONTINA',
    code: '7891435964486',
    price: 85.00,
    image: '/lovable-uploads/tramontinabif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e24',
    name: 'DISJUNTOR TRIF. 16 C SCHNEIDER',
    code: '00447',
    price: 68.00,
    image: '/lovable-uploads/schneidertrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e25',
    name: 'DISJUNTOR TRIF. 20A C SCHNEIDER',
    code: '00426',
    price: 65.00,
    image: '/lovable-uploads/schneidertrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e26',
    name: 'DISJUNTOR TRIF. 25A C WEG',
    code: '7909522567950',
    price: 55.00,
    image: '/lovable-uploads/wegtrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e27',
    name: 'DISJUNTOR TRIF. 32A C TRAMONTINA',
    code: '7891435964622',
    price: 98.00,
    image: '/lovable-uploads/tramontinatrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e28',
    name: 'DISJUNTOR TRIF. 40A C WEG',
    code: '7890355193693',
    price: 54.00,
    image: '/lovable-uploads/wegtrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e29',
    name: 'DISJUNTOR TRIF. 40A C SCHNEIDER',
    code: '04926',
    price: 65.00,
    image: '/lovable-uploads/schneidertrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e30',
    name: 'DISJUNTOR TRIF. 40A C SOPRANO',
    code: '7892327540320',
    price: 79.00,
    image: '/lovable-uploads/sopranotrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e31',
    name: 'DISJUNTOR TRIF. 50A C WEG',
    code: '7909522567981',
    price: 54.00,
    image: '/lovable-uploads/wegtrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e32',
    name: 'DISJUNTOR TRIF. 50A C SOPRANO',
    code: '7892327540351',
    price: 72.00,
    image: '/lovable-uploads/sopranotrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e33',
    name: 'DISJUNTOR TRIF. 63A C WEG',
    code: '7909522567998',
    price: 68.00,
    image: '/lovable-uploads/wegtrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e34',
    name: 'DISJUNTOR TRIF. 80A C WEG',
    code: '7890355193938',
    price: 199.00,
    image: '/lovable-uploads/wegtrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e35',
    name: 'DISJUNTOR TRIF. 100A C WEG',
    code: '10062',
    price: 246.00,
    image: '/lovable-uploads/wegtrif.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'e36',
    name: 'DISJUNTOR TRIF. 125A CAIXA MOLDADA TRAMONTINA',
    code: '7891435963335',
    price: 268.00,
    image: '/lovable-uploads/caixamoldada.png',
    category: 'instalacoes-eletricas',
  },
  {
    id: 'a1',
    name: 'RELÉ TEMP. MULTIFUNÇÃO 24-220V 1,5s-10d',
    code: '7891435967357',
    price: 185.00,
    image: '/lovable-uploads/tempmultifuncao.png',
    category: 'automacao',
  },
  {
    id: 'a2',
    name: 'RELÉ TEMPORIZADOR ON DELAY 24-220V 0,5s-10d',
    code: '7891435967340',
    price: 125.00,
    image: '/lovable-uploads/ondelay.png',
    category: 'automacao',
  },
  {
    id: 'a3',
    name: 'RELÉ TEMPORIZADOR ON DELAY 24-220V 0,6-60S',
    code: '7892327542713',
    price: 135.00,
    image: '/lovable-uploads/ondelaysoprano.png',
    category: 'automacao',
  },
  {
    id: 'a4',
    name: 'RELÉ TEMPORIZADOR 220V 0-60s',
    code: '7899608203714',
    price: 98.00,
    image: '/lovable-uploads/ondelaylukma.png',
    category: 'automacao',
  },
  {
    id: 'a5',
    name: 'RELÉ TEMPORIZADOR 220V 2,4-60s',
    code: '13244',
    price: 140.00,
    image: '/lovable-uploads/ondelaydigimec.png',
    category: 'automacao',
  },
  {
    id: 'a6',
    name: 'RELÉ FALTA DE FASE E MONIT. 208-400VAC',
    code: '7891435967371',
    price: 135.00,
    image: '/lovable-uploads/faltadefase.png',
    category: 'automacao',
  },
  {
    id: 'a7',
    name: 'RELÉ TEMP. ESTRELA-TRIÂNGULO 24-220V',
    code: '7891435967364',
    price: 165.00,
    image: '/lovable-uploads/estrelatriangulo.png',
    category: 'automacao',
  },
  {
    id: 'a8',
    name: 'RELÉ DE NÍVEL SUPERIOR (ENCHIMENTO)',
    code: '7898640445175',
    price: 120.00,
    image: '/lovable-uploads/relenivel.png',
    category: 'automacao',
  },
  {
    id: 'a9',
    name: 'RELÉ DE NÍVEL INFERIOR (ESVAZIAMENTO)',
    code: '789640445168',
    price: 115.00,
    image: '/lovable-uploads/relenivel.png',
    category: 'automacao',
  },
  {
    id: 'a10',
    name: 'RELÉ DE ESTADO SÓLIDO 25A 3-32VAC 90-480VAC',
    code: '7908060401047',
    price: 119.00,
    image: '/lovable-uploads/estadosolido.png',
    category: 'automacao',
  },
  {
    id: 'a11',
    name: 'RELÉ DE ESTADO SÓLIDO 60A 3-32VAC 90-480VAC',
    code: '7908060401030',
    price: 242.00,
    image: '/lovable-uploads/estadosolido.png',
    category: 'automacao',
  },
  {
    id: 'a12',
    name: 'RELÉ ACOPLADOR 15A 12V',
    code: '12094',
    price: 52.00,
    image: '/lovable-uploads/acoplador.png',
    category: 'automacao',
  },
  {
    id: 'a13',
    name: 'RELÉ ACOPLADOR 15A 24V',
    code: '12095',
    price: 52.00,
    image: '/lovable-uploads/acoplador.png',
    category: 'automacao',
  },
  {
    id: 'a14',
    name: 'RELÉ TÉRMICO 1,20-1,80A WEG',
    code: '7909323650035',
    price: 160.00,
    image: '/lovable-uploads/termicoweg.png',
    category: 'automacao',
  },
  {
    id: 'a15',
    name: 'RELÉ TÉRMICO 1,6-2,5A TRAMONTINA',
    code: '7891435935363',
    price: 108.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
  },
  {
    id: 'a16',
    name: 'RELÉ TÉRMICO 1,6-2,5A SOPRANO',
    code: '7892327517278',
    price: 65.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
  },
  {
    id: 'a17',
    name: 'RELÉ TÉRMICO 1,8-2,8A WEG',
    code: '7909323649886',
    price: 160.00,
    image: '/lovable-uploads/termicoweg.png',
    category: 'automacao',
  },
  {
    id: 'a18',
    name: 'RELÉ TÉRMICO 2,8-4A WEG',
    code: '7909018607436',
    price: 208.00,
    image: '/lovable-uploads/termicoweg.png',
    category: 'automacao',
  },
  {
    id: 'a19',
    name: 'RELÉ TÉRMICO 4-6A SOPRANO',
    code: '7892327517292',
    price: 98.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
  },
  {
    id: 'a20',
    name: 'RELÉ TÉRMICO 7-10A TRAMONTINA',
    code: '7891435935424',
    price: 115.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
  },
  {
    id: 'a21',
    name: 'RELÉ TÉRMICO 9-13A TRAMONTINA',
    code: '7891435935417',
    price: 110.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
  },
  {
    id: 'a22',
    name: 'RELÉ TÉRMICO 12-18A SOPRANO',
    code: '7892327517339',
    price: 75.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
  },
  {
    id: 'a23',
    name: 'RELÉ TÉRMICO 7-25A SOPRANO',
    code: '7892327517346',
    price: 95.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
  },
  {
    id: 'a24',
    name: 'RELÉ TÉRMICO 30-40A TRAMONTINA',
    code: '7891435935462',
    price: 145.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
  },
  {
    id: 'a25',
    name: 'RELÉ TÉRMICO 48-65A TRAMONTINA',
    code: '7891435935486',
    price: 160.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
  },
  {
    id: 'c1',
    name: 'MINI CONTATOR 7A 220V 1NA WEG',
    code: '7909158141210',
    price: "Sob Consulta",
    image: '/lovable-uploads/miniweg220.png',
    category: 'automacao',
  },
  {
    id: 'c2',
    name: 'MINI CONTATOR 9A 220V 1NA TRAMONTINA',
    code: '7891435934670',
    price: "Sob Consulta",
    image: '/lovable-uploads/minitramontina220.png',
    category: 'automacao',
  },
  {
    id: 'c3',
    name: 'MINI CONTATOR 9A 220V 1NA SOPRANO',
    code: '7487',
    price: "Sob Consulta",
    image: '/lovable-uploads/minisoprano220.png',
    category: 'automacao',
  },
  {
    id: 'c4',
    name: 'CONTATOR 9A 220V 1NA CWL',
    code: '7909323350638',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c5',
    name: 'CONTATOR 12A 220V 1NA+1NF CWB',
    code: '7909018771342',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c6',
    name: 'CONTATOR 18A 220V 1NA+1NF CWB',
    code: '7909018772202',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c7',
    name: 'CONTATOR 25A 220V 1NA CWL',
    code: '7909323346211',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c8',
    name: 'CONTATOR 32A 220V S/ AUX. CWL',
    code: '7909323854457',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c9',
    name: 'CONTATOR 40A 220V S/ AUX. CWL',
    code: '7909323854471',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c10',
    name: 'CONTATOR 45A 220V S/ AUX. CWL',
    code: '7909323854655',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c11',
    name: 'CONTATOR 50A 220V S/ AUX. CWL',
    code: '7909522389347',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c12',
    name: 'CONTATOR 65A 220V S/ AUX. CWL',
    code: '7909522389354',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c13',
    name: 'MINI CONTATOR 9A 24VAC 1NA CWC',
    code: '7909158138159',
    price: "Sob Consulta",
    image: '/lovable-uploads/miniweg220.png',
    category: 'automacao',
  },
  {
    id: 'c14',
    name: 'CONTATOR 9A 24VAC 1NA+1NF CWB',
    code: '7909158498963',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c15',
    name: 'CONTATOR 12A 24VAC 1NA+1NF CWB',
    code: '7909158498369',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c16',
    name: 'CONTATOR 12A 24VAC 1NF TRAMONTINA',
    code: '7891435938852',
    price: "Sob Consulta",
    image: '/lovable-uploads/tramontina24vac.png',
    category: 'automacao',
  },
  {
    id: 'c17',
    name: 'CONTATOR 18A 24VAC 1NA+1NF CWB',
    code: '7909158499076',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c18',
    name: 'CONTATOR 25A 24VAC 1NA+1NF CWB',
    code: '7909018798578',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c19',
    name: 'CONTATOR 32A 24VAC 1NA+1NF CWB',
    code: '7909018812922',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c20',
    name: 'CONTATOR 40A 12VAC 1NA IC4011',
    code: '13092',
    price: "Sob Consulta",
    image: '/lovable-uploads/sibratec.png',
    category: 'automacao',
  },
  {
    id: 'c21',
    name: 'MINI CONTATOR AUX. 10A 24VDC 2NA CWC',
    code: '7909158138593',
    price: "Sob Consulta",
    image: '/lovable-uploads/miniweg220.png',
    category: 'automacao',
  },
  {
    id: 'c22',
    name: 'CONTATOR 9A 24VDC 1NA+1NF CWB',
    code: '7909158247493',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c23',
    name: 'CONTATOR 12A 24VDC 1NA+1NF CWB',
    code: '7909158247561',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c24',
    name: 'CONTATOR 18A 24VDC 1NA+1NF CWB',
    code: '7909158247974',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c25',
    name: 'CONTATOR 25A 24VDC 1NA+1NF CWB',
    code: '7909018817117',
    price: "Sob Consulta",
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c26',
    name: 'CONTATOR 32A 24VDC 1NF',
    code: '7891435938913',
    price: "Sob Consulta",
    image: '/lovable-uploads/tramontina24vac.png',
    category: 'automacao',
  },
];

const categoryLabels: Record<string, string> = {
  'instalacoes-eletricas': 'Instalações Elétricas',
  'terminais': 'Terminais',
  'automacao': 'Automação',
  'suportes': 'Suportes',
  'tubulacao': 'Tubulação',
  'tubex': 'Tubex',
  'fitas': 'Fitas',
  'dreno': 'Dreno',
  'fluidos': 'Fluídos',
  'cabos': 'Cabos',
  'disjuntores': 'Disjuntores',
  'uniao': 'União',
  'redutor': 'Redutor',
  'porca': 'Porca',
  'capacitor': 'Capacitor',
  'acabamento': 'Acabamento',
  'ar-condicionado': 'Ar Condicionado',
};

type SortOption = 'recommended' | 'price-low' | 'price-high';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const categories = Array.from(new Set(sampleProducts.map(product => product.category)));
    setAllCategories(categories);
    
    let filteredProducts = slug 
      ? sampleProducts.filter(product => product.category === slug)
      : sampleProducts;
    
    // Filter by price range only for products with numeric prices
    filteredProducts = filteredProducts.filter(
      product => typeof product.price === 'string' || 
                (product.price >= priceRange[0] && product.price <= priceRange[1])
    );
    
    switch(sortBy) {
      case 'recommended':
        filteredProducts.sort((a, b) => {
          if (a.recommendedOrder !== undefined && b.recommendedOrder !== undefined) {
            return a.recommendedOrder - b.recommendedOrder;
          }
          if (a.recommendedOrder !== undefined) {
            return -1;
          }
          if (b.recommendedOrder !== undefined) {
            return 1;
          }
          return 0;
        });
        break;
      case 'price-low':
        filteredProducts.sort((a, b) => {
          // Handle string prices (place "Sob Consulta" at the end)
          if (typeof a.price === 'string' && typeof b.price === 'string') return 0;
          if (typeof a.price === 'string') return 1;
          if (typeof b.price === 'string') return -1;
          return a.price - b.price;
        });
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => {
          // Handle string prices (place "Sob Consulta" at the end)
          if (typeof a.price === 'string' && typeof b.price === 'string') return 0;
          if (typeof a.price === 'string') return 1;
          if (typeof b.price === 'string') return -1;
          return b.price - a.price;
        });
        break;
    }
    
    setProducts(filteredProducts);
    
    if (slug && slug in categoryLabels) {
      document.title = `${categoryLabels[slug]} | Center Eletrônica`;
    } else {
      document.title = "Todos os Produtos | Center Eletrônica";
    }
    
    window.scrollTo(0, 0);
  }, [slug, priceRange, sortBy]);

  const maxPrice = Math.max(...sampleProducts
    .filter(product => typeof product.price === 'number')
    .map(product => product.price as number));
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#151515]">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {slug && slug in categoryLabels ? categoryLabels[slug] : 'Todos os Produtos'}
            </h1>
            <p className="text-gray-400">Encontre os melhores produtos para seu projeto</p>
          </motion.div>
          
          <div className="lg:hidden flex justify-between items-center mb-6">
            <div className="text-gray-400 text-sm flex items-center">
              <span>Mostrando</span>
              <span className="font-semibold text-white mx-1">{products.length}</span>
              <span>produto(s)</span>
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 bg-[#252525] border border-[#333] px-2.5 py-1.5 rounded-lg text-gray-300 text-sm"
            >
              <Filter size={14} />
              <span>Filtros</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`lg:col-span-1 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="bg-gradient-to-b from-[#1E1E1E] to-[#232323] p-6 rounded-xl border border-[#333333] shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={18} className="text-center-orange" />
                  <h2 className="text-white font-semibold text-xl">Categorias</h2>
                </div>
                <nav className="space-y-2">
                  {allCategories.map(cat => (
                    <a 
                      key={cat}
                      href={`/categoria/${cat}`}
                      className={`block py-2.5 px-4 rounded-md text-sm transition-all duration-200 ${
                        slug === cat 
                          ? 'bg-center-orange text-white font-medium shadow-md shadow-center-orange/20' 
                          : 'text-gray-300 hover:bg-[#333333] hover:text-white'
                      }`}
                    >
                      {categoryLabels[cat] || cat}
                    </a>
                  ))}
                </nav>
              </div>
              
              <div className="bg-gradient-to-b from-[#1E1E1E] to-[#232323] p-6 rounded-xl border border-[#333333] shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <ArrowUpNarrowWide size={18} className="text-center-orange" />
                  <h2 className="text-white font-semibold text-xl">Filtrar por Preço</h2>
                </div>
                <div className="px-2">
                  <Slider 
                    defaultValue={priceRange} 
                    max={maxPrice} 
                    step={1}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-white text-sm bg-[#252525] p-3 rounded-lg">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center justify-between mb-6 bg-[#1E1E1E] p-4 rounded-xl border border-[#333333]">
                <p className="text-gray-400 text-sm hidden md:block">
                  Mostrando <span className="font-medium text-white">{products.length}</span> produto(s)
                </p>
                
                <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                  <span className="text-gray-400 text-xs md:text-sm whitespace-nowrap">Ordenar por:</span>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className={`bg-[#252525] border-[#333333] text-white ${isMobile ? 'text-xs h-8 flex-1' : 'w-[180px]'}`}>
                      <SelectValue placeholder="Recomendado" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E1E1E] border-[#333333] text-white">
                      <SelectItem value="recommended" className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-center-orange" /> Recomendado
                      </SelectItem>
                      <SelectItem value="price-low" className="flex items-center gap-2">
                        <ArrowUpNarrowWide className="w-4 h-4" /> Menor preço
                      </SelectItem>
                      <SelectItem value="price-high" className="flex items-center gap-2">
                        <ArrowDownNarrowWide className="w-4 h-4" /> Maior preço
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <ProductGrid products={products} />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
