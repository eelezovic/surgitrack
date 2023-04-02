import React, { useState } from "react";
import styles from "./Dropdown.module.css"


function Dropdown (){
  const [isActive, setIsActive] = useState(false);
 
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownButton}>Select specialty</div>
      <div className={styles.dropdownContent}>
        <div className={styles.dropdownItem}>
          React
        </div>
        <div className={styles.dropdownItem}>
          Vue
        </div>
      </div>
    </div>

  )
}

export default Dropdown;