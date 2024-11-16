import React, { useEffect, useState } from "react";
import styles from "./ProductView.module.css";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { GiShoppingCart } from "react-icons/gi";
import { Product } from "../../types/types";
import Review from "../reviewSection/Reviews";
import Modal from "../Modal/Modal";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../../utils/localStorageUtils";

interface ProductViewProps {
  product: Product | null;
}

const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    if (product) {
      setFavoriteStatus(isFavorite(product.id));
    }
  }, [product]);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleFavoriteClick = () => {
    if (favoriteStatus) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
    setFavoriteStatus(!favoriteStatus);
  };

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
        <div onClick={openModal} className={styles.imgWrapper}>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
          imageUrl={product.thumbnail}
          altText={product.title}
          contentType="image"
        />
        <p className={styles.productDescription}>{product.description}</p>

        <p className={styles.productDimensions}>
          Dimensions: {width} x {height} x {depth} cm
        </p>
        <p className={styles.productWeight}></p>
      </div>
      <div className={styles.productSecondary}>
        <div className={styles.reviewWrapper}>
          <Review reviews={product.reviews} />
        </div>
        <div className={styles.buttonsParent}>
          <button className={styles.cartBtn}>
            <GiShoppingCart className={styles.btn} />
          </button>
          <button className={styles.favBtn} onClick={handleFavoriteClick}>
            {isFavorite(product.id) ? (
              <IoIosStar className={styles.btn} />
            ) : (
              <IoIosStarOutline className={styles.btn} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
