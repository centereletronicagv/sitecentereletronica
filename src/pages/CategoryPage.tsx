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
    category: 'conectores-e-terminais',
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
    price: 45.00,
    image: '/lovable-uploads/wegbif.png',
    category: 'instalacoes-eletricas',
  }
];
