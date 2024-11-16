import React from "react";
import styles from "./Modal.module.css";
import { ModalProps } from "../../types/types";
import Favourites from "../Favourites/Favourites";

interface ExtendedModalProps extends ModalProps {
  contentType: "image" | "favourites";
}

const Modal: React.FC<ExtendedModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  altText,
  contentType,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        {contentType === "image" ? (
          <img src={imageUrl} alt={altText} className={styles.modalImage} />
        ) : (
          <Favourites />
        )}
      </div>
    </div>
  );
};

export default Modal;
