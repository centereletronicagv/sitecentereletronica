
import { Heart, Menu, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/context/CartContext";
import CartModal from "./CartModal";
import MobileCategoryDrawer from "./MobileCategoryDrawer";

const Navbar = () => {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMenu = (open: boolean) => {
    setIsMenuOpen(open);
  };

  return (
    <nav className="py-3 px-4 md:px-6 lg:px-8 border-b sticky top-0 z-10 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={toggleMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Center Eletrônica</SheetTitle>
                <SheetDescription>
                  Navegue pelas nossas categorias
                </SheetDescription>
              </SheetHeader>
              <MobileCategoryDrawer open={isMenuOpen} onOpenChange={toggleMenu} />
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/logotransparente.png" 
              alt="Center Eletrônica Logo" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg hidden sm:inline-block">
              Center Eletrônica
            </span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-1">
          <Link to="/categoria/instalacoes-eletricas">
            <Button variant="ghost">Instalações Elétricas</Button>
          </Link>
          <Link to="/categoria/terminais">
            <Button variant="ghost">Terminais</Button>
          </Link>
          <Link to="/categoria/automacao">
            <Button variant="ghost">Automação</Button>
          </Link>
          <Link to="/categoria/ar-condicionado">
            <Button variant="ghost">Ar Condicionado</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/favoritos")}
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Button>
          {isCartOpen && <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
