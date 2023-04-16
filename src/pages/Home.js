import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Home.module.css";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchBarIcon}>
       <SearchBar />
       </div>
      
      <div className={styles.singleInstrumentContainer}>
        <div className={styles.iconContainer}>
        <Link to="/singleinstrumentscomponent"> <img src="https://cdn-icons-png.flaticon.com/512/8638/8638209.png" alt="Instrument icon" className={styles.InstrumentIcon} /> </Link> 
        </div>
        <Link to="/singleinstrumentscomponent" className={styles.singleinstrumentscomponent}><ButtonComponent name="Instruments"/></Link>
      </div>

      <div className={styles.instrumentSetContainer}>
        <div className={styles.iconContainer}>
        <Link to="/instrumentsetcomponent"> <img src="https://cdn-icons-png.flaticon.com/512/2804/2804765.png" alt="InstrumentSet icon" className={styles.InstrumentIcon} /> </Link>
        </div>
        <Link to="/instrumentsetcomponent" className={styles.instrumentsetcomponent}><ButtonComponent name="Instrument Sets"/></Link>
      </div>
    </div> 
  );
}

export default Home;

