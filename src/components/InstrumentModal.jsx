import React, { useState, useRef, useEffect } from "react";
import styles from "./InstrumentModal.module.css";

function InstrumentModal({ closeInstrumentModal, onSubmit, defaultValue }) {
  const [formState, setFormState] = useState(
    defaultValue || {
      instrumentName: "",
      instrumentId: "",
      instrumentQuantity: "",
      instrumentLocation: "",
      instrumentImage: "",
      id: "",
    }
  );

  const modalRef = useRef();
  const imageInputRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeInstrumentModal();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeInstrumentModal]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setFormState({
        ...formState,
        instrumentImage: base64Image,
      });
    };

    reader.readAsDataURL(imageFile);
  };

  const validateForm = () => {
    if (
      formState.instrumentName &&
      formState.instrumentId &&
      formState.instrumentLocation &&
      formState.instrumentQuantity 

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
          instrument_id: formState.instrumentId,
          instrument_name: formState.instrumentName,
          instrument_quantity: formState.instrumentQuantity,
          instrument_location: formState.instrumentLocation,
          instrument_image: formState.instrumentImage,
        };
        
    onSubmit(updatedData );
    closeInstrumentModal();
  };

  return (
    <div className={styles.instrumentModalContainer}>
      <div className={styles.instrumentModal} ref={modalRef}>
      <div className={styles.closeButtonInstrumentContainer}>
        <button className={styles.closeButtonInstrumentModal} onClick={closeInstrumentModal}>X</button>
      </div>
      <div className={styles.instrumentFormContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="instrumentName">Instrument Name</label>
            <input
              name="instrumentName"
              value={formState.instrumentName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="instrumentId">Instrument ID</label>
            <input
              name="instrumentId"
              value={formState.instrumentId}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="instrumentQuantity">Instrument
            Quantity</label>
            <input
              name="instrumentQuantity"
              value={formState.instrumentQuantity}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="instrumentLocation">Instrument Location</label>
            <input
              name="instrumentLocation"
              value={formState.instrumentLocation}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="instrumentImage">Instrument Image</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              name="instrumentImage"
              onChange={handleImageChange}
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
    </div>
  );
}

export default InstrumentModal;

