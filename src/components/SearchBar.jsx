import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar ({setQuery,handlePagination}) {

  return (
    <div className={styles.inputWrapper}>
      <i className={`${styles.iconStyles} fa-solid fa-magnifying-glass`}></i>
      <input 
      type="text" 
      placeholder="Search..." 
      className={styles.search}
      onChange={(e) => {
        setQuery(e.target.value)
        handlePagination(1)
      } 
    } 
      />
    </div>
  );
}

export default SearchBar;


