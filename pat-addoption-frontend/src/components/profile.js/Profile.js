import React, { useState, useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import { DataContext } from "../../context/DataContext";
import { updateUser } from "../../helpers/utils";
import axios from "axios";

export default function Profile() {
  const [firstName, setUserFirstName] = useState("");
  const [lastName, setUserLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userBio, setUserBio] = useState("");
  const [edit, setEdit] = useState(false);
  const [petData, setPetData] = useState(false);
  const [isTherePet, setIsTherePet] = useState(false);

  const { data } = useContext(DataContext);

  useEffect(() => {
    console.log("data from profile", data);
    console.log(edit);
    if (!(data === undefined)) {
      setEmail(data.email);
      setUserFirstName(data.firstName);
      setUserLastName(data.lastName);
      setIsTherePet(isTherePet);
      console.log("petData", petData);
    }
  }, [data, edit, isTherePet, petData]);

  function sumbitHandler(e) {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      id: data.id,
    };
    console.log("user from profile", user);
    updateUser(user);
  }

  function getPets() {
    axios
      .get(`http://localhost:3010/pet/user/${data.id}`)
      .then((res) => {
        if (res.data.body.name) {
          setPetData(res.data.body);
          setIsTherePet(true);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!(data === undefined)) {
    return (
      <div className={styles["modal-container"]}>
        <div className={styles["user_container"]}>
          {!edit && !isTherePet && (
            <div>
              <div className={styles["data"]}>First Name: {data.firstName}</div>
              <div className={styles["data"]}>Last Name: {data.lastName}</div>
              <div className={styles["data"]}>Email: {data.email}</div>
            </div>
          )}

          {edit && (
            <form onSubmit={sumbitHandler}>
              <label className={styles["data"]}>
                <span> First Name:</span>
                <input
                  type="text"
                  value={firstName}
                  required
                  onChange={(e) => {
                    setUserFirstName(e.target.value);
                  }}
                ></input>
              </label>
              <label className={styles["data"]}>
                <span> Last Name:</span>
                <input
                  type="text"
                  value={lastName}
                  required
                  onChange={(e) => {
                    setUserLastName(e.target.value);
                  }}
                ></input>
              </label>
              <label className={styles["data"]}>
                <span> Email:</span>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </label>
              <label className={styles["data"]}>
                <span> User Password:</span>
                <button>Change Passwod</button>
              </label>
              <button>Save Changes</button>
            </form>
          )}
        </div>

        <div className={styles["choose-btn"]}>
          <button onClick={() => setEdit(!edit)}>Edit Profile</button>
          {(!isTherePet || edit) && <button onClick={getPets}>My Pets</button>}
          {isTherePet && !edit && (
            <div>
              <p>Name: {petData.name}</p>
              <p>Type: {petData.type}</p>
              <p>Status: {petData.status}</p>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2> Sorry! Something Went Wrong. Please Try To Login Again</h2>
      </div>
    );
  }
}
