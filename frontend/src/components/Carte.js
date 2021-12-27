import React from "react";
import { useSelector } from "react-redux";
import "../styles/Profile.css";

const Carte = () => {
  const userData = useSelector((state) => state.userReducer);
  console.log(userData);
  return (
    <div className="card">
      <div className="profile-name">
        {userData.lastname} {userData.firstname}
      </div>
      <div className="profile-picture">
        <img
          src={`../assets/photo/${userData.picture}`}
          alt="profil"
          className="picture"
        />
      </div>
      <div className="add-picture profile-bio">
        <div className="bio">
          <button className="btn-addPicture">Ajouter une photo</button>
        </div>
      </div>
      <div className="profile-job">{userData.job}</div>
      <div className="profile-bio">
        <div className="label">Biographie :</div>
        <div className="bio">{userData.bio}</div>
      </div>
    </div>
  );
};

export default Carte;
