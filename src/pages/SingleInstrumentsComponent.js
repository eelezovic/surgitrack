import React from "react"; 
import Searchbar from "../components/SearchBar";
import Table from "../components/Table";
import styles from "../pages/SingleInstrumentsComponent.module.css";


function SingleInstrumentsComponent() {
  return (
    <div className="SingleInstrumentContainer">
      <div className="SearchBarContainer">
        <Searchbar />
      </div>
    </div>
  );
}

export default SingleInstrumentsComponent;