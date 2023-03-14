import React from "react"; 
import Searchbar from "../components/SearchBar";

import styles from "../pages/SingleInstrumentsComponent.module.css";



function SingleInstrumentsComponent() {
  return (
    <div className="SingleInstrumentContainer">
      <div className="SearchBarContainer">
        <Searchbar />
        <div>SearchResults</div>
      </div>
    </div>
  );
}

export default SingleInstrumentsComponent;