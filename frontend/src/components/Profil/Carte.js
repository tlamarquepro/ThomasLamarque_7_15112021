import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/post.actions";
import { getAllComments } from "../../actions/comment.actions";
import { getUsers } from "../../actions/users.actions";
import "../../styles/Profile.css";
import FormImg from "./FormImg";
import { updateUser } from "../../actions/users.actions";
import { getUser } from "../../actions/user.actions";

// Url API dotenv
const urlAPI = process.env.REACT_APP_URL_API;

const Carte = () => {
  const userData = useSelector((state) => state.userReducer);
  const [update, setUpdate] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();

  const updateBio = () => {
    if (update) {
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };

  const handleBio = async (e) => {
    e.preventDefault();
    console.log(bio);
    if (bio) {
      const id = userData.id;
      const data = {
        bio: bio,
      };
      console.log(data);
      await dispatch(updateUser(data, id));
      dispatch(getUsers());
      dispatch(getUser(id));
      setUpdate(false);
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const showConfirm = () => {
    setConfirm(false);
  };

  const delConfirm = () => {
    setConfirm(true);
  };

  const deleteAccount = () => {
    const userId = userData.id;
    axios({
      method: "delete",
      url: `${urlAPI}api/users/${userId}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    dispatch(getUsers());
    dispatch(getAllComments());
    dispatch(getAllPosts());
    window.location = "/";
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
          {update ? (
            <textarea
              className="text-bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            ></textarea>
          ) : (
            userData.bio
          )}
        </div>
        {update ? (
          <button className="btn-bio" onClick={handleBio}>
            Valider
          </button>
        ) : (
          <button className="btn-bio" onClick={updateBio}>
            Modifier ma biographie
          </button>
        )}
      </div>
      {confirm ? (
        <button className="btn-delaccount" onClick={showConfirm}>
          Supprimer mon compte
        </button>
      ) : (
        <>
          <h1>Supprimer ?</h1>
          <div className="ctnr-confirm">
            <button onClick={deleteAccount}>Oui</button>
            <button onClick={delConfirm}>Non</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carte;
