import React from "react";
import styles from "./SideBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHome, BiBarChart, BiLogOut, BiSolidUser } from "react-icons/bi";

function SideBar({ user, signout, sideBar,  isMobile, setIsMobile, closeSideBar}) {
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
    closeSideBar();
    setIsMobile(false);
  };

  return (
    <>
      {user && (
        <div className={`${styles.sidebar} ${sideBar ? styles.open : styles.closed}`}>
          <div className={styles.sideBarContainer} >
            <ul>
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  <BiHome />
                  {sideBar && <span> Home</span>}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" onClick={handleLinkClick}>
                  <BiBarChart />
                  {sideBar && <span> Dashboard</span>}
                </Link>
              </li>
              <div>
                <li className={styles.logoutSidebar} onClick={handleLogout}>
                  <BiLogOut />
                  {sideBar && <span> Logout</span>}
                </li>
                <li className={styles.displayUserName}>
                  <BiSolidUser size={20} /> {sideBar && user.username}
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;