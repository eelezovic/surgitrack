// In SideBar.jsx
import React from "react";
import styles from "./SideBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHome, BiBarChart, BiLogOut, BiSolidUser } from "react-icons/bi";

function SideBar({ user, signout, sideBar, toggleSideBar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    signout();
    navigate("/");
  };

  const handleLinkClick = () => {
    toggleSideBar(); 
  };

  return (
    <div className={`${styles.sidebar} ${sideBar ? styles.open : ""}`}>
      <div className={styles.closeButton} onClick={() => toggleSideBar()}>
        <i className="fas fa-times"></i>
      </div>
      <ul>
        <Link to="/" onClick={handleLinkClick}>
          <li>
            <BiHome />
            Home
          </li>
        </Link>
        <Link to="/dashboard" onClick={handleLinkClick}>
          <li>
            <BiBarChart />
            Dashboard
          </li>
        </Link>
        {user && (
          <div>
            <li onClick={handleLogout}>
              <BiLogOut />
              Logout
            </li>
            <li className={styles.displayUserName}>
              <BiSolidUser size={20} /> {user.username}
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
