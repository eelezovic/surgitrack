import React from "react";
import styles from "../pages/About.module.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
//import { Link } from "react-router-dom";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.content}>
        <img src="./images/ja.jpg" alt="Image" />
      </div>
      <div className={styles.textContainer}>
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
        <div className={styles.iconsContainer}>
          <a href="https://github.com/eelezovic" className={styles.gitHubIcon}>
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/emir-elezović-67160a264"
            className={styles.linkedinIcon}
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}
export default About;
