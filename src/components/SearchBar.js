import React, { useState } from "react";


function SearchBar() {
  const [query, setQuery] = useState("");
  const keys = ["instrument_name", "instrument_id", "instrument_location"]
  
  const search = (data) => {
    return data.filter(
      (item) => 
      keys.some(key => item[key].toUpperCase().includes(query.toUpperCase()))
    );
  }

  return (
    <div className="inputWrapper">
      <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
      <input 
      type="text" 
      placeholder="Search for instrument..." 
      className="search"
      onChange={(e) => setQuery(e.target.value)} 
      />
      
    </div>
  );
}

export default SearchBar;