import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dasboardContainer}>
      <div className={styles.containerWrapper}>

        <div className={styles.instrumentContainer}> 
            <Link to="/instruments" className={styles.instrumentIcon}>
              {" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/8638/8638209.png"
                alt="Instrument icon"
              />{" "}
            </Link>
          <Link to="/instruments" className={`${styles.instrumentButton} ${styles.instrumentText}`}>
            <ButtonComponent name="Single Instruments" />
          </Link>
     </div>

       <div className={styles.setContainer}>  
            <Link to="/sets" className={styles.setIcon}>
              {" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/2804/2804765.png"
                alt="InstrumentSet icon"
              />{" "}
            </Link>

          <Link
            to="/sets" className={`${styles.setButton} ${styles.setText}`}
          >
            <ButtonComponent name="Instrument Sets" />
          </Link>
       </div> 
      </div>
    </div>
  );
}

export default Dashboard;
