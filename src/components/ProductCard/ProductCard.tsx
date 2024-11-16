import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { Product, ProductCardProps } from "../../types/types";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../../utils/localStorageUtils";

const ProductCard: React.FC<ProductCardProps> = ({
  products,
  status,
  onProductClick,
  onFavoritesChange,
}) => {
  const [favoriteStatuses, setFavoriteStatuses] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const initialStatuses = products.reduce((acc, product) => {
      acc[product.id] = isFavorite(product.id);
      return acc;
    }, {} as { [key: number]: boolean });
    setFavoriteStatuses(initialStatuses);
  }, [products]);

  const handleFavoriteClick = (product: Product) => {
    if (favoriteStatuses[product.id]) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
    setFavoriteStatuses((prevStatuses) => ({
      ...prevStatuses,
      [product.id]: !prevStatuses[product.id],
    }));
    onFavoritesChange();
  };

  return (
    <div className={styles.productCard}>
      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p>Error loading products.</p>}
      {products.map((product) => (
        <div
          key={product.id}
          className={styles.cardWrapper}
          onClick={() => onProductClick(product.id)}
        >
          <div className={styles.imageWrapper}>
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className={styles.secondWrapper}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className={styles.stars}>
              {Array.from({ length: Math.round(product.rating) }, (_, i) => (
                <IoIosStarOutline key={i} />
              ))}
            </div>
          </div>
          <div className={styles.thirdWrapper}>
            <div className={styles.pricesParent}>
              <p className={styles.price}>${product.price.toFixed(2)}</p>
              <p className={styles.discount}>
                -{product.discountPercentage.toFixed(2)}%
              </p>
            </div>
            <div className={styles.buttonsParent}>
              <button className={styles.cartBtn}>
                <GiShoppingCart className={styles.btn} />
              </button>
              <button
                className={styles.favBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteClick(product);
                }}
              >
                {favoriteStatuses[product.id] ? (
                  <IoIosStar className={styles.btn} />
                ) : (
                  <IoIosStarOutline className={styles.btn} />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;