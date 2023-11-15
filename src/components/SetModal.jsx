import React, { useState, useRef, useEffect } from "react";
import styles from "./SetModal.module.css";

function SetModal({ closeSetModal, onSubmit, defaultValue }) {
  const [formState, setFormState] = useState(
    defaultValue || {
      setName: "",
      setId: "",
      setQuantity: "",
      setLocation: "",
      setSpecialty: "Urology",
      setImage: "",
      id: "",
    }
  );

  const modalRef = useRef();
  const imageInputRef = useRef();

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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setFormState({
        ...formState,
        setImage: base64Image,
      });
    };

    reader.readAsDataURL(imageFile);
  };

  const validateForm = () => {
    if (
      formState.setName &&
      formState.setId &&
      formState.setLocation &&
      formState.setQuantity &&
      formState.setSpecialty
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
          select_specialty: formState.setSpecialty,
          set_image: formState.setImage,
        }
    onSubmit(updatedData );
    closeSetModal();
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
          <div className={styles.formGroup}>
            <label htmlFor="setSpecialty">Set
            Specialty </label>
            <select name="setSpecialty" value={formState.setSpecialty} onChange={handleChange}>
           
              <option value="Orthopedic">Orthopedic</option>
              <option value="Urology">Urology</option>
              <option value="Plastics">Plastics</option>
              <option value="General">General</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Neurology">Neurology</option>
              <option value="Obstetrics">Obstetrics</option>
              <option value="Opthamology">Opthamology</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Vascular">Vascular</option>
              <option value="Robotics">Robotics</option>
              <option value="Thoracic">Thoracic</option>
              <option value="Dental">Dental</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setImage">Set Image</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              name="setImage"
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
  );
}

export default SetModal;