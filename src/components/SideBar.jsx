import React from "react";
import styles from "./SideBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHome, BiBarChart, BiLogOut, BiSolidUser } from "react-icons/bi";

function SideBar({ user, signout, sideBar, toggleSideBar }) {
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_APP_API;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/logout`, {
        method: "POST",
      });

      if (response.ok) {
        document.cookie =
          "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie =
          "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        signout();
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleLinkClick = () => {
    toggleSideBar();
  };

  return (
    <div className={`${styles.sidebar} ${sideBar ? styles.open : ""}`}>
      <ul>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            <BiHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={handleLinkClick}>
            <BiBarChart />
            Dashboard
          </Link>
        </li>
        {user && (
          <div>
            <li className={styles.logoutSidebar} onClick={handleLogout}>
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
