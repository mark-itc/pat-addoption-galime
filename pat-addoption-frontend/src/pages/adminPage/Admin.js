import React, { useState } from "react";
import styles from "./Admin.module.css";
import { deletePet, postData, getUserById } from "../../helpers/utils";
import axios from "axios";
import AllUsersResult from "../../components/AllUsersResult";

export default function Admin() {
  const [petEditing, setPetEditing] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const [type, setType] = useState();
  const [name, setName] = useState();
  const [color, setColor] = useState();
  const [bio, setBio] = useState();
  const [hypoallergenicAsString, setHypoallergenicAsString] = useState();
  const [breed, setBreed] = useState();
  const [dietary, setDietary] = useState();
  const [status, setStatus] = useState();
  const [heightAsString, setHeightAsString] = useState();
  const [weightAsString, setWeightAsString] = useState();
  const [conectedUser, setConctedUser] = useState(null);
  const [petId, setPetId] = useState(null);
  const [getUser, setGetUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const [img, setImg] = useState(null);
  const [imgErr, setImgErr] = useState(null);
  const [usertData, setUserData] = useState();
  const [isUsersShow, setIsUsersShow] = useState(false);

  function addPet() {
    setPetEditing({ add: true, edit: false, delete: false });
    setPetId(null);
  }

  function onDeletePet() {
    deletePet(petId);
    setPetId(null);
  }

  function onsubmitHandler(e) {
    e.preventDefault();
    const height = Number(heightAsString);
    const weight = Number(weightAsString);
    const hypoallergenic = hypoallergenicAsString ? true : false;
    var newPet = {
      type,
      name,
      color,
      bio,
      hypoallergenic,
      breed,
      dietary,
      status,
      height,
      weight,
      conectedUser,
      img,
    };
    const res = postData(newPet, petEditing.edit, petId);
    console.log(res);
    setPetEditing({ add: false, edit: false, delete: false });
    setType();
    setName();
    setColor();
    setBio();
    setHypoallergenicAsString();
    setBreed();
    setDietary();
    setStatus();
    setHeightAsString();
    setWeightAsString();
    setPetId(null);
    setConctedUser(null);
    setImg(null);
  }

  function onGetUserById() {
    getUserById(userId);
    setGetUser(false);
    setUserId(null);
  }

  function getAllUsers() {
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .get("http://localhost:3010/user", config)
      .then((res) => {
        console.log("res====>", res);
        setUserData(res.data.body);
        setIsUsersShow(true);
        console.log("res.data.body getAllUsers", res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFileChange(e) {
    setImg(null);
    let selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile);
    if (!selectedFile) {
      setImgErr("please select a file");
      return;
    }
    if (!selectedFile.type.includes("image")) {
      setImgErr("please select an image type file");
      return;
    }
    if (selectedFile.size > 100000) {
      setImgErr("selected image is over 100kb");
      return;
    }
    setImgErr(null);
    setImg(selectedFile);
    console.log("picture updated");
  }

  return (
    <div className={styles["page-container"]}>
      <div className={styles["options"]}>
        <button
          onClick={(e) =>
            setPetEditing({
              add: false,
              edit: false,
              delete: false,
            })
          }
        >
          X
        </button>
        <button onClick={addPet}>Add Pet</button>
        <button
          onClick={(e) =>
            setPetEditing({
              add: false,
              edit: true,
              deletePet: false,
            })
          }
        >
          Edit Pet
        </button>
        <button
          onClick={(e) =>
            setPetEditing({
              add: false,
              edit: false,
              delete: true,
            })
          }
        >
          Delete Pet
        </button>
        <button onClick={(e) => setGetUser(true)}>Get User</button>
        <button onClick={getAllUsers}>Get All Users</button>
      </div>
      {isUsersShow &&
        !petEditing.delete &&
        !petEditing.add &&
        !petEditing.edit && <AllUsersResult data={usertData} />}
      {(petEditing.edit || petEditing.delete) && (
        <div>
          <label>pet ID</label>
          <input
            type="search"
            onChange={(e) => setPetId(e.target.value)}
          ></input>
        </div>
      )}

      {petEditing.edit && (
        <button
          onClick={() =>
            setPetEditing({
              add: true,
              edit: true,
              deletePet: false,
            })
          }
        >
          edit
        </button>
      )}

      {petEditing.delete && <button onClick={onDeletePet}>delete</button>}

      {getUser && !petEditing.delete && !petEditing.add && !petEditing.edit && (
        <div>
          <label>user ID</label>
          <input
            type="search"
            onChange={(e) => setUserId(e.target.value)}
          ></input>
        </div>
      )}

      {getUser && !petEditing.delete && !petEditing.add && !petEditing.edit && (
        <button onClick={onGetUserById}>find user</button>
      )}

      {petEditing.add && !petEditing.delete && (
        <form
          className={styles["form"]}
          onSubmit={(e) => {
            onsubmitHandler(e);
          }}
        >
          <div>
            <label>
              <p>TYPE</p>
              <input type="search" onChange={(e) => setType(e.target.value)} />
            </label>
            <label>
              <p>NAME</p>
              <input type="search" onChange={(e) => setName(e.target.value)} />
            </label>
            <fieldset>
              <div className={styles["status"]}>
                <legend>STATUS</legend>
                <div className={styles["test"]}>
                  <div className={styles["choise"]}>
                    <input
                      type="radio"
                      id="Adopted"
                      name="status"
                      value="ADOPTED"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label htmlFor="Adopted">Adopted</label>
                  </div>
                  <div className={styles["choise"]}>
                    <input
                      type="radio"
                      id="Fostered"
                      name="status"
                      value="Fostered"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label htmlFor="FOSTERED">Fostered</label>
                  </div>
                  <div className={styles["choise"]}>
                    <input
                      type="radio"
                      id="Available"
                      name="status"
                      value="AVAILABLE"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label htmlFor="Available">Available</label>
                  </div>
                </div>
              </div>
            </fieldset>
            <label>
              <p>HEIGHT</p>
              <input
                type="number"
                checked
                onChange={(e) => setHeightAsString(e.target.value)}
              />
            </label>
            <label>
              <p>WEIGHT</p>
              <input
                type="number"
                onChange={(e) => setWeightAsString(e.target.value)}
              />
            </label>
            <label>
              <p>COLOR</p>
              <input type="search" onChange={(e) => setColor(e.target.value)} />
            </label>
            <label>
              <p>BIO</p>
              <input type="search" onChange={(e) => setBio(e.target.value)} />
            </label>
            <fieldset>
              <div className={styles["status"]}>
                <legend>HYPOALLERGENIC</legend>
                <div className={styles["test"]}>
                  <div className={styles["choise"]}>
                    <input
                      type="radio"
                      id="true"
                      name="Hypoallergenic"
                      value="true"
                      onChange={(e) =>
                        setHypoallergenicAsString(e.target.value)
                      }
                    />
                    <label htmlFor="true">yes</label>
                  </div>
                  <div className={styles["choise"]}>
                    <input
                      type="radio"
                      id="false"
                      name="Hypoallergenic"
                      value="false"
                      onChange={(e) =>
                        setHypoallergenicAsString(e.target.value)
                      }
                    />
                    <label htmlFor="false">no</label>
                  </div>
                </div>
              </div>
            </fieldset>

            <label>
              <p>BREED</p>
              <input type="search" onChange={(e) => setBreed(e.target.value)} />
            </label>
            <label>
              <p>DIETARY RESTRICTIONS</p>
              <input
                type="search"
                onChange={(e) => setDietary(e.target.value)}
              />
            </label>
            <label>
              <p>CONCTED USER</p>
              <input
                type="search"
                onChange={(e) => setConctedUser(e.target.value)}
              />
            </label>
            <label>
              <p>Profile Picture:</p>
              <input
                type="file"
                formEncType="multipart/form-data"
                onChange={handleFileChange}
                id="img"
                name="img"
              />
            </label>
          </div>

          <button>ADD PET</button>
        </form>
      )}
    </div>
  );
}
