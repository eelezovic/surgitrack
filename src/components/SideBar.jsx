// In SideBar.jsx
import React, {useRef, useEffect} from "react";
import styles from "./SideBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiHome, BiBarChart, BiLogOut, BiSolidUser } from "react-icons/bi";

function SideBar({ user, signout, sideBar, toggleSideBar, closeSideBar }) {
  const navigate = useNavigate();
  const sidebarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      console.log("Clicked outside the sidebar.");
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSideBar();
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSideBar]);
  


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
    <div className={`${styles.sidebar} ${sideBar ? styles.open : ""}`} ref={sidebarRef}>
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
