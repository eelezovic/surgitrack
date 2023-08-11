import React, { useState, useRef, useEffect } from "react";
import styles from "./MiniModal.module.css";

function MiniModal({ closeMiniModal, onSubmit, defaultValue, componentType }) {
  const [formState, setFormState] = useState(
    defaultValue || {
      setName: "",
      setId: "",
      setQuantity: "",
      setLocation: "",
      setImage: "",
      setContent: "",
      id: "",
    }
  );

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

    const updatedData = componentType
      ? {
          id: formState.id,
          instrument_id: formState.setId,
          instrument_name: formState.setName,
          instrument_quantity: formState.setQuantity,
          instrument_location: formState.setLocation,
        }
      : {
          id: formState.id,
          set_id: formState.setId,
          set_name: formState.setName,
          set_quantity: formState.setQuantity,
          set_location: formState.setLocation,
          set_image: formState.setImage,
          set_content: formState.setContent,
        };

    onSubmit(updatedData );
    closeMiniModal();
  };

  return (
    <div className={styles.miniModalContainer}>
      <div className={styles.miniModal} ref={modalRef}>
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
            <label htmlFor="setId">ID</label>
            <input
              name="setId"
              value={formState.setId}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setQuantity">Quantity</label>
            <input
              name="setQuantity"
              value={formState.setQuantity}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setLocation">Location</label>
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

export default MiniModal;
