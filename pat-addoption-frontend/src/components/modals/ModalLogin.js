import React, { useState, useEffect, useContext } from "react";
import styles from "./Modal.module.css";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import { getUserProfile } from "../../helpers/utils";

export default function ModalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    userAuth,
    setUserAuth,
    isLogUser,
    toEnter,
    setToEnter,
    setIsLogUser,
    data,
    setData,
  } = useContext(DataContext);

  useEffect(() => {
    setIsLogUser(localStorage.getItem("Authorization"));
    console.log("toEnter", toEnter);
    console.log("data from model login", data);
  }, [isLogUser, toEnter, data]);

  function logUserIn(user) {
    axios
      .post("http://localhost:3010/user/login", user)
      .then((res) => {
        setData(res.data.body.userProfile);

        localStorage.setItem("Authorization", "Bearer=" + res.data.body.token);
        setIsLogUser(localStorage.getItem("Authorization"));
        setToEnter({ login: false, signup: false });
        setUserAuth(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function sumbitHandler(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    setToEnter({ login: false, signup: false });
    console.log("enter", toEnter);
    logUserIn(user);

    console.log("userAuth from login 2===>", userAuth);
  }

  return (
    <div className={styles["modal-container"]}>
      <button
        className={styles["close-modal-btn"]}
        onClick={() => setToEnter({ login: false, signup: false })}
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
        <button onClick={() => setToEnter({ login: false, signup: true })}>
          Signup
        </button>
      </div>
    </div>
  );
}
