import React from "react";
import "./style.css";

function Nav() {
  return (

    <ul className="nav border border-dark">
    <li className="nav-item">
      <a className="nav-link" href="/" >Google Books</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">Search</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/Saved">Saved</a>
    </li>
  </ul>

  );
}

export default Nav;