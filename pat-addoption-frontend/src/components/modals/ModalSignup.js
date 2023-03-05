import React, { useState, useContext, useEffect } from "react";
import styles from "./Modal.module.css";
import axios from "axios";
import { DataContext } from "../../context/DataContext";

export default function ModalSignup({ setToEnter, toEnter }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { isLogUser, setIsLogUser } = useContext(DataContext);

  useEffect(() => {
    setIsLogUser(isLogUser);
  }, [isLogUser]);

  function postData(data) {
    axios
      .post("http://localhost:3010/user/signup", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setToEnter({ login: true, signup: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function sumbitHandler(e) {
    e.preventDefault();
    const user = {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      isAdmin: false,
      phone,
    };

    setToEnter({ login: false, signup: false });
    postData(user);
  }

  return (
    <div className={styles["modal-container"]}>
      <button
        className={styles["close-modal-btn"]}
        onClick={() => setToEnter({ login: false, signup: false })}
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
              setFirstName(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => {
              setLastName(e.target.value);
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
              setConfirmPassword(e.target.value);
            }}
          ></input>
          {!(confirmPassword === password) && <p> Passwords don't match</p>}
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
        <button>Signup</button>
      </form>
      <div className={styles["switch-path"]}>
        <span>Have an account already?</span>
        <button onClick={() => setToEnter({ login: true, signup: false })}>
          Login
        </button>
      </div>
    </div>
  );
}
