import React, { useRef, useState, useEffect} from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar({ user, toggleSideBar,  closeSideBar }) {
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (event.target.tagName.toLowerCase() === "a") {
          // If the click is on a link, close the sidebar
          closeSideBar();
        }
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSideBar]);

  const closeNavbar = () => {
    setIsMobile(false);
  };

  const handleToggleSideBar = () => {
    toggleSideBar();
    setIsMobile(!isMobile);

    if (isMobile) {
      closeSideBar();
    }
  };

  const handleLinkClick = () => {
    closeSideBar(); 
  };


  return (
    <nav className={styles.navbar}  ref={sidebarRef}>
      <div className={styles.logoContainer}>
        <img src={"/images/logo.png"} alt="" className={styles.logoImage} />
        <h2 className={styles.logoName}>SurgiTrack</h2>
      </div>

      {user ? (
        <ul className={styles.navLinks} onClick={() => setIsMobile(false)}>
        </ul>
      ) : (
        <ul className={isMobile ? styles.navLinkMobile : styles.navLinks}>
          <Link
            to="/about"
            className={styles.aboutMe}
            onClick={() => {
              closeNavbar();
              handleLinkClick();
            }}
          >
            About Me
          </Link>
          <Link
            to="/aboutproject"
            className={styles.aboutProject}
           onClick={() => {
              closeNavbar();
              handleLinkClick(); 
            }}
          >
            Project
          </Link>
          <Link
            to="/login"
            className={styles.login}
            onClick={() => {
              closeNavbar();
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
