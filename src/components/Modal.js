import React, { useState } from "react";
import styles from "./Modal.module.css";

function Modal({isOpen, closeModal, title, content, image}) {
  const [isImageOpen, setIsImageOpen] = (false);

  const handleImageClick = () => {
    setIsImageOpen(!isImageOpen);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={StyleSheet.modalHeader}>
            <h2>{title}</h2>
            <div className={styles.modalButtons}>
              <button onClick={closeModal}>Close</button>
              <button onClick={handleImageClick}>Show Image </button>
            </div>
          </div>
          <div className={styles.modalContent}>{content}</div>
          {isImageOpen && (
            <div className={styles.modalImage}>
              <img src={image} alt="Instrument" />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Modal;