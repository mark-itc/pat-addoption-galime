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

  useEffect(() => {
    console.log("data:", data);
  }, data);

  function getData(e) {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    axios
      .get("http://localhost:3010/pet", config)
      .then((res) => {
        console.log("res====>", res);
        setData(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsAdvanced(false);
  }
  // function postData() {
  //   console.log("userName");

  //   var user = {
  //     userName: "userName",
  //   };
  //   const config = {
  //     headers: {
  //       Authorization: localStorage.getItem("Authorization"),
  //     },
  //   };
  //   axios
  //     .post("http://localhost:3010/getData", user, config)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["page-container"]}>
        <form
          className={styles["search"]}
          onSubmit={(e) => {
            getData(e);
          }}
        >
          <label>
            <p> pet type</p>
            <input type="search" placeholder="all" />
          </label>
          {isAdvanced && (
            <div>
              <label>
                <p>Status</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setStatus(e.target.value)}
                />
              </label>
              <label>
                <p>Height</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setHeight(e.target.value)}
                />
              </label>
              <label>
                <p>Weight</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
              <label>
                <p>Type</p>
                <input
                  type="search"
                  ON
                  onChange={(e) => setTyp(e.target.value)}
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
