import React from "react"; 
import TableFunction from "../components/SearchBar";
import Table from "../components/Table";
import styles from "../pages/SingleInstrumentsComponent.module.css";
import SearchBar from "../components/SearchBar";


function SingleInstrumentsComponent() {
  return (
    <div className="singleInstrumentContainer">
      <div className="SearchBarContainer">
        <SearchBar />
      </div>
    </div>
  );
}

export default SingleInstrumentsComponent;