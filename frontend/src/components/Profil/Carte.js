import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/Profile.css";
import FormImg from "./FormImg";

const Carte = () => {
  const userData = useSelector((state) => state.userReducer);
  const [update, setUpdate] = useState(false);

  const updateBio = () => {
    if (update) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };
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
        <div className="bio">
          {update ? <textarea></textarea> : userData.bio}
        </div>
        <button className="btn-bio" onClick={updateBio}>Modifier ma biographie</button>
      </div>
      <button onClick={updateBio}>Supprimer mon compte</button>
    </div>
  );
};

export default Carte;
