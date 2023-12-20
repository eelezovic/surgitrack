// Home.js

import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Home.module.css";
import About from "../pages/About";
import AboutProject from "../pages/AboutProject";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.aboutContainer}>
        <About />
      </div>
      <div className={styles.aboutProjectContainer}>
        <AboutProject />
      </div>
    </div>
  );
}

export default Home;

