import React from "react";


function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={styles.footerDiv}>
    <footer>
      <p>Copyright © {currentYear} </p>
    </footer>
    </div>
  );
}
