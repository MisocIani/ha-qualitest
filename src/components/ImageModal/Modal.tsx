import React from "react";
import styles from "./Modal.module.css";
import { ModalProps } from "../../types/types";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  altText,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <img src={imageUrl} alt={altText} className={styles.modalImage} />
      </div>
    </div>
  );
};

export default Modal;
