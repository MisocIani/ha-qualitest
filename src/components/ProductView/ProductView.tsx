import React from "react";
import styles from "./ProductView.module.css";
import { IoIosStarOutline } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { Product } from "../../types/types";

interface ProductViewProps {
  product: Product;
}

const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  if (!product) {
    return <p>Product not found</p>;
  }

  const { width, height, depth } = product.dimensions;

  return (
    <div className={styles.productInfoWrapper}>
      <div className={styles.productWindow}>
        <div className={styles.productHeader}>
          <h1>{product.title}</h1>
          <div className={styles.pricesWrapper}>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.discount}>-{product.discountPercentage}%</p>
          </div>
        </div>
        <div className={styles.imgWrapper}>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <p className={styles.productDescription}>{product.description}</p>

        <p className={styles.productDimensions}>
          Dimensions: {width} x {height} x {depth} cm
        </p>
        <p className={styles.productWeight}></p>
      </div>
      <div className={styles.productSecondary}>
        <div className={styles.stars}>
          {Array.from({ length: Math.round(product.rating) }, (_, i) => (
            <IoIosStarOutline key={i} />
          ))}
        </div>
        <div className={styles.reviewWrapper}></div>
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
  );
};

export default ProductView;
