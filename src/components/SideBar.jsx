import React, {useRef, useEffect} from "react";
import styles from "./SideBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHome, BiBarChart, BiLogOut, BiSolidUser } from "react-icons/bi";

function SideBar({ user, signout, sideBar,  isMobile, setIsMobile, closeSideBar }) {
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_APP_API;

  const sidebarRef = useRef();

  useEffect(() => {
    function handleClick(event) {
      if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
        // Inside click: Toggle isMobile state
        setIsMobile((prevIsMobile) => !prevIsMobile);
      } else {

        setIsMobile(false);
      }
    }

    document.addEventListener("mousedown", handleClick, true);
  
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [setIsMobile]);
  


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
    if (isMobile) {
      setIsMobile((prevIsMobile) => !prevIsMobile);
      closeSideBar();
    }
  };

  return (
    <div className={`${styles.sidebar} ${sideBar ? styles.open : ""}`}>
      <div className={styles.sideBarContainer}  ref={sidebarRef}>
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
    </div>
  );
}

export default SideBar;