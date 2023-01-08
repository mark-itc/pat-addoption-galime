import React, { useState } from "react";
import ModalLogin from "../../../components/modals/ModalLogin";
import ModalSingup from "../../../components/modals/ModalSingup";
import "./HomeLoggedOut.css";
import useFetch from "../../../hooks/useFetch";

function HomeLoggedOut(props) {
  const { data, isPanding, error } = useFetch("http://localhost:3000/articles");
  console.log("data", data);
  console.log("isPanding", isPanding);
  console.log("error", error);

  const [toEnter, setToEnter] = useState({ login: false, singup: false });
  console.log("toEnter", toEnter);

  return (
    <div className="home-loggedout">
      <div className="header-and-btn">
      <header className="headline-hompage">Welcom to TAKE A FREIND</header>

         {!toEnter.login && !toEnter.singup && (
        <div className="choose-btn">
          <button onClick={() => setToEnter({ login: true, singup: false })}>
            Login
          </button>
          <button onClick={() => setToEnter({ login: false, singup: true })}>
            Singup
          </button>
          <button>Search for a pet</button>
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
        <div className="project-container">
          <h2>Take a glimpse to what we do</h2>
          {error && <p>{error}</p>}
          {isPanding && <p>Loading...</p>}
          {data &&
            data.map((articles) => <div key={articles.id}>
            <h3>{articles.title}</h3>
            <p>{articles.content}</p>
            </div>)}
        </div>
      </div>

   
      {toEnter.login && (
        <div>
          <ModalLogin setToEnter={setToEnter} toEnter={toEnter} />
        </div>
      )}
      {toEnter.singup && (
        <div>
          <ModalSingup setToEnter={setToEnter} toEnter={toEnter} />
        </div>
      )}
    </div>
  );
}

export default HomeLoggedOut;
