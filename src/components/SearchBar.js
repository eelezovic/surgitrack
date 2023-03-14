import React from "react";
import styles from "./SearchBar.module.css";

function Searchbar() {
  return (
    <div className="inputWrapper">
      <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
      <input placeholder="Search for instrument..." />
    </div>
  );
}

export default Searchbar;