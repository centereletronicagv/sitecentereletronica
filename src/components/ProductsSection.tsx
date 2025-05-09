import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { Product } from '../types';
import { products } from '../data/products'; // Updated import path

// Define categoryLabels before using it
const categoryLabels: Record<string, string> = {
  'automacao': 'Automação',
  'ar-condicionado': 'Ar Condicionado',
  'instalacoes-eletricas': 'Instalações Elétricas',
  'terminais': 'Terminais e Conectores',
  'botão de impulso': 'Botão de Impulso',
  'botão de impulso duplo': 'Botão de Impulso Duplo',
  'botão cogumelo': 'Botão Cogumelo',
  'botão de emergência': 'Botão de Emergência',
  'chave seletora': 'Chave Seletora',
  'led': 'Led',
  'sinalizadores': 'Sinalizadores',
  'partida de motores': 'Partida de Motores',
  'relé temporizador': 'Relé Temporizador',
  'relé de monitoramento': 'Relé de Monitoramento',
  'relé de nível': 'Relé de Nível',
  'relé de estado sólido': 'Relé de Estado Sólido',
  'relé acoplador': 'Relé Acoplador',
  'relé térmico': 'Relé Térmico',
  'contatores': 'Contatores',
  'disjuntores': 'Disjuntores',
  'dps': 'DPS',
  'idr': 'IDR',
  'suportes': 'Suportes',
  'tubulação': 'Tubulação',
  'tubex': 'Tubex',
  'fitas': 'Fitas',
  'dreno': 'Dreno',
  'fluidos': 'Fluídos',
  'fluídos': 'Fluídos',
  'cabos': 'Cabos',
  'união': 'União',
  'uniao': 'União',
  'redutor': 'Redutor',
  'porca': 'Porca',
  'capacitor': 'Capacitor',
  'acabamento': 'Acabamento',
  'ferramentas': 'Ferramentas',
};

interface ProductsSectionProps {
  searchQuery?: string;
  category?: string; // Adicionando suporte para filtrar por categoria
}

const ProductsSection = ({ searchQuery = '', category }: ProductsSectionProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filtrar produtos com base na categoria e pesquisa
    let filtered = products;
    
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (!category) {
      // Se não houver pesquisa nem categoria, mostrar produtos em destaque ou os primeiros 8 produtos
      const featured = filtered.filter(product => product.isFeatured);
      filtered = featured.length > 0 ? featured : filtered.slice(0, 8);
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, category]);

  const sectionTitle = 
    searchQuery ? `Resultados para "${searchQuery}"` : 
    category ? `Produtos de ${categoryLabels[category] || category}` : 
    'Produtos Destacados';

  return (
    <div className="py-12 md:py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{sectionTitle}</h2>
          {!searchQuery && !category && (
            <Link to="/produtos" className="flex items-center text-primary hover:underline">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </div>
        
        <ProductGrid products={filteredProducts} />
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Nenhum produto encontrado.</p>
            <p className="mt-2">Tente uma nova pesquisa ou navegue por nossas categorias.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;
