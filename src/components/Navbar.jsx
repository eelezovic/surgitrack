import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link} from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { AiOutlineBars } from "react-icons/ai";

function Navbar({ user, toggleSideBar }) {
  const [isMobile, setIsMobile] = useState(false);



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

      <ul
        className={isMobile ? styles.navLinkMobile : styles.navLinks}
        onClick={() => setIsMobile(false)}
      >
        <Link to="/" className={styles.home}>
          Home
        </Link>
        {user ? (
          // Displaying links when the user is authenticated
          <>
            <div className={styles.burger} >
              <FaBars />
            </div>
          </>
        ) : (
          // Displaying this links when the user is not authenticated
          <>
            <Link to="/about" className={styles.aboutMe}>
              About Me
            </Link>
            <Link to="/aboutproject" className={styles.aboutProject}>
              Project
            </Link>
            <Link to="/login" className={styles.login}>
              Login
            </Link>
          </>
        )}
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
