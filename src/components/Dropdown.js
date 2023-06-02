import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = [
    "All",
    "Cardiology",
    "Dental",
    "General",
    "Gynecology",
    "Neurology",
    "Obstetrics",
    "Opthamology",
    "Orthopedic",
    "Plastics",
    "Thoracic",
    "Urology",
    "Vascular",
    "Robotics",
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={styles.dropdownButton}
        onClick={(e) =>
           setIsActive(!isActive)
        }
      >
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
  );
}

export default Dropdown;
