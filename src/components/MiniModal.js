import React, { useState, useRef, useEffect } from "react";
import styles from "./MiniModal.module.css";

function MiniModal({ closeMiniModal, addItem }) {
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

  const validateForm = () => {
    if (formState.setName && formState.setId && formState.setLocation && formState.setQuantity) {
      return true;
    } else {
      return  alert("please fill out all required fields!");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    addItem({
      set_name: formState.setName,
      set_id: formState.setId,
      set_quantity: formState.setQuantity,
      set_location: formState.setLocation,
      set_action: (
        <div className={styles.actionButtons}>
          <button className={styles.editButton}>Edit</button>
          <button className={styles.deleteButton}>Delete</button>
        </div>
      ),
    });
    closeMiniModal();
  };

  return (
    <div className={styles.miniModalContainer}>
      <div className={styles.miniModal} ref={modalRef}>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MiniModal;

