import React, { useState } from "react";
import styles from "./Modal.module.css";
import useFetch from "../../hooks/useFetch";

export default function ModalSingup({ setToEnter, toEnter }) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhone] = useState("");

const {postData, data, error} = useFetch("http://localhost:3000/users", "POST")

  function sumbitHandler(e) {
    e.preventDefault();
    const user = {
      userFirstName,
      userLastName,
      email,
      password,
      phone,
    };
    setToEnter({ login: false, singup: false });
    postData (user);
  }

  return (
    <div className={styles["modal-container"]}>
      <button
        className={styles["close-modal-btn"]}
        onClick={() => setToEnter({ login: false, singup: false })}
      >
        X
      </button>
      <h2>NICE TO MEET YOU</h2>
      <form onSubmit={sumbitHandler} className={styles["form"]}>
        <label>
          <span> User Name:</span>
          <input
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => {
              setUserFirstName(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => {
              setUserLastName(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <span> User Email:</span>
          <input
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <span> User Password:</span>
          <input
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <span> Repeat Password:</span>
          <input
            type="password"
            required
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          ></input>
          {!(repeatPassword === password) && <p> Passwords don't match</p>}
        </label>
        <label>
          <span> Phone Number:</span>
          <input
            type="tel"
            placeholder="050-0000000"
            pattern="[0]{1}[5]{1}[0-9]{1}[0-9]{7}"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></input>
        </label>
        <button>Singup</button>
      </form>
      <div className={styles["switch-path"]}>
        <span>Have an account already?</span>
        <button onClick={() => setToEnter({ login: true, singup: false })}>
          Login
        </button>
      </div>
    </div>
  );
}
