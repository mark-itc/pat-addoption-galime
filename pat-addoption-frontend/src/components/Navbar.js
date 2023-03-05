import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { DataContext } from "../context/DataContext";
import ModalLogin from "../components/modals/ModalLogin";
import ModalSignup from "../components/modals/ModalSignup";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const { userAuth, isLogUser, setIsLogUser, toEnter, setToEnter } = useContext(
    DataContext
  );
  const navigate = useNavigate();

  useEffect(() => {
    setToEnter(toEnter);
    console.log(userAuth.isAdmin);

    console.log("to enter fron nav", toEnter);
  }, [toEnter, userAuth.isAdmin]);

  function logUserOut() {
    setIsLogUser(false);
    localStorage.removeItem("Authorization");
    navigate("/");
  }

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
        {/* <li>{isLogUser && <NavLink to="/profile">PROFILE</NavLink>}</li> */}
        <li>{isLogUser && <NavLink to="/mypets">MY PETS</NavLink>}</li>
        <li>
          <NavLink to="/search">SEARCH</NavLink>
        </li>
        <li>
          {isLogUser && userAuth.isAdmin && (
            <NavLink to="/admin">ADMIN</NavLink>
          )}
        </li>
        <li>{isLogUser && <button onClick={logUserOut}>Logout</button>}</li>
        <li>
          {!isLogUser && (
            <button onClick={() => setToEnter({ login: true, signup: false })}>
              Login
            </button>
          )}
        </li>
        <li>
          {!isLogUser && (
            <button onClick={() => setToEnter({ login: false, signup: true })}>
              Signup
            </button>
          )}
        </li>
      </ul>
      {toEnter.login && (
        <div>
          <ModalLogin setToEnter={setToEnter} toEnter={toEnter} />
        </div>
      )}
      {toEnter.signup && <p>hey</p>}
      {toEnter.signup && (
        <div>
          <ModalSignup setToEnter={setToEnter} toEnter={toEnter} />
        </div>
      )}
    </nav>
  );
}
