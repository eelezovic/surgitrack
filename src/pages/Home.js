import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Home.module.css";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div className="mainContainer">
      <div className="imageContainer">
        <img src="https://cdn-icons-png.flaticon.com/512/2804/2804765.png" alt="InstrumentSet icon" className={styles.InstrumentIcon} />
        <img src="https://cdn-icons-png.flaticon.com/512/8638/8638209.png" alt="Instrument icon" className={styles.InstrumentIcon} />
      </div> 
      <SearchBar />
      <Link to="/singleinstrumentscomponent" className={styles.singleinstrumentscomponent}><ButtonComponent name="Instruments"/></Link>
      <Link to="/instrumentsetcomponent" className={styles.instrumentsetcomponent}><ButtonComponent name="Instrument Sets"/></Link>
    </div> 
  );
}

export default Home;
