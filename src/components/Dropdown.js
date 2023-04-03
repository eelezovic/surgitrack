import React, { useState } from "react";
import styles from "./Dropdown.module.css"

function Dropdown ({selected, setSelected}){
  const [isActive, setIsActive] = useState(false);
  const options = ["None", "Cardiology" , "Dental", "General", "Gynecology", "Neurology", "Obestetrics", "Opthamology", "Orthopedic", "Plastics", "Thoracic", "Urology", "Vascular", "Gynecology", "Robotics"];
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownButton} onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownScroll}>
            {options.map((option, index) => (
              <div 
                key={index}
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }} 
                className={styles.dropdownItem}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown;
