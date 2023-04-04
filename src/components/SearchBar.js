import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({setQuery}) => {
 
  return (
    <div className={styles.inputWrapper}>
      <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
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


