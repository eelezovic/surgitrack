import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Home.module.css";
import Searchbar from "../components/SearchBar";

function Home() {
  return (
  <div className="mainContainer">
    <div className="searchContainer">
    </div>
    
    <Link to="/singleinstrumentscomponent" className={styles.singleinstrumentscomponent}><ButtonComponent name="Instruments"/></Link>
    <Link to="/instrumentsetcomponent" className={styles.instrumentsetcomponent}><ButtonComponent name="Instrument Sets"/></Link>
  </div> 
  );
}

export default Home;