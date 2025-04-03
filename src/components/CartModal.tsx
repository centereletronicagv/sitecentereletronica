
import React from 'react';
import { Minus, Plus, ShoppingCart, X, ShoppingBag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartModal({ open, onOpenChange }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') {
      return price; // Return the string as is (for "Sob Consulta")
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleCheckout = () => {
    // Generate WhatsApp message with all cart items
    const items = cartItems.map(
      item => {
        const priceDisplay = typeof item.price === 'string' ? item.price : formatPrice(item.price * item.quantity);
        return `${item.quantity}x ${item.name} (${priceDisplay})`;
      }
    ).join('\n');
    
    const total = formatPrice(getTotalPrice());
    let message = `Olá, gostaria de fazer o seguinte pedido:\n\n${items}\n\n`;
    
    // Only include total if there are items with numeric prices
    if (cartItems.some(item => typeof item.price === 'number')) {
      message += `Total dos itens com preço definido: ${total}\n`;
    }
    
    // Add a note for "Sob Consulta" items
    if (cartItems.some(item => typeof item.price === 'string')) {
      message += "Aguardo retorno sobre os valores dos produtos listados como 'Sob Consulta'.";
    }
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/5499270560?text=${encodeURIComponent(message)}`, '_blank');
    
    // Show success toast
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado via WhatsApp.",
    });
    
    // Clear cart after checkout
    clearCart();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#202020] border-[#333333] text-white max-w-3xl max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-center-orange" />
            Carrinho de compras
          </DialogTitle>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-400 text-lg">Seu carrinho está vazio</p>
            <Button 
              variant="outline" 
              className="mt-4 bg-transparent border-[#333333] hover:bg-[#333333] text-gray-300"
              onClick={() => onOpenChange(false)}
            >
              Voltar para loja
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table className="text-white">
                <TableHeader className="bg-[#232323]">
                  <TableRow>
                    <TableHead className="text-gray-400 w-[100px]">Produto</TableHead>
                    <TableHead className="text-gray-400">Descrição</TableHead>
                    <TableHead className="text-gray-400 text-right">Preço</TableHead>
                    <TableHead className="text-gray-400 text-center">Qtd</TableHead>
                    <TableHead className="text-gray-400 text-right">Subtotal</TableHead>
                    <TableHead className="text-gray-400 w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-[#2A2A2A]">
                      <TableCell>
                        <div className="h-16 w-16 bg-[#252525] rounded flex items-center justify-center overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-xs text-gray-400">Cód: {item.code}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(item.price)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <button 
                            className="p-1 rounded-full hover:bg-[#333333] text-gray-400"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2 min-w-[30px] text-center">{item.quantity}</span>
                          <button 
                            className="p-1 rounded-full hover:bg-[#333333] text-gray-400"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-center-orange">
                        {typeof item.price === 'string' 
                          ? item.price 
                          : formatPrice(item.price * item.quantity)}
                      </TableCell>
                      <TableCell>
                        <button 
                          className="p-1.5 rounded-full hover:bg-[#333333] text-gray-400"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X size={16} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              {cartItems.some(item => typeof item.price === 'number') && (
                <div className="flex justify-between items-center py-2 border-t border-[#333333]">
                  <span className="font-medium text-lg">Total (itens com preço):</span>
                  <span className="font-bold text-xl text-center-orange">{formatPrice(getTotalPrice())}</span>
                </div>
              )}
              
              {cartItems.some(item => typeof item.price === 'string') && (
                <div className="flex items-center py-2 border-t border-[#333333] text-center-orange">
                  <span className="font-medium">
                    Esse pedido contém produtos com preço sob consulta
                  </span>
                </div>
              )}
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-[#333333] hover:bg-[#333333] text-gray-300"
                  onClick={() => onOpenChange(false)}
                >
                  Continuar comprando
                </Button>
                <Button 
                  className="bg-center-orange hover:bg-center-orange/90 text-white"
                  onClick={handleCheckout}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Realizar pedido
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
