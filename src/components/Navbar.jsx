import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";

function Navbar({ user, toggleSideBar }) {
  const [isMobile, setIsMobile] = useState(false);

  const closeNavbar = () => {
    setIsMobile(false);

  };

  return (
    <nav className={styles.navbar}>
      {user && (
        <div className={styles.burger} onClick={() => toggleSideBar()}>
          <AiOutlineBars />
        </div>
      )}
      <div className={styles.logoContainer}>
        <img src={"/images/logo.png"} alt="" className={styles.logoImage} />
        <h2 className={styles.logoName}>SurgiTrack</h2>
      </div>

      {user ? (
        <ul className={styles.navLinks} onClick={() => setIsMobile(false)}>
        </ul>
      ) : (
        <ul className={isMobile ? styles.navLinkMobile : styles.navLinks}>
          <Link to="/about" className={styles.aboutMe} onClick={() => closeNavbar()}>
            About Me
          </Link>
          <Link to="/aboutproject" className={styles.aboutProject} onClick={() => closeNavbar()}>
            Project
          </Link>
          <Link to="/login" className={styles.login} onClick={() => closeNavbar()}>
            Login
          </Link>
        </ul>
      )}

      {!user && (
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
      )}
    </nav>
  );
}

export default Navbar;

