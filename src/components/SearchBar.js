import React from "react";


function SearchBar({setQuery}) {
  return (
    <div className="inputWrapper">
      <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
      <input 
      type="text" 
      placeholder="Instrument search" 
      className="search"
      onChange={(e) => setQuery(e.target.value)} 
      />
    </div>
  );
}
export default SearchBar;