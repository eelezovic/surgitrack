import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";


function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png"alt="" className={styles.logoImage} />
        <h2 className={styles.logoName}>SurgiTrack</h2>
      </div>

      <ul
        className={isMobile ? styles.navLinkMobile : styles.navLinks}
        onClick={() => setIsMobile(false)}
      >
        <Link to="/" className={styles.home}>
          Home
        </Link>
        <Link to="/about" className={styles.about}>
          About
        </Link>
      </ul>
      <button
        className={styles.mobileMenuIcon}
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
}

export default Navbar;
