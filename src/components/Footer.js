import React from "react";
import logofooter from '../images/logofooter.png';

function Footer() {
  return (
      <footer className="footer">
          <img src={logofooter} alt="Little Lemon Footer Logo" className="footer-logo" />
          <p className="copyright">© 2023 Little Lemon. All rights reserved.</p>
      </footer>
  );
}

export default Footer;
