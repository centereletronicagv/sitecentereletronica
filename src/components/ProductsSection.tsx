
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number | string;
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
    category: 'terminais',
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
    id: 'c1',
    name: 'MINI CONTATOR 7A 220V 1NA WEG',
    code: '7909158141210',
    price: 'Sob Consulta',
    image: '/lovable-uploads/miniweg220.png',
    category: 'automacao',
    popularity: 8,
    featured: true
  },
  {
    id: 'c5',
    name: 'CONTATOR 12A 220V 1NA+1NF CWB',
    code: '7909018771342',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
    popularity: 8,
    featured: true
  },
  {
    id: 'c2',
    name: 'MINI CONTATOR 9A 220V 1NA TRAMONTINA',
    code: '7891435934670',
    price: 'Sob Consulta',
    image: '/lovable-uploads/minitramontina220.png',
    category: 'automacao',
  },
  {
    id: 'c3',
    name: 'MINI CONTATOR 9A 220V 1NA SOPRANO',
    code: '7487',
    price: 'Sob Consulta',
    image: '/lovable-uploads/minisoprano220.png',
    category: 'automacao',
  },
  {
    id: 'c4',
    name: 'CONTATOR 9A 220V 1NA CWL',
    code: '7909323350638',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c6',
    name: 'CONTATOR 18A 220V 1NA+1NF CWB',
    code: '7909018772202',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c7',
    name: 'CONTATOR 25A 220V 1NA CWL',
    code: '7909323346211',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c8',
    name: 'CONTATOR 32A 220V S/ AUX. CWL',
    code: '7909323854457',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c9',
    name: 'CONTATOR 40A  220V S/ AUX. CWL',
    code: '7909323854471',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c10',
    name: 'CONTATOR 45A 220V S/ AUX. CWL',
    code: '7909323854655',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c11',
    name: 'CONTATOR 50A 220V S/ AUX. CWL',
    code: '7909522389347',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c12',
    name: 'CONTATOR 65A 220V S/ AUX. CWL',
    code: '7909522389354',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwl.png',
    category: 'automacao',
  },
  {
    id: 'c13',
    name: 'MINI CONTATOR 9A 24VAC 1NA CWC',
    code: '7909158138159',
    price: 'Sob Consulta',
    image: '/lovable-uploads/miniweg220.png',
    category: 'automacao',
  },
  {
    id: 'c14',
    name: 'CONTATOR 9A 24VAC 1NA+1NF CWB',
    code: '7909158498963',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c15',
    name: 'CONTATOR 12A 24VAC 1NA+1NF CWB',
    code: '7909158498369',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c16',
    name: 'CONTATOR 12A 24VAC 1NF TRAMONTINA',
    code: '7891435938852',
    price: 'Sob Consulta',
    image: '/lovable-uploads/tramontina24vac.png',
    category: 'automacao',
  },
  {
    id: 'c17',
    name: 'CONTATOR 18A 24VAC 1NA+1NF CWB',
    code: '7909158499076',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c18',
    name: 'CONTATOR 25A 24VAC 1NA+1NF CWB',
    code: '7909018798578',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c19',
    name: 'CONTATOR 32A 24VAC 1NA+1NF CWB',
    code: '7909018812922',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c20',
    name: 'CONTATOR 40A 12VAC 1NA IC4011',
    code: '13092',
    price: 'Sob Consulta',
    image: '/lovable-uploads/sibratec.png',
    category: 'automacao',
  },
  {
    id: 'c21',
    name: 'MINI CONTATOR AUX. 10A 24VDC 2NA CWC',
    code: '7909158138593',
    price: 'Sob Consulta',
    image: '/lovable-uploads/miniweg220.png',
    category: 'automacao',
  },
  {
    id: 'c22',
    name: 'CONTATOR 9A 24VDC 1NA+1NF CWB',
    code: '7909158247493',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c23',
    name: 'CONTATOR 12A 24VDC 1NA+1NF CWB',
    code: '7909158247561',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c24',
    name: 'CONTATOR 18A 24VDC 1NA+1NF CWB',
    code: '7909158247974',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c25',
    name: 'CONTATOR 25A  24VDC 1NA+1NF CWB',
    code: '7909018817117',
    price: 'Sob Consulta',
    image: '/lovable-uploads/cwb.png',
    category: 'automacao',
  },
  {
    id: 'c26',
    name: 'CONTATOR 32A 24VDC 1NF',
    code: '7891435938913',
    price: 'Sob Consulta',
    image: '/lovable-uploads/tramontina24vac.png',
    category: 'automacao',
  },
  {
    id: 'b1',
    name: 'BOTÃO DE IMPULSO ILUM. 1NA 24V',
    code: '7898623749054',
    price: 36.00,
    image: '/lovable-uploads/impulsoazul.png',
    category: 'automacao',
  },
  {
    id: 'b2',
    name: 'BOTÃO DE IMPULSO ILUM. 1NA 24V',
    code: '7898623748996',
    price: 36.00,
    image: '/lovable-uploads/impulsoverde.png',
    category: 'automacao',
  },
  {
    id: 'b3',
    name: 'BOTÃO DE IMPULSO ILUM. 1NF 24V',
    code: '7898623749016',
    price: 36.00,
    image: '/lovable-uploads/impulsovermelho.png',
    category: 'automacao',
  },
  {
    id: 'b4',
    name: 'BOTÃO DE IMPULSO 1NA VERMELHO',
    code: '7891435935745',
    price: 23.00,
    image: '/lovable-uploads/impulsovermelho1na.png',
    category: 'automacao',
  },
  {
    id: 'b5',
    name: 'BOTÃO DE IMPULSO 1NA VERDE',
    code: '7891435935738',
    price: 23.00,
    image: '/lovable-uploads/impulsoverde1na.png',
    category: 'automacao',
  },
  {
    id: 'b6',
    name: 'BOTÃO DE IMPULSO 1 NA AZUL',
    code: '7891435935776',
    price: 23.00,
    image: '/lovable-uploads/impulsoazul1na.png',
    category: 'automacao',
  },
  {
    id: 'b7',
    name: 'BOTÃO DE IMPULSO 1 NA AMARELO',
    code: '7891435935769',
    price: 23.00,
    image: '/lovable-uploads/impulsoamarelo1na.png',
    category: 'automacao',
  },
  {
    id: 'b8',
    name: 'BOTÃO DE IMPULSO 1 NA BRANCO',
    code: '7891435935714',
    price: 22.00,
    image: '/lovable-uploads/impulsobranco1na.png',
    category: 'automacao',
  },
  {
    id: 'b9',
    name: 'BOTÃO DE IMPULSO 1 NA PRETO',
    code: '7891435935721',
    price: 23.00,
    image: '/lovable-uploads/impulsopreto1na.png',
    category: 'automacao',
  },
  {
    id: 'b10',
    name: 'BOTÃO DE IMPULSO 1 NF PRETO',
    code: '7891435935899',
    price: 12.00,
    image: '/lovable-uploads/botaodeimpulsovermelho1nf.png',
    category: 'automacao',
  },
  {
    id: 'b11',
    name: 'BOTÃO DE IMPULSO DUPLO ILU. 1NA+1NF 220V',
    code: '7898623748026',
    price: 49.00,
    image: '/lovable-uploads/duploiluminadosibratec.png',
    category: 'automacao',
  },
  {
    id: 'b12',
    name: 'BOTÃO DE IMPULSO DUPLO ILUM. 1NA+1NF 24V',
    code: '7898623747982',
    price: 59.50,
    image: '/lovable-uploads/duploiluminadodeimpulso.png',
    category: 'automacao',
  },
  {
    id: 'b13',
    name: 'BOTÃO DE IMPULSO DUPLO ILUM. 1NA+1NF 220V',
    code: '7891435936452',
    price: 39.50,
    image: '/lovable-uploads/impulsoduplotramontina.png',
    category: 'automacao',
  },
  {
    id: 'b14',
    name: 'BOTÃO DE IMPULSO DUPLO 1NA+1NF',
    code: '7891435935806',
    price: 35.00,
    image: '/lovable-uploads/tramontinaduplo.png',
    category: 'automacao',
  },
  {
    id: 'b15',
    name: 'BOTÂO TIPO COGUMELO 1NF',
    code: '7891435935837',
    price: 22.00,
    image: '/lovable-uploads/cogumelo.png',
    category: 'automacao',
  },
  {
    id: 'b16',
    name: 'BOTÃO DE EMERGÊNCIA 1NF',
    code: '7898623748842',
    price: 38.00,
    image: '/lovable-uploads/emergencia.png',
    category: 'automacao',
  },
  {
    id: 'c17',
    name: 'CHAVE SELETORA 1NA 2 POS C/ CHAVE',
    code: '7891435936032',
    price: 31.00,
    image: '/lovable-uploads/chave1.png',
    category: 'automacao',
  },
  {
    id: 'c18',
    name: 'CHAVE SELETORA 2NA 3 POS C/ CHAVE',
    code: '7891435936049',
    price: 35.00,
    image: '/lovable-uploads/chave1.png',
    category: 'automacao',
  },
  {
    id: 'c19',
    name: 'CHAVE SELETORA ILUMINADA 2NF 3 POS',
    code: '7898623749542',
    price: 68.00,
    image: '/lovable-uploads/seletorailumvermelha.png',
    category: 'automacao',
  },
  {
    id: 'c20',
    name: 'CHAVE SELETORA ILUMINADA 2NF 3 POS.',
    code: '7898623749511',
    price: 68.00,
    image: '/lovable-uploads/seletorailumverde.png',
    category: 'automacao',
  },
  {
    id: 'c21',
    name: 'CHAVE SELETORA 2NA 3 POS.',
    code: '7892327535746',
    price: 34.00,
    image: '/lovable-uploads/seletora3ppreta.png',
    category: 'automacao',
  },
  {
    id: 'c22',
    name: 'CHAVE SELETORA 2NA 3 POS.',
    code: '7909522567752',
    price: 19.80,
    image: '/lovable-uploads/2natramontina.png',
    category: 'automacao',
  },
  {
    id: 'c23',
    name: 'CHAVE SELETORA 1NA 2 POS.',
    code: '7898623749337',
    price: 32.00,
    image: '/lovable-uploads/1natramontina.png',
    category: 'automacao',
  },
  {
    id: 'c24',
    name: 'CHAVE SELETORA 2NA 3 POS. C/ RETORNO',
    code: '7898623749405',
    price: 45.00,
    image: '/lovable-uploads/seletoraretorno.png',
    category: 'automacao',
  },
  {
    id: 'c25',
    name: 'CHAVE SELETORA 1NA 2 POS. C/ RETORNO',
    code: '7898623749399',
    price: 45.00,
    image: '/lovable-uploads/seletora1naretorno.png',
    category: 'automacao',
  },
  {
    id: 'l1',
    name: 'LED 22MM 220/127v SIBRATEC',
    code: '7898640446394',
    price: 18.00,
    image: '/lovable-uploads/led.png',
    category: 'automacao',
  },
  {
    id: 's1',
    name: 'SINALIZADOR E BUFFER LUMINOSO 24V',
    code: '7898640446578',
    price: 39.00,
    image: '/lovable-uploads/buzzer.png',
    category: 'automacao',
  },
  {
    id: 's2',
    name: 'SINALIZADOR E BUFFER LUMINOSO 220v',
    code: '7898640446561',
    price: 43.00,
    image: '/lovable-uploads/buzzer.png',
    category: 'automacao',
  },
  {
    id: 's3',
    name: 'SINALIZADOR VERMELHO 24V',
    code: '7891435936117',
    price: 16.00,
    image: '/lovable-uploads/vermelho.png',
    category: 'automacao',
  },
  {
    id: 's4',
    name: 'SINALIZADOR VERMELHO 220V',
    code: '7891435936216',
    price: 18.00,
    image: '/lovable-uploads/vermelho.png',
    category: 'automacao',
  },
  {
    id: 's5',
    name: 'SINALIZADOR VERDE 24V',
    code: '7891435936148',
    price: 16.00,
    image: '/lovable-uploads/verde.png',
    category: 'automacao',
  },
  {
    id: 's6',
    name: 'SINALIZADOR VERDE 220V',
    code: '7891435936247',
    price: 18.00,
    image: '/lovable-uploads/verde.png',
    category: 'automacao',
  },
  {
    id: 's7',
    name: 'SINALIZADOR AMARELO 24V',
    code: '7891435936124',
    price: 16.00,
    image: '/lovable-uploads/amarelo.png',
    category: 'automacao',
  },
  {
    id: 's8',
    name: 'SINALIZADOR AMARELO 220V',
    code: '7891435936223',
    price: 18.00,
    image: '/lovable-uploads/amarelo.png',
    category: 'automacao',
  },
  {
    id: 's9',
    name: 'SINALIZADOR AMARELO 24V',
    code: '7891435936131',
    price: 15.00,
    image: '/lovable-uploads/azul.png',
    category: 'automacao',
  },
  {
    id: 's10',
    name: 'SINALIZADOR AMARELO 220V',
    code: '7891435936230',
    price: 18.00,
    image: '/lovable-uploads/azul.png',
    category: 'automacao',
  },
  {
    id: 's11',
    name: 'SINALIZADOR BRANCO 24V',
    code: '7891435936100',
    price: 19.00,
    image: '/lovable-uploads/branco.png',
    category: 'automacao',
  },
  {
    id: 's12',
    name: 'SINALIZADOR BRANCO 220V',
    code: '7891435936209',
    price: 20.00,
    image: '/lovable-uploads/branco.png',
    category: 'automacao',
  },
  {
    id: 'm1',
    name: 'CHAVE P/ MOTOR MONO. 30A 2CV 250V',
    code: '7890428030573',
    price: 65.00,
    image: '/lovable-uploads/chavemotor.png',
    category: 'automacao',
  },
  {
    id: 'm2',
    name: 'CHAVE P/ MOTOR TRIF. 30A 2CV 250V',
    code: '7890428030528',
    price: 86.00,
    image: '/lovable-uploads/chavemotor.png',
    category: 'automacao',
  },
  {
    id: 'm3',
    name: 'CHAVE REVERSORA P/ MOTOR 15A',
    code: '7890428162663',
    price: 205.00,
    image: '/lovable-uploads/reversora.png',
    category: 'automacao',
  },
  {
    id: 'm4',
    name: 'CHAVE REVERSORA P/ MOTOR 30A',
    code: '7890428162687',
    price: 226.00,
    image: '/lovable-uploads/reversora.png',
    category: 'automacao',
  },
  {
    id: 'm5',
    name: 'CHAVE LIGA-DESLIGA P/ MOTOR 30A',
    code: '7890428162595',
    price: 189.00,
    image: '/lovable-uploads/reversora.png',
    category: 'automacao',
  },
  {
    id: 'm6',
    name: 'CHAVE DE TRANSFERÊNCIA P/ MOTOR 40A',
    code: '7890428162960',
    price: 228.00,
    image: '/lovable-uploads/reversora.png',
    category: 'automacao',
  },
  {
    id: 'm7',
    name: 'CHAVE DE PARTIDA ESTRELA-TRIÂNGULO 30A TRIF.',
    code: '7890428162731',
    price: 360.00,
    image: '/lovable-uploads/estrelatriangulo.png',
    category: 'automacao',
  },
];

interface ProductsSectionProps {
  searchQuery?: string;
  category?: string;
}

const ProductsSection = ({ searchQuery = '', category }: ProductsSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      if (!searchQuery && !category) {
        filteredProducts = filteredProducts
          .filter(product => product.featured || product.recommendedOrder !== undefined)
          .sort((a, b) => {
            // Sort by featured first, then by recommendedOrder
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            
            const orderA = a.recommendedOrder || 999;
            const orderB = b.recommendedOrder || 999;
            return orderA - orderB;
          })
          .slice(0, 8);
      }
      
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, category]);

  return (
    <section id="products" className="py-16 px-4 bg-[#121212]">
      <div className="container mx-auto">
        {!searchQuery && !category ? (
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Produtos Recomendados</h2>
            <Link to="/categoria/ar-condicionado" className="flex items-center gap-2 text-center-orange hover:text-center-orange/80 transition-colors duration-300">
              <span>Ver todos</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : searchQuery ? (
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Resultados da Pesquisa</h2>
            <p className="text-gray-400 mt-2">Mostrando resultados para: <span className="text-center-orange">"{searchQuery}"</span></p>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Categoria: {category}</h2>
            <p className="text-gray-400 mt-2">Mostrando produtos na categoria <span className="text-center-orange">{category}</span></p>
          </div>
        )}
        
        <ProductGrid products={products} isLoading={isLoading} searchQuery={searchQuery} category={category} />
      </div>
    </section>
  );
};

export default ProductsSection;
