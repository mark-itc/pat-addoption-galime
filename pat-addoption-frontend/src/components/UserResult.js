import React, { useState, useEffect, useContext } from "react";
import "./UserResult.css";

export default function UserResult(data) {
  if (!(data === undefined || data.data === undefined)) {
    return (
      <div className="pet_result_container">
        {data.data.map((userRusult) => (
          <div className="user_container">
            <div className="firstName">firstName: {userRusult.firstName}</div>
            <div className="lastName">lastName: {userRusult.lastName}</div>
            <div className="email">email: {userRusult.email}</div>
            <div className="password">password: {userRusult.password}</div>
            <div className="user_phone">phone: {userRusult.phone}</div>
            <div className="user_bio">bio: {userRusult.bio}</div>
          </div>
        ))}
      </div>
    );
  }
}
