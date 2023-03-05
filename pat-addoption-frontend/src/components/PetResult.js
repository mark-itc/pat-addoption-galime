import React from "react";
import "./PetResult.css";

export default function PetResult(data) {
  if (!(data === undefined || data.data === undefined)) {
    return (
      <div className="pet_result_container">
        {data.data.map((petRusult) => (
          <div className="pet_container">
            <div className="pet_type">Type: {petRusult.type}</div>
            <div className="pet_name">Name: {petRusult.name}</div>
            <div className="pet_status">Status: {petRusult.status}</div>
          </div>
        ))}
      </div>
    );
  }
}
