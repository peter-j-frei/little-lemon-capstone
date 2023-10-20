import React from "react";
import logo from '../images/logo.png';
import Nav from './Nav';

function Header() {
  return (
      <header className="header">
          <img src={logo} alt="Little Lemon Logo" className="logo" />
          <Nav />
      </header>
  );
}

export default Header;