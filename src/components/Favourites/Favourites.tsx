import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types/types";
import { getFavorites } from "../../utils/localStorageUtils";
import styles from "./Favourites.module.css";

const Favourites: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const updateFavorites = () => {
    const favoriteProducts = getFavorites();
    setFavorites(favoriteProducts);
  };

  useEffect(() => {
    updateFavorites();
    window.addEventListener("storage", updateFavorites);
    return () => {
      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  const handleProductClick = (productId: number) => {
    console.log(`Product clicked: ${productId}`);
  };

  return (
    <div className={styles.favoritesWrapper}>
      {favorites.length > 0 ? (
        <ProductCard
          products={favorites}
          status="succeeded"
          onProductClick={handleProductClick}
          onFavoritesChange={updateFavorites}
        />
      ) : (
        <p className={styles.notFoundText}>No favorite products found.</p>
      )}
    </div>
  );
};

export default Favourites;
