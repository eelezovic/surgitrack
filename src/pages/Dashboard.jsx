import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dasboardContainer}>
      <div className={styles.containerWrapper}>

      <Link to="/instruments" className={styles.instrumentContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/8638/8638209.png"
            alt="Instrument icon"
            className={styles.instrumentIcon}
          />
          <div className={`${styles.instrumentButton} ${styles.instrumentText}`}>
            <ButtonComponent name="Single Instruments" />
          </div>
        </Link>

        <Link to="/sets" className={styles.setContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2804/2804765.png"
            alt="InstrumentSet icon"
            className={styles.setIcon}
          />
          <div className={`${styles.setButton} ${styles.setText}`}>
            <ButtonComponent name="Instrument Sets" />
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;
