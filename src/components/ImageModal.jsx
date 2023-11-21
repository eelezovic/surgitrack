import React, { useState, useRef, useEffect } from "react"; 
import styles from "./ImageModal.module.css";

function ImageModal({ closeImageModal, imageData}) {

  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeImageModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeImageModal]);


  return (
    <div className={styles.imageModalContainer}>
      <div className={styles.imageModalWrapper} ref={modalRef}>
        <img
          src={`data:image/jpeg;base64,${imageData}`}
          alt="Instrument"
          className={styles.imageStyle}
        />
        <button className={styles.closeButton} onClick={closeImageModal}>Close</button>
      </div>
    </div>
  );
}

export default ImageModal;