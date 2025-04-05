import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  category: string;
  recommendedOrder?: number;
  popularity?: number;
  featured?: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Abraçadeira 3/4" Tramontina Cinza',
    code: 'ABR-001',
    price: 3.70,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    recommendedOrder: 10
  },
  {
    id: '101',
    name: 'SUPORTE 400MM',
    code: '13160',
    price: 43.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 1
  },
  {
    id: '102',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 2
  },
  {
    id: '103',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 3
  },
  {
    id: '104',
    name: 'SUPORTE 550MM',
    code: '13309',
    price: 156.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 4
  },
  {
    id: '105',
    name: 'SUPORTE 900MM',
    code: '13310',
    price: 255.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 5
  },
  {
    id: '106',
    name: 'TUBULAÇÃO 1/4 Por Metro',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 6
  },
  {
    id: '107',
    name: 'TUBULAÇÃO 3/8 Por Metro',
    code: '12711',
    price: 28.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 7
  },
  {
    id: '108',
    name: 'TUBULAÇÃO 1/2 Por Metro',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 8
  },
  {
    id: '109',
    name: 'TUBULAÇÃO 5/8 Por Metro',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 9
  },
  {
    id: '110',
    name: 'TUBULAÇÃO 3/4 Por Metro',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado'
  },
  {
    id: '111',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado'
  },
  {
    id: '3',
    name: 'Curva Longa 90° 1/2" com Bolsa Tramontina Cinza',
    code: 'CRV-001',
    price: 17.00,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 5
  },
  {
    id: '4',
    name: 'Curva Longa 90° 3/4" com Bolsa Tramontina Cinza',
    code: 'CRV-002',
    price: 19.50,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 6,
    featured: true
  },
  {
    id: '5',
    name: 'Adaptador para Condulete Múltiplo 1.1/2" para 1.1/4" Tramontina',
    code: 'ADP-001',
    price: 25.30,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 4
  },
  {
    id: '6',
    name: 'Adaptador para Condulete Múltiplo 1" Tramontina',
    code: 'ADP-002',
    price: 22.80,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 7,
    featured: true
  },
  {
    id: '8',
    name: 'Terminal de Compressão 50mm',
    code: 'TRM-001',
    price: 12.50,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 8
  },
  {
    id: '9',
    name: 'Sensor de Temperatura PTC',
    code: 'SNS-001',
    price: 45.90,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '30',
    name: 'FLUÍDO R32 650g',
    code: '7899733823641',
    price: 130.00,
    image: '/lovable-uploads/r32650g.png',
    category: 'ar-condicionado',
    popularity: 9,
    featured: true
  },
  {
    id: '20',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7,
    featured: true
  },
  {
    id: '37',
    name: 'DISJUTNOR 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/weg.png',
    category: 'ar-condicionado',
    popularity: 9,
    featured: true
  },
  {
    id: '53',
    name: 'CAPACITOR 0,9UF 400VAC',
    code: '11305',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 8,
    featured: true
  },
  {
    id: '102',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '103',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '104',
    name: 'SUPORTE 550MM',
    code: '13309',
    price: 156.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '105',
    name: 'SUPORTE 900MM',
    code: '13310',
    price: 255.00,
    image: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '106',
    name: 'TUBULAÇÃO 1/4 Por Metro',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '107',
    name: 'TUBULAÇÃO 3/8 Por Metro',
    code: '12711',
    price: 28.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '108',
    name: 'TUBULAÇÃO 1/2 Por Metro',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '109',
    name: 'TUBULAÇÃO 5/8 Por Metro',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '110',
    name: 'TUBULAÇÃO 3/4 Por Metro',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '111',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '112',
    name: 'TUBEX 3/8 2m',
    code: '7200',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '113',
    name: 'TUBEX 1/2 2m',
    code: '7201',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '114',
    name: 'TUBEX 5/8 2m',
    code: '10504',
    price: 8.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '115',
    name: 'TUBEX 3/4 2m',
    code: '100232514',
    price: 10.00,
    image: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '116',
    name: 'FITA PVC 10M',
    code: '7202',
    price: 8.00,
    image: '/lovable-uploads/fitapvc.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '117',
    name: 'FITA ALUMINIZADA 45M',
    code: '7195',
    price: 9.00,
    image: '/lovable-uploads/fitaalum.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '118',
    name: 'MANGUEIRA P/ DRENO Por Metro',
    code: '11407',
    price: 5.80,
    image: '/lovable-uploads/dreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '119',
    name: 'MANGUEIRA P/ DRENO CRISTAL Por Metro',
    code: '11993',
    price: 6.50,
    image: '/lovable-uploads/drenocristal.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '120',
    name: 'BICO P/ DRENO',
    code: '12644',
    price: 15.00,
    image: '/lovable-uploads/bicodreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '121',
    name: 'FLUÍDO R32 650g',
    code: '7899733823641',
    price: 130.00,
    image: '/lovable-uploads/r32650g.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '122',
    name: 'FLUÍDO R32 3Kg',
    code: '7899733819095',
    price: 290.00,
    image: '/lovable-uploads/r323kg.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '123',
    name: 'FLUÍDO R410A 750g',
    code: '7899733805227',
    price: 129.00,
    image: '/lovable-uploads/r410a750g.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '124',
    name: 'FLUÍDO R22 900g',
    code: '7899733805180',
    price: 132.00,
    image: '/lovable-uploads/r22.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '125',
    name: 'CABO PP 4 X 1,5mm Por Metro',
    code: '9947',
    price: 9.50,
    image: '/lovable-uploads/pp4.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '126',
    name: 'CABO PP 5 X 1,5mm Por Metro',
    code: '8492',
    price: 10.20,
    image: '/lovable-uploads/pp5.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '127',
    name: 'DISJUTNOR 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/weg.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '128',
    name: 'DISJUTNOR 10A B SCHNEIDER',
    code: '7891341466906',
    price: 24.00,
    image: '/lovable-uploads/schneider.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '129',
    name: 'DISJUNTOR 10A C LUKMA',
    code: '5418',
    price: 24.00,
    image: '/lovable-uploads/lukma.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '130',
    name: 'VÁLVULA P/ GÁS 1/2',
    code: '13255',
    price: 42.00,
    image: '/lovable-uploads/valve.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '131',
    name: 'UNIÃO REGULAR 1/4',
    code: '10062',
    price: 9.80,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '132',
    name: 'UNIÃO REGULAR 3/8',
    code: '10059',
    price: 20.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '133',
    name: 'UNIÃO REGULAR 1/2',
    code: '10061',
    price: 27.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '134',
    name: 'UNIÃO REGULAR 5/8',
    code: '10060',
    price: 38.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '135',
    name: 'UNIÃO REGULAR 3/4',
    code: '10058',
    price: 55.00,
    image: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '136',
    name: 'REDUTOR 3/8 P/ 1/4',
    code: '12717',
    price: 20.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '137',
    name: 'REDUTOR 1/2 P/ 3/8',
    code: '12716',
    price: 25.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '138',
    name: 'REDUTOR 1/2 P/ 1/4',
    code: '12715',
    price: 28.00,
    image: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '139',
    name: 'PORCA 1/4',
    code: '10054',
    price: 9.50,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '140',
    name: 'PORCA 3/8',
    code: '10055',
    price: 9.80,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '141',
    name: 'PORCA 1/2',
    code: '10051',
    price: 12.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '142',
    name: 'PORCA 5/8',
    code: '10053',
    price: 29.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '143',
    name: 'PORCA 3/4',
    code: '10052',
    price: 32.00,
    image: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '144',
    name: 'CAPACITOR 0,9UF 400VAC',
    code: '11305',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '145',
    name: 'CAPACITOR 1UF 400VAC',
    code: '11306',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '146',
    name: 'CAPACITOR 1,5UF 400VAC',
    code: '11307',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '147',
    name: 'CAPACITOR 2UF 400VAC',
    code: '11308',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '148',
    name: 'CAPACITOR 2,5UF 400VAC',
    code: '11309',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '149',
    name: 'CAPACITOR 3UF 380V',
    code: '12642',
    price: 30.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '150',
    name: 'CAPACITOR 15UF 440V',
    code: '7899733814250',
    price: 25.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '151',
    name: 'CAPACITOR 20UF 380VAC',
    code: '11997',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '152',
    name: 'CAPACITOR 25UF 380VAC',
    code: '11327',
    price: 43.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '153',
    name: 'CAPACITOR 25UF 440VAC',
    code: '11325',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '154',
    name: 'CAPACITOR 30UF 380VAC',
    code: '11311',
    price: 48.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '155',
    name: 'CAPACITOR 30UF 440VAC',
    code: '11326',
    price: 53.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '156',
    name: 'CAPACITOR 35UF 450/380VAC',
    code: '11312',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '157',
    name: 'CAPACITOR 40UF 380VAC',
    code: '12643',
    price: 52.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '158',
    name: 'CAPACITOR 55UF 380VAC',
    code: '11998',
    price: 65.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '159',
    name: 'CAPACITOR 60UF 380VAC',
    code: '11999',
    price: 45.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '160',
    name: 'CAPACITOR 65UF 380VAC',
    code: '12000',
    price: 27.00,
    image: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '161',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 440VAC',
    code: '12799',
    price: 39.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '162',
    name: 'CAPACITOR DUPLO 15 + 2,5UF 450VAC',
    code: '12485',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '163',
    name: 'CAPACITOR DUPLO 25+ 2,5UF 450V',
    code: '13163',
    price: 45.00,
    image: '/lovable-uploads/duplo.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '164',
    name: 'CANALETA CB30 2M',
    code: '12651',
    price: 35.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '165',
    name: 'CANALETA CB60 2M',
    code: '12652',
    price: 40.00,
    image: '/lovable-uploads/canaleta.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '166',
    name: 'TERMINAL ACABAMENTO CB30',
    code: '12645',
    price: 38.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '167',
    name: 'TERMINAL ACABAMENTO CB60',
    code: '12649',
    price: 55.00,
    image: '/lovable-uploads/terminalacabamento.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '168',
    name: 'CURVA ANG. INTERNO CB60',
    code: '12647',
    price: 13.00,
    image: '/lovable-uploads/curvainterna.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '169',
    name: 'PASSAGEM DE PAREDE CB60',
    code: '12649',
    price: 15.00,
    image: '/lovable-uploads/passagemparede.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '170',
    name: 'CURVA PLANA REGULÁVEL CB60',
    code: '12646',
    price: 21.00,
    image: '/lovable-uploads/curvaregulavel.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '171',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '7899611800016',
    price: 23.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: '172',
    name: 'CAIXA DE PASSAGEM PARA DRENO',
    code: '789961180047',
    price: 25.00,
    image: '/lovable-uploads/passagemdreno.png',
    category: 'ar-condicionado',
    popularity: 7
  },
  {
    id: 'auto-001',
    name: 'RELÉ TEMP. MULTIFUNÇÃO 24-220V 1,5s-10d',
    code: '7891435967357',
    price: 185.00,
    image: '/lovable-uploads/tempmultifuncao.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-002',
    name: 'RELÉ TEMPORIZADOR ON DELAY 24-220V 0,5s-10d',
    code: '7891435967340',
    price: 125.00,
    image: '/lovable-uploads/ondelay.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-003',
    name: 'RELÉ TEMPORIZADOR ON DELAY 24-220V 0,6-60S',
    code: '7892327542713',
    price: 135.00,
    image: '/lovable-uploads/ondelaysoprano.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-004',
    name: 'RELÉ TEMPORIZADOR 220V 0-60s',
    code: '7899608203714',
    price: 98.00,
    image: '/lovable-uploads/ondelaylukma.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-005',
    name: 'RELÉ TEMPORIZADOR 220V 2,4-60s',
    code: '13244',
    price: 140.00,
    image: '/lovable-uploads/ondelaydigimec.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-006',
    name: 'RELÉ FALTA DE FASE E MONIT. 208-400VAC',
    code: '7891435967371',
    price: 135.00,
    image: '/lovable-uploads/faltadefase.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-007',
    name: 'RELÉ TEMP. ESTRELA-TRIÂNGULO 24-220V',
    code: '7891435967364',
    price: 165.00,
    image: '/lovable-uploads/estrelatriangulo.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-008',
    name: 'RELÉ DE NÍVEL SUPERIOR (ENCHIMENTO)',
    code: '7898640445175',
    price: 120.00,
    image: '/lovable-uploads/relenivel.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-009',
    name: 'RELÉ DE NÍVEL INFERIOR (ESVAZIAMENTO)',
    code: '789640445168',
    price: 115.00,
    image: '/lovable-uploads/relenivel.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-010',
    name: 'RELÉ DE ESTADO SÓLIDO 25A 3-32VAC 90-480VAC',
    code: '7908060401047',
    price: 119.00,
    image: '/lovable-uploads/estadosolido.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-011',
    name: 'RELÉ DE ESTADO SÓLIDO 60A 3-32VAC 90-480VAC',
    code: '7908060401030',
    price: 242.00,
    image: '/lovable-uploads/estadosolido.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-012',
    name: 'RELÉ ACOPLADOR 15A 12V',
    code: '12094',
    price: 52.00,
    image: '/lovable-uploads/acoplador.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-013',
    name: 'RELÉ ACOPLADOR 15A 24V',
    code: '12095',
    price: 52.00,
    image: '/lovable-uploads/acoplador.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-014',
    name: 'RELÉ TÉRMICO 1,20-1,80A WEG',
    code: '7909323650035',
    price: 160.00,
    image: '/lovable-uploads/termicoweg.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-015',
    name: 'RELÉ TÉRMICO 1,6-2,5A TRAMONTINA',
    code: '7891435935363',
    price: 108.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-016',
    name: 'RELÉ TÉRMICO 1,6-2,5A SOPRANO',
    code: '7892327517278',
    price: 65.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-017',
    name: 'RELÉ TÉRMICO 1,8-2,8A WEG',
    code: '7909323649886',
    price: 160.00,
    image: '/lovable-uploads/termicoweg.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-018',
    name: 'RELÉ TÉRMICO 2,8-4A WEG',
    code: '7909018607436',
    price: 208.00,
    image: '/lovable-uploads/termicoweg.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-019',
    name: 'RELÉ TÉRMICO 4-6A SOPRANO',
    code: '7892327517292',
    price: 98.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-020',
    name: 'RELÉ TÉRMICO 7-10A TRAMONTINA',
    code: '7891435935424',
    price: 115.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-021',
    name: 'RELÉ TÉRMICO 9-13A TRAMONTINA',
    code: '7891435935417',
    price: 110.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-022',
    name: 'RELÉ TÉRMICO 12-18A SOPRANO',
    code: '7892327517339',
    price: 75.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-023',
    name: 'RELÉ TÉRMICO 7-25A SOPRANO',
    code: '7892327517346',
    price: 95.00,
    image: '/lovable-uploads/termicosoprano.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-024',
    name: 'RELÉ TÉRMICO 30-40A TRAMONTINA',
    code: '7891435935462',
    price: 145.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
    popularity: 8
  },
  {
    id: 'auto-025',
    name: 'RELÉ TÉRMICO 48-65A TRAMONTINA',
    code: '7891435935486',
    price: 160.00,
    image: '/lovable-uploads/termicotramontina.png',
    category: 'automacao',
    popularity: 8
  }
];

interface ProductsSectionProps {
  searchQuery?: string;
}

const ProductsSection = ({ searchQuery = '' }: ProductsSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      if (!searchQuery) {
        filteredProducts = filteredProducts
          .filter(product => product.recommendedOrder !== undefined)
          .sort((a, b) => {
            const orderA = a.recommendedOrder || 999;
            const orderB = b.recommendedOrder || 999;
            return orderA - orderB;
          })
          .slice(0, 8);
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
  }, [searchQuery]);

  return (
    <section id="products" className="py-16 px-4 bg-[#121212]">
      <div className="container mx-auto">
        {!searchQuery ? (
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Produtos Recomendados</h2>
            <Link to="/categoria/ar-condicionado" className="flex items-center gap-2 text-center-orange hover:text-center-orange/80 transition-colors duration-300">
              <span>Ver todos</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Resultados da Pesquisa</h2>
            <p className="text-gray-400 mt-2">Mostrando resultados para: <span className="text-center-orange">"{searchQuery}"</span></p>
          </div>
        )}
        
        <ProductGrid products={products} isLoading={isLoading} searchQuery={searchQuery} />
      </div>
    </section>
  );
};

export default ProductsSection;
