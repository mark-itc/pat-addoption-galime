import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [openNavbar, setOpenNavber] = useState(false);
  return (
    <nav className={styles["navbar"]}>
      <img
        className={styles["logo-img"]}
        src={require("../pic/iStock-930281684-2.jpg")}
        alt="app-icon"
      />
      <ul className="ul_nav">
        <li>
          <p></p>
        </li>
        <li>
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/profile">PROFILE</NavLink>
        </li>
        <li>
          <NavLink to="/mypets">MY PETS</NavLink>
        </li>
        <li>
          <NavLink to="/search">SEARCH</NavLink>
        </li>
        <li>
          <NavLink to="/admin">ADMIN</NavLink>
        </li>
      </ul>
    </nav>
  );
}
