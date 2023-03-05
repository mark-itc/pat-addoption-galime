import React from "react";
import "./PetResult.css";

export default function AllUsersResult({ ...data }) {
  if (!(data === undefined || data.data === undefined)) {
    // const dataAsArr = Object.entries(data.data);
    // console.log("data AllUsersResult", dataAsArr);

    return (
      <div className="pet_result_container">
        {data.data.map((usersRusult) => (
          <div className="pet_container">
            <div className="pet_type">first Name: {usersRusult.firstName}</div>
            <div className="pet_name">Last Name: {usersRusult.lastName}</div>
          </div>
        ))}
      </div>
    );
  }
}
