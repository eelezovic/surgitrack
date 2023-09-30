import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";
import styles from "../pages/Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.content}>
        <img src="./images/ja.jpg" alt="Image" />
        </div>
        <div className={styles.textContent}>
        <h1> Hello, I'm Emir</h1>
        <h2> I am a Full Stack Developer.</h2>
          <p>
          <br />
            As part of my journey in learning web development, I decided to
            build SurgiTrack, a real-life application that combines my nursing
            background with technologies such as React.js, Node.js, Express.js,
            and MySQL, I've been able to create a valuable tool for healthcare
            professionals.
        </p>
        </div>
    </div>
  );
}

export default Home;
