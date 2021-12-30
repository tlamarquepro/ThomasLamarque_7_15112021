import React from "react";
import { useSelector } from "react-redux";
import "../../styles/Profile.css";
import FormImg from "./FormImg";

const Carte = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div className="card">
      <div className="profile-name">
        {userData.lastname} {userData.firstname}
      </div>
      <div className="profile-picture">
        <img
          src={`../uploads/profil/${userData.picture}`}
          alt="profil"
          className="picture"
        />
      </div>
      <FormImg />
      <div className="profile-job">{userData.job}</div>
      <div className="profile-bio">
        <div className="label">Biographie :</div>
        <div className="bio">{userData.bio}</div>
      </div>
    </div>
  );
};

export default Carte;
