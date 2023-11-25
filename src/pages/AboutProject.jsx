import React from "react";
import styles from "../pages/AboutProject.module.css";

function AboutProject() {
  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectContent}>
        <div className={styles.text}>
          <h1> About Project </h1>
          <p>
            As an operating room professional, I've developed an Instrument
            Tracking App tailored to streamline the management of surgical
            instruments and sets for primary nurses and healthcare providers.
            The primary goal of the app is to assist healthcare providers in
            tracking and locating instruments efficiently. Additionally, it
            serves as an excellent tool for educating new eployees about
            different instruments and sets, as everything can be visualized on the app
            without the need to physically open them. Users must register and
            log in to access the platform. <br /> 
            Only designated administrators will have the ability to edit,
            delete, and update surgical instruments.
            <br />
            <br />
         {/*   The app categorizes surgical instruments into two main sections:
            Single Instruments and Instrument Sets. */}
          </p>
           {/*  <br />
          <p>
            <strong>Single Instruments</strong>
          </p>
          <div className={styles.instrumentContent}>
            <img src="./images/InstrumentIcon.jpg" alt="InstrumentImage" />
            <p>
              In this section, each instrument is assigned a unique ID,
              facilitating quick and precise tracking. Users can search for
              instruments using their names, IDs, or designated locations.
            </p>
          </div>
          <br />
          <p>
            <strong>Instrument Sets</strong>
          </p>
          <div className={styles.setContent}>
            <br />
            <img src="./images/SetIcon.jpg" alt="SetImage" />
            <p>
              Instrument Sets are categorized by specialty, containing a
              collection of instruments specific to that particular field.
             
  </p>  
          </div>*/}
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
