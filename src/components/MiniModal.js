import React,{useState} from "react";
import styles from "./MiniModal.module.css";

function MiniModal ({closeMiniModal}) {
   const [formState, setFormState] = useState({
    setName: "",
    setId: "",
    setQuantity: "",
    setLocation: "",
   });

   const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })

   }
  return (
    <div className={styles.miniModalContainer} onClick={(e) => {
      if (e.target.className === "miniModalContainer") closeMiniModal();
      }}
    > 
      <div className={styles.miniModal}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="setName">Set Name</label>
            <input name="setName" value={formState.setName}/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setId">ID</label>
            <input name="setId" value={formState.setId}/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setQuantity">Quantity</label>
            <input name="setQuantity" value={formState.setQuantity}/>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="setLocation">Location</label>
            <input name="setLocation" value={formState.setLocation}/>
          </div>
          <button typle="submit" className={styles.button}>Submit</button>
        </form>

      </div>
    </div>
  );
}

export default MiniModal;