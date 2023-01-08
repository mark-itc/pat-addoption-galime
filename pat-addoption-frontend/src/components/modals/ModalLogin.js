import React, { useState } from "react";
import styles from "./Modal.module.css";

export default function ModalLogin({ setToEnter, toEnter }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("toEnter", toEnter);

  function sumbitHandler(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    setToEnter({ login: false, singup: false });
    console.log("enter", toEnter);

    console.log("user", user);
  }

  return (
    <div className={styles["modal-container"]}>
      <button
        className={styles["close-modal-btn"]}
        onClick={() => setToEnter({ login: false, singup: false })}
      >
        X
      </button>
      <h2>WELCOM BACK!</h2>
      <form onSubmit={sumbitHandler} className={styles["form"]}>
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
            className="name-input"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <button>Login</button>
      </form>
      <div className={styles["switch-path"]}>
        <span>New user?</span>
        <button onClick={() => setToEnter({ login: false, singup: true })}>
          Singup
        </button>
      </div>
    </div>
  );
}
