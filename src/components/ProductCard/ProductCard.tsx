import React from "react";
import styles from "./ProductCard.module.css";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosStarOutline } from "react-icons/io";
import { ProductCardProps } from "../../types/types";

const ProductCard: React.FC<ProductCardProps> = ({
  products,
  status,
  onProductClick,
}) => {
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
              <button className={styles.favBtn}>
                <IoIosStarOutline className={styles.btn} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
