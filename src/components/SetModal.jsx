import React, { useState, useRef, useEffect } from "react";
import styles from "./SetModal.module.css";

function SetModal({ closeSetModal, onSubmit, defaultValue }) {
  const [formState, setFormState] = useState(
    defaultValue || {
      setName: "",
      setId: "",
      setQuantity: "",
      setLocation: "",
      id: "",
    }
  );
defaultValue
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeSetModal();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSetModal]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      formState.setName &&
      formState.setId &&
      formState.setLocation &&
      formState.setQuantity
    ) {
      return true;
    } else {
      return alert("Please fill out all required fields!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedData = 
       {
          id: formState.id,
          set_id: formState.setId,
          set_name: formState.setName,
          set_quantity: formState.setQuantity,
          set_location: formState.setLocation,
        }
    onSubmit(updatedData );
    closesetModal();
  };

  return (
    <div className={styles.setModalContainer}>
      <div className={styles.setModal} ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="setName">Set Name</label>
            <input
              name="setName"
              value={formState.setName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="isetId">Set ID</label>
            <input
              name="setId"
              value={formState.setId}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setQuantity">Set
            Quantity</label>
            <input
              name="setQuantity"
              value={formState.setQuantity}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setLocation">Set Location</label>
            <input
              name="setLocation"
              value={formState.setLocation}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={styles.button}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetModal;