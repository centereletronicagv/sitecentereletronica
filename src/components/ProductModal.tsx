
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useFavoritesToast } from '@/hooks/useFavoritesToast';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CABLE_COLORS = [
  { value: 'azul', label: 'Azul', color: '#3B82F6' },
  { value: 'branco', label: 'Branco', color: '#FFFFFF' },
  { value: 'preto', label: 'Preto', color: '#000000' },
  { value: 'vermelho', label: 'Vermelho', color: '#EF4444' },
  { value: 'verde', label: 'Verde', color: '#10B981' },
  { value: 'amarelo', label: 'Amarelo', color: '#F59E0B' },
  { value: 'marrom', label: 'Marrom', color: '#92400E' },
];

export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { showAddedToast, showRemovedToast } = useFavoritesToast();

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const isFlexCable = product.subcategory === 'cabo-flex';
  const isPriceOnRequest = product.price === 0 || product.price === null;
  const isProductFavorite = isFavorite(product.id);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Adicionando ao carrinho:', product.name);
    
    const productToAdd = {
      ...product,
      name: isFlexCable && selectedColor 
        ? `${product.name} - ${CABLE_COLORS.find(c => c.value === selectedColor)?.label}` 
        : product.name,
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    onOpenChange(false);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Comprando agora:', product.name);
    
    const productToAdd = {
      ...product,
      name: isFlexCable && selectedColor 
        ? `${product.name} - ${CABLE_COLORS.find(c => c.value === selectedColor)?.label}` 
        : product.name,
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }

    // Generate WhatsApp message
    const totalPrice = product.price * quantity;
    const message = `Olá, gostaria de comprar:\n\n${quantity}x ${productToAdd.name} (${formatPrice(totalPrice)})\n\nTotal: ${formatPrice(totalPrice)}`;
    window.open(`https://wa.me/5499270560?text=${encodeURIComponent(message)}`, '_blank');
    
    onOpenChange(false);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle favorito:', product.name);
    
    if (isProductFavorite) {
      removeFromFavorites(product.id);
      showRemovedToast(product.name);
    } else {
      addToFavorites(product);
      showAddedToast(product.name);
    }
  };

  const canAddToCart = !isPriceOnRequest && (!isFlexCable || selectedColor);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#202020] border-[#333333] text-white max-w-4xl max-h-[90vh] overflow-auto p-0 pointer-events-auto" hideCloseButton>
        <div className="relative pointer-events-auto">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors pointer-events-auto"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Imagem do produto */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#252525] to-[#202020] rounded-lg flex items-center justify-center p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-center-orange text-white text-sm px-3 py-1 rounded-full font-medium">
                  {product.code}
                </span>
              </div>
            </div>

            {/* Detalhes do produto */}
            <div className="flex flex-col space-y-6 pointer-events-auto">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
                <p className="text-gray-400 text-sm">Código: {product.code}</p>
                <p className="text-gray-400 text-sm capitalize">Categoria: {product.category}</p>
                {product.subcategory && (
                  <p className="text-gray-400 text-sm capitalize">Subcategoria: {product.subcategory}</p>
                )}
              </div>

              <div className="text-3xl font-bold text-center-orange">
                {isPriceOnRequest ? (
                  <span>Sob Consulta</span>
                ) : (
                  formatPrice(product.price)
                )}
              </div>

              {/* Seleção de cor para cabos flex */}
              {isFlexCable && (
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-white">Escolha a cor:</h3>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                    <div className="grid grid-cols-2 gap-3">
                      {CABLE_COLORS.map((color) => (
                        <div key={color.value} className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value={color.value} 
                            id={color.value}
                            className="border-gray-400"
                          />
                          <label 
                            htmlFor={color.value} 
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-400"
                              style={{ backgroundColor: color.color }}
                            />
                            <span className="text-white">{color.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Seleção de quantidade */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white">Quantidade:</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 rounded-full bg-[#333333] hover:bg-[#404040] transition-colors pointer-events-auto"
                    disabled={quantity <= 1}
                    type="button"
                  >
                    <Minus className="h-4 w-4 text-white" />
                  </button>
                  <span className="text-xl font-medium text-white min-w-[3ch] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-full bg-[#333333] hover:bg-[#404040] transition-colors pointer-events-auto"
                    type="button"
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Mensagem de seleção de cor obrigatória */}
              {isFlexCable && !selectedColor && (
                <p className="text-center-orange text-sm">
                  * Selecione uma cor para adicionar ao carrinho
                </p>
              )}

              {/* Botões de ação */}
              <div className="space-y-3 pt-4 pointer-events-auto">
                <button
                  onClick={handleBuyNow}
                  disabled={!canAddToCart}
                  className="w-full bg-center-orange hover:bg-center-orange/90 text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors flex items-center justify-center gap-2 pointer-events-auto"
                  type="button"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Comprar agora
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="w-full bg-transparent border-center-orange hover:bg-center-orange/10 text-center-orange py-3 disabled:opacity-50 disabled:cursor-not-allowed rounded-md border transition-colors flex items-center justify-center gap-2 pointer-events-auto"
                  type="button"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Adicionar ao carrinho
                </button>

                <button
                  onClick={handleToggleFavorite}
                  className="w-full bg-transparent border-[#333333] hover:bg-[#333333] text-white py-3 rounded-md border transition-colors flex items-center justify-center gap-2 pointer-events-auto"
                  type="button"
                >
                  <Heart 
                    className={`h-5 w-5 ${isProductFavorite ? 'fill-current' : ''}`} 
                  />
                  {isProductFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </button>
              </div>

              {/* Informações adicionais */}
              <div className="pt-4 border-t border-[#333333]">
                <div className="space-y-2 text-sm text-gray-400">
                  <p>✓ Produto em estoque</p>
                  <p>✓ Entrega rápida</p>
                  <p>✓ Garantia de qualidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
