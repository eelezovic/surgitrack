import React, { useState } from "react";
import styles from "./Modal.module.css";

function Modal({ isOpen, closeModal, title, content }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(!isImageOpen);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <div className={styles.modalButtons}>
              <button className={styles.modalButton} onClick={closeModal}>Close</button>
            </div>
          </div>
          <div className={styles.modalContent}>{content}</div>
          {isImageOpen && (
            <div className={styles.modalImage}>
              <img
                src={content.src}
                alt={content.alt}
                onClick={handleImageClick}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Modal;