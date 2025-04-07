import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

const defaultDescription = "Produto eletrônico para diversas aplicações.";

// Process mock products to ensure they have description and isFeatured properties
const processMockProduct = (product: Partial<Product>): Product => {
  return {
    description: defaultDescription,
    isFeatured: false,
    ...product
  } as Product;
};

const mockProducts: Product[] = [
  processMockProduct({
    id: '1',
    name: 'Abraçadeira 3/4" Tramontina Cinza',
    code: 'ABR-001',
    price: 3.70,
    image: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    imageUrl: '/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    recommendedOrder: 10,
    description: 'Abraçadeira para instalações elétricas'
  }),
  processMockProduct({
    id: '101',
    name: 'SUPORTE 400MM',
    code: '13160',
    price: 43.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 1
  }),
  processMockProduct({
    id: '102',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 2
  }),
  processMockProduct({
    id: '103',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 3
  }),
  processMockProduct({
    id: '104',
    name: 'SUPORTE 550MM',
    code: '13309',
    price: 156.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 4
  }),
  processMockProduct({
    id: '105',
    name: 'SUPORTE 900MM',
    code: '13310',
    price: 255.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    recommendedOrder: 5
  }),
  processMockProduct({
    id: '106',
    name: 'TUBULAÇÃO 1/4 Por Metro',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 6
  }),
  processMockProduct({
    id: '107',
    name: 'TUBULAÇÃO 3/8 Por Metro',
    code: '12711',
    price: 28.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 7
  }),
  processMockProduct({
    id: '108',
    name: 'TUBULAÇÃO 1/2 Por Metro',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 8
  }),
  processMockProduct({
    id: '109',
    name: 'TUBULAÇÃO 5/8 Por Metro',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    recommendedOrder: 9
  }),
  processMockProduct({
    id: '110',
    name: 'TUBULAÇÃO 3/4 Por Metro',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado'
  }),
  processMockProduct({
    id: '111',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    imageUrl: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado'
  }),
  processMockProduct({
    id: '3',
    name: 'Curva Longa 90° 1/2" com Bolsa Tramontina Cinza',
    code: 'CRV-001',
    price: 17.00,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    imageUrl: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 5
  }),
  processMockProduct({
    id: '4',
    name: 'Curva Longa 90° 3/4" com Bolsa Tramontina Cinza',
    code: 'CRV-002',
    price: 19.50,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    imageUrl: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 6,
    featured: true
  }),
  processMockProduct({
    id: '5',
    name: 'Adaptador para Condulete Múltiplo 1.1/2" para 1.1/4" Tramontina',
    code: 'ADP-001',
    price: 25.30,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    imageUrl: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 4
  }),
  processMockProduct({
    id: '6',
    name: 'Adaptador para Condulete Múltiplo 1" Tramontina',
    code: 'ADP-002',
    price: 22.80,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    imageUrl: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 7,
    featured: true
  }),
  processMockProduct({
    id: '8',
    name: 'Terminal de Compressão 50mm',
    code: 'TRM-001',
    price: 12.50,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    imageUrl: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 8
  }),
  processMockProduct({
    id: '9',
    name: 'Sensor de Temperatura PTC',
    code: 'SNS-001',
    price: 45.90,
    image: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    imageUrl: '/public/lovable-uploads/fe15bc67-99a8-48bb-9477-8a5f5d5f928d.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '30',
    name: 'FLUÍDO R32 650g',
    code: '7899733823641',
    price: 130.00,
    image: '/lovable-uploads/r32650g.png',
    imageUrl: '/lovable-uploads/r32650g.png',
    category: 'ar-condicionado',
    popularity: 9,
    featured: true
  }),
  processMockProduct({
    id: '20',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    imageUrl: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7,
    featured: true
  }),
  processMockProduct({
    id: '37',
    name: 'DISJUTNOR 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/weg.png',
    imageUrl: '/lovable-uploads/weg.png',
    category: 'ar-condicionado',
    popularity: 9,
    featured: true
  }),
  processMockProduct({
    id: '53',
    name: 'CAPACITOR 0,9UF 400VAC',
    code: '11305',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    imageUrl: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 8,
    featured: true
  }),
  processMockProduct({
    id: '102',
    name: 'SUPORTE 450MM',
    code: '12602',
    price: 48.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '103',
    name: 'SUPORTE 500MM',
    code: '7204',
    price: 75.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '104',
    name: 'SUPORTE 550MM',
    code: '13309',
    price: 156.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '105',
    name: 'SUPORTE 900MM',
    code: '13310',
    price: 255.00,
    image: '/lovable-uploads/suporte.png',
    imageUrl: '/lovable-uploads/suporte.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '106',
    name: 'TUBULAÇÃO 1/4 Por Metro',
    code: '12710',
    price: 19.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '107',
    name: 'TUBULAÇÃO 3/8 Por Metro',
    code: '12711',
    price: 28.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '108',
    name: 'TUBULAÇÃO 1/2 Por Metro',
    code: '12709',
    price: 37.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '109',
    name: 'TUBULAÇÃO 5/8 Por Metro',
    code: '12712',
    price: 49.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '110',
    name: 'TUBULAÇÃO 3/4 Por Metro',
    code: '12713',
    price: 59.00,
    image: '/lovable-uploads/tubulacao.png',
    imageUrl: '/lovable-uploads/tubulacao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '111',
    name: 'TUBEX 1/4 2m',
    code: '7199',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    imageUrl: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '112',
    name: 'TUBEX 3/8 2m',
    code: '7200',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    imageUrl: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '113',
    name: 'TUBEX 1/2 2m',
    code: '7201',
    price: 6.50,
    image: '/lovable-uploads/tubex.png',
    imageUrl: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '114',
    name: 'TUBEX 5/8 2m',
    code: '10504',
    price: 8.00,
    image: '/lovable-uploads/tubex.png',
    imageUrl: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '115',
    name: 'TUBEX 3/4 2m',
    code: '100232514',
    price: 10.00,
    image: '/lovable-uploads/tubex.png',
    imageUrl: '/lovable-uploads/tubex.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '116',
    name: 'FITA PVC 10M',
    code: '7202',
    price: 8.00,
    image: '/lovable-uploads/fitapvc.png',
    imageUrl: '/lovable-uploads/fitapvc.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '117',
    name: 'FITA ALUMINIZADA 45M',
    code: '7195',
    price: 9.00,
    image: '/lovable-uploads/fitaalum.png',
    imageUrl: '/lovable-uploads/fitaalum.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '118',
    name: 'MANGUEIRA P/ DRENO Por Metro',
    code: '11407',
    price: 5.80,
    image: '/lovable-uploads/dreno.png',
    imageUrl: '/lovable-uploads/dreno.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '119',
    name: 'MANGUEIRA P/ DRENO CRISTAL Por Metro',
    code: '11993',
    price: 6.50,
    image: '/lovable-uploads/drenocristal.png',
    imageUrl: '/lovable-uploads/drenocristal.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '120',
    name: 'BICO P/ DRENO',
    code: '12644',
    price: 15.00,
    image: '/lovable-uploads/bicodreno.png',
    imageUrl: '/lovable-uploads/bicodreno.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '121',
    name: 'FLUÍDO R32 650g',
    code: '7899733823641',
    price: 130.00,
    image: '/lovable-uploads/r32650g.png',
    imageUrl: '/lovable-uploads/r32650g.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '122',
    name: 'FLUÍDO R32 3Kg',
    code: '7899733819095',
    price: 290.00,
    image: '/lovable-uploads/r323kg.png',
    imageUrl: '/lovable-uploads/r323kg.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '123',
    name: 'FLUÍDO R410A 750g',
    code: '7899733805227',
    price: 129.00,
    image: '/lovable-uploads/r410a750g.png',
    imageUrl: '/lovable-uploads/r410a750g.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '124',
    name: 'FLUÍDO R22 900g',
    code: '7899733805180',
    price: 132.00,
    image: '/lovable-uploads/r22.png',
    imageUrl: '/lovable-uploads/r22.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '125',
    name: 'CABO PP 4 X 1,5mm Por Metro',
    code: '9947',
    price: 9.50,
    image: '/lovable-uploads/pp4.png',
    imageUrl: '/lovable-uploads/pp4.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '126',
    name: 'CABO PP 5 X 1,5mm Por Metro',
    code: '8492',
    price: 10.20,
    image: '/lovable-uploads/pp5.png',
    imageUrl: '/lovable-uploads/pp5.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '127',
    name: 'DISJUTNOR 10A C WEG',
    code: '7909522567677',
    price: 14.00,
    image: '/lovable-uploads/weg.png',
    imageUrl: '/lovable-uploads/weg.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '128',
    name: 'DISJUTNOR 10A B SCHNEIDER',
    code: '7891341466906',
    price: 24.00,
    image: '/lovable-uploads/schneider.png',
    imageUrl: '/lovable-uploads/schneider.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '129',
    name: 'DISJUNTOR 10A C LUKMA',
    code: '5418',
    price: 24.00,
    image: '/lovable-uploads/lukma.png',
    imageUrl: '/lovable-uploads/lukma.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '130',
    name: 'VÁLVULA P/ GÁS 1/2',
    code: '13255',
    price: 42.00,
    image: '/lovable-uploads/valve.png',
    imageUrl: '/lovable-uploads/valve.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '131',
    name: 'UNIÃO REGULAR 1/4',
    code: '10062',
    price: 9.80,
    image: '/lovable-uploads/uniao.png',
    imageUrl: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '132',
    name: 'UNIÃO REGULAR 3/8',
    code: '10059',
    price: 20.00,
    image: '/lovable-uploads/uniao.png',
    imageUrl: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '133',
    name: 'UNIÃO REGULAR 1/2',
    code: '10061',
    price: 27.00,
    image: '/lovable-uploads/uniao.png',
    imageUrl: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '134',
    name: 'UNIÃO REGULAR 5/8',
    code: '10060',
    price: 38.00,
    image: '/lovable-uploads/uniao.png',
    imageUrl: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '135',
    name: 'UNIÃO REGULAR 3/4',
    code: '10058',
    price: 55.00,
    image: '/lovable-uploads/uniao.png',
    imageUrl: '/lovable-uploads/uniao.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '136',
    name: 'REDUTOR 3/8 P/ 1/4',
    code: '12717',
    price: 20.00,
    image: '/lovable-uploads/redutor.png',
    imageUrl: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '137',
    name: 'REDUTOR 1/2 P/ 3/8',
    code: '12716',
    price: 25.00,
    image: '/lovable-uploads/redutor.png',
    imageUrl: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '138',
    name: 'REDUTOR 1/2 P/ 1/4',
    code: '12715',
    price: 28.00,
    image: '/lovable-uploads/redutor.png',
    imageUrl: '/lovable-uploads/redutor.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '139',
    name: 'PORCA 1/4',
    code: '10054',
    price: 9.50,
    image: '/lovable-uploads/porca.png',
    imageUrl: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '140',
    name: 'PORCA 3/8',
    code: '10055',
    price: 9.80,
    image: '/lovable-uploads/porca.png',
    imageUrl: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '141',
    name: 'PORCA 1/2',
    code: '10051',
    price: 12.00,
    image: '/lovable-uploads/porca.png',
    imageUrl: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '142',
    name: 'PORCA 5/8',
    code: '10053',
    price: 29.00,
    image: '/lovable-uploads/porca.png',
    imageUrl: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '143',
    name: 'PORCA 3/4',
    code: '10052',
    price: 32.00,
    image: '/lovable-uploads/porca.png',
    imageUrl: '/lovable-uploads/porca.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '144',
    name: 'CAPACITOR 0,9UF 400VAC',
    code: '11305',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    imageUrl: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '145',
    name: 'CAPACITOR 1UF 400VAC',
    code: '11306',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    imageUrl: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '146',
    name: 'CAPACITOR 1,5UF 400VAC',
    code: '11307',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    imageUrl: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '147',
    name: 'CAPACITOR 2UF 400VAC',
    code: '11308',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    imageUrl: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '148',
    name: 'CAPACITOR 2,5UF 400VAC',
    code: '11309',
    price: 20.00,
    image: '/lovable-uploads/capacitorpreto.png',
    imageUrl: '/lovable-uploads/capacitorpreto.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '149',
    name: 'CAPACITOR 3UF 380V',
    code: '12642',
    price: 30.00,
    image: '/lovable-uploads/capacitor.png',
    imageUrl: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '150',
    name: 'CAPACITOR 15UF 440V',
    code: '7899733814250',
    price: 25.00,
    image: '/lovable-uploads/capacitor.png',
    imageUrl: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '151',
    name: 'CAPACITOR 20UF 380VAC',
    code: '11997',
    price: 35.00,
    image: '/lovable-uploads/capacitor.png',
    imageUrl: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  }),
  processMockProduct({
    id: '152',
    name: 'CAPACITOR 25UF 380VAC',
    code: '11327',
    price: 43.00,
    image: '/lovable-uploads/capacitor.png',
    imageUrl: '/lovable-uploads/capacitor.png',
    category: 'ar-condicionado',
    popularity: 7
  })
];
