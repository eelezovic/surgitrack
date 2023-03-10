import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";


function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  return (
  <nav className={styles.navbar}>
    <h2 className={styles.logo}>Logo</h2>
    <ul className={isMobile ?  styles.navLinkMobile : "nav-links"}
    onClick={() => setIsMobile(false)}>
      <Link to="/" className="home">Home</Link>
      <Link to="/about" className="about">About</Link>
      <Link to="/contact" className="contact">Contact</Link>
    </ul>
    <button 
      className="mobile-menu-icon"
      onClick={() => setIsMobile(!isMobile)}
    >
      {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
    </button>
  </nav>
  );
}

function CustomLink({ to, children, ...props}) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true}) // to keep end: true?
  return (
    <li className={ isActive ? "active" : ""}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  );
} 

export default Navbar