import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ user, toggleSideBar, closeSideBar,isMobile,setIsMobile }) {

  const handleToggleSideBar = () => {
    setIsMobile((prevIsMobile) => !prevIsMobile);
    toggleSideBar();
  };

  const handleLinkClick = () => {
    closeSideBar();
    setIsMobile(false);
  };

  return (
    <nav className={styles.navbar} >
      <div className={styles.logoContainer}>
        <img src={"/images/logo.png"} alt="" className={styles.logoImage} />
        <h2 className={styles.logoName}>SurgiTrack</h2>
      </div>

      {user ? (
        <ul className={styles.navLinks} onClick={() => setIsMobile(false)}></ul>
      ) : (
        <ul className={isMobile ? styles.navLinkMobile : styles.navLinks}>
          <Link
            to="/about"
            className={styles.aboutMe}
            onClick={() => {
              handleLinkClick();
            }}
          >
            About Me
          </Link>
          <Link
            to="/aboutproject"
            className={styles.aboutProject}
            onClick={() => {
              handleLinkClick();
            }}
          >
           SurgiTrack
          </Link>
          <Link
            to="/login"
            className={styles.login}
            onClick={() => {
              handleLinkClick();
            }}
          >
            Login
          </Link>
        </ul>
      )}

      <div className={styles.burger} onClick={handleToggleSideBar}>
        {user ? (
          isMobile ? (
            <i className={`fas fa-times ${styles.timesIcon}`}></i>
          ) : (
            <i className="fas fa-bars"></i>
          )
        ) : null}
      </div>

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
