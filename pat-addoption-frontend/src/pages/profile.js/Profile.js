import React, { useState } from "react";
import styles from "./Profile.module.css";

export default function Profile() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userBio, setUserBio] = useState("");

  function sumbitHandler(e) {
    e.preventDefault();
    const user = {
      userFirstName,
      userLastName,
      email,
      password,
      phone,
      userBio,
    };
    console.log("user", user);
  }
  return (
    <div className={styles["modal-container"]}>
      <form onSubmit={sumbitHandler} className={styles["form"]}>
        <label>
          <span> User First Name:</span>
          <input
            type="text"
            value={userFirstName}
            required
            onChange={(e) => {
              setUserFirstName(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <span> User Last Name:</span>
          <input
            type="text"
            value={userLastName}
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
            value={email}
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
            value={password}
            required
            contenteditable="true"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <span> Phone Number:</span>
          <input
            type="number"
            value={phone}
            required
            contenteditable="true"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <span> Bio:</span>
          <textarea
            placeholder="About me..."
            value={userBio}
            contenteditable="true"
            onChange={(e) => {
              setUserBio(e.target.value);
            }}
          ></textarea>
        </label>
        <button className={styles["profile-btn"]}>Save Changes</button>
      </form>
    </div>
  );
}
