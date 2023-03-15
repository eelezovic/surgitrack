import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import Table from "./Table";
import { SingleInstrumentsData } from "./dataStorage/SingleInstrumentsData";

function Searchbar() {
  const [query, setQuery] = useState("");

  const search = (data) => {
    return data.filter((item) => item.instrument_name.toLowerCase().includes(query));
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
      <Table data={search(SingleInstrumentsData)} /> 
    </div>
  );
}

export default Searchbar;