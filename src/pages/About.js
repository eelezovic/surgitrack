import React from "react";
import styles from "../pages/About.module.css";
import { FaLinkedin, FaGithub} from "react-icons/fa";

function About() {
  return (
    <div className={styles.aboutCountainer}>
      <h1>About</h1>
      <p>Hello and welcome to my surgical instrument tracking app! <br></br> As an operating room nurse, I understand the importance of having the right surgical instruments at the right time. That's why I created this app to help myself and other healthcare professionals more easily track, locate, and update surgical instruments.<br></br>

I know firsthand the challenges of keeping track of instruments during a surgery, which is why I designed this app to be as user-friendly and efficient as possible. This helps to save time and increase efficiency, which is crucial in the fast-paced environment of the operating room.

I'm constantly working to improve and update this app to meet the needs of healthcare professionals like myself. I welcome your feedback and suggestions on how I can make this app even better.</p>
<div className={styles.iconsContainer}>
        <a href="https://github.com/eelezovic" className={styles.gitHubIcon}>
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/emir-elezović-67160a264" className={styles.linkedinIcon}>
          <FaLinkedin />
        </a>
      </div>

    </div>
  );
}

export default About;