import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Profile from "../../components/profile.js/Profile";
import "./HomeLoggedIn.css";

export default function HomeLoggedIn() {
  const { userAuth, setUserAuth, isLogUser, setIsLogUser } = useContext(
    DataContext
  );
  const [data, setData] = useState();
  useEffect(() => {
    console.log("data:", data);
  }, data);

  return (
    <div className="home-loggedIn">
      <div className="header-and-btn">
        <header className="headline-hompage">Welcom Back</header>
      </div>
      <Profile />
    </div>
  );
}
