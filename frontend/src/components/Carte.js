import React from "react";
import { useSelector } from "react-redux";
import "../styles/Profile.css";

const Carte = () => {
  const userData = useSelector((state) => state.userReducer);
  console.log(userData);
  return (
    <div className="card">
      <div className="profile-picture">
        <img
          src={`../assets/photo/${userData.picture}`}
          alt="profil"
          className="picture"
        />
      </div>
      <div className="profile-name">{userData.lastname}</div>
      <div className="profile-firstname">{userData.firstname}</div>
      <div className="profile-job">{userData.job}</div>
      <div className="profile-bio">{userData.bio}</div>
    </div>
  );
};

export default Carte;
