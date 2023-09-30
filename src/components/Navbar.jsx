import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";

function Navbar({ signout, user }) {
  const [isMobile, setIsMobile] = useState(false);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    signout();
    navigateTo("/");
  };

  return (
    <nav className={styles.navbar}>
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
        <Link to="/about" className={styles.about}>
          About
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
        {user && (
          <li className={styles.displayUserName}>
            <BiSolidUser size={20} /> {user.username}
          </li>
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
