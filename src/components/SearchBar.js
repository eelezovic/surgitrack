import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar ({setQuery}) {

  return (
    <div className={styles.inputWrapper}>
      <i className="fa-solid fa-magnifying-glass blue-color"></i>
      <input 
      type="text" 
      placeholder="Search..." 
      className={styles.search}
      onChange={(e) => setQuery(e.target.value)} 
      />
    </div>
  );
}

export default SearchBar;


