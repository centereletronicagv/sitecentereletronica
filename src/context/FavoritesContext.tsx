
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    // Carregar favoritos do localStorage na inicialização
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === product.id);
      if (!isAlreadyFavorite) {
        const newFavorites = [...prev, product];
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        return newFavorites;
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => fav.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
