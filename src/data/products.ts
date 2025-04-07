import { Product } from "@/types"

export const products: Product[] = [
  {
    id: 'sensor-ptc-temperatura',
    name: 'Sensor de Temperatura PTC',
    category: 'automacao',
    description: 'Sensor de Temperatura PTC para aplicações de automação.',
    price: 29.99,
    imageUrl: '/lovable-uploads/00b83df6-8857-4892-a9a5-37085b5cf813.png',
    isFeatured: true,
  },
  {
    id: 'arduino-uno',
    name: 'Arduino Uno R3',
    category: 'automacao',
    description: 'Placa de desenvolvimento Arduino Uno R3.',
    price: 59.99,
    imageUrl: '/arduino-uno.jpg',
    isFeatured: true,
  },
  {
    id: 'resistor-1k-ohm',
    name: 'Resistor 1k Ohm',
    category: 'componentes-passivos',
    description: 'Resistor de 1k Ohm para diversas aplicações eletrônicas.',
    price: 0.20,
    imageUrl: '/resistor-1k-ohm.jpg',
    isFeatured: false,
  },
  {
    id: 'capacitor-eletrolitico-100uf',
    name: 'Capacitor Eletrolítico 100uF',
    category: 'componentes-passivos',
    description: 'Capacitor eletrolítico de 100uF para filtragem e acoplamento.',
    price: 0.50,
    imageUrl: '/capacitor-eletrolitico-100uf.jpg',
    isFeatured: false,
  },
  {
    id: 'led-vermelho-5mm',
    name: 'LED Vermelho 5mm',
    category: 'componentes-ativos',
    description: 'LED vermelho de 5mm para sinalização e iluminação.',
    price: 0.15,
    imageUrl: '/led-vermelho-5mm.jpg',
    isFeatured: false,
  },
  {
    id: 'transistor-bc548',
    name: 'Transistor BC548',
    category: 'componentes-ativos',
    description: 'Transistor NPN BC548 para amplificação e chaveamento.',
    price: 0.30,
    imageUrl: '/transistor-bc548.jpg',
    isFeatured: false,
  },
  {
    id: 'protoboard-400-pontos',
    name: 'Protoboard 400 Pontos',
    category: 'prototipagem',
    description: 'Protoboard de 400 pontos para montagem de circuitos experimentais.',
    price: 7.99,
    imageUrl: '/protoboard-400-pontos.jpg',
    isFeatured: false,
  },
  {
    id: 'jumpers-macho-macho',
    name: 'Jumpers Macho-Macho',
    category: 'prototipagem',
    description: 'Conjunto de jumpers macho-macho para conexões em protoboards.',
    price: 3.50,
    imageUrl: '/jumpers-macho-macho.jpg',
    isFeatured: false,
  },
];

// Remove the PTC temperature sensor from the products array
export const updatedProducts = products.filter(
  product => product.id !== 'sensor-ptc-temperatura'
);
