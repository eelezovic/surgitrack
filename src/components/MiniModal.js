import React, { useState, useRef, useEffect } from "react";
import styles from "./MiniModal.module.css";

function MiniModal({ closeMiniModal }) {
  const [formState, setFormState] = useState({
    setName: "",
    setId: "",
    setQuantity: "",
    setLocation: "",
  });

  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeMiniModal();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMiniModal]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    closeMiniModal();
  };

  return (
    <div className={styles.miniModalContainer}>
      <div className={styles.miniModal} ref={modalRef}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="setName">Set Name</label>
            <input name="setName" value={formState.setName} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setId">ID</label>
            <input name="setId" value={formState.setId} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setQuantity">Quantity</label>
            <input name="setQuantity" value={formState.setQuantity} onChange={handleChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setLocation">Location</label>
            <input name="setLocation" value={formState.setLocation} onChange={handleChange} />
          </div>
          <button type="submit" className={styles.button} onChange={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MiniModal;
