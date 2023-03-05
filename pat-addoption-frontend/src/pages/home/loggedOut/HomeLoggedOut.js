import React, { useEffect, useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import "./HomeLoggedOut.css";

function HomeLoggedOut(props) {
  const {
    userAuth,
    setUserAuth,
    isLogUser,
    setIsLogUser,
    toEnter,
    setToEnter,
  } = useContext(DataContext);

  useEffect(() => {
    setIsLogUser(isLogUser);
    setToEnter(toEnter);
    console.log("to enter fron loogedout", toEnter);
  }, [isLogUser, toEnter]);

  console.log("toEnter", toEnter);

  return (
    <div className="home-loggedout">
      <div className="header-and-btn">
        <header className="headline-hompage">Welcom to TAKE A FREIND</header>

        {!isLogUser && (
          <div className="choose-btn">
            <button onClick={() => setToEnter({ login: true, signup: false })}>
              Login
            </button>
            <button onClick={() => setToEnter({ login: false, signup: true })}>
              Signup
            </button>
          </div>
        )}
      </div>
      <div className="articals-container">
        <div className="content-container">
          <h3>Are you looking for a new 4-legs friend?</h3>
          <p>
            Here you can find dogs, cats, and other pets for adoption, waiting
            for a loving home.
          </p>
        </div>
        <div className="project-container"></div>
      </div>
    </div>
  );
}

export default HomeLoggedOut;
