import React from "react";
import { useSelector } from "react-redux";
import "../styles/Profile.css";

const Carte = () => {
  const userData = useSelector((state) => state.userReducer);
  console.log(userData);
  return (
    <div className="card">
      <div className="profile-picture">
        <img src={`../assets/photo/${userData.picture}`} alt="" />
      </div>
      <div className="profile-name"></div>
      <div className="profile-firstname"></div>
      <div className="profile-job"></div>
      <div className="profile-bio"></div>
    </div>
  );
};

export default Carte;
