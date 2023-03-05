import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Search.module.css";
import PetResult from "../../components/PetResult";

export default function Search(props) {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [data, setData] = useState();
  const [type, setTyp] = useState();
  const [status, setStatus] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    console.log("data:", data);
  }, data);

  function getData(e) {
    e.preventDefault();
    const pet = {
      ...(type && { type }),
      ...(status && { status }),
      ...(height && { height }),
      ...(weight && { weight }),
      ...(name && { name }),
    };
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .get("http://localhost:3010/pet", { params: pet }, config)
      .then((res) => {
        console.log("res====>", res);
        setData(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsAdvanced(false);
  }

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["page-container"]}>
        <form
          className={styles["search"]}
          onSubmit={(e) => {
            getData(e);
          }}
        >
          {!isAdvanced && (
            <label>
              <p> Pet Type</p>
              <input type="search" placeholder="all" />
            </label>
          )}
          {isAdvanced && (
            <div>
              <label>
                <p>Type</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setTyp(e.target.value)}
                />
              </label>
              <label>
                <p>Name</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setName(e.target.value)}
                />
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
                <p>Height(+-10 kg)</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setHeight(e.target.value)}
                />
              </label>
              <label>
                <p>Weight(+-10 kg)</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
            </div>
          )}
          <button>Search</button>
        </form>
        {!isAdvanced && (
          <button
            className={styles["search-btn"]}
            onClick={() => {
              setIsAdvanced(true);
            }}
          >
            Advance search
          </button>
        )}
        {isAdvanced && (
          <button
            className={styles["search-btn"]}
            onClick={() => {
              setIsAdvanced(false);
            }}
          >
            Basic search
          </button>
        )}
        <div className={styles["result-container"]}>
          <PetResult data={data}></PetResult>
        </div>
      </div>
    </div>
  );
}
