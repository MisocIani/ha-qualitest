import { Product } from "../types/types";

export const getFavorites = (): Product[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  };
  
  export const addFavorite = (product: Product): void => {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, product];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  
  export const removeFavorite = (productId: number): void => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(product => product.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  
  export const isFavorite = (productId: number): boolean => {
    const favorites = getFavorites();
    return favorites.some(product => product.id === productId);
  };