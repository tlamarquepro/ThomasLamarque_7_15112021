import React, { useState } from "react";
import "../../styles/Accueil.css";
import axios from "axios";

// Import icones fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// Url API dotenv
const urlAPI = process.env.REACT_APP_URL_API;

const FormInscription = ({ functConnection }) => {
  // State données du formulaire d'inscription
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [job, setJob] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ctrlPassword, setCtrlPassword] = useState("");

  // Fonction pour vider les champs de saisie après l'envoi de données
  const removeText = () => {
    setLastname("");
    setFirstname("");
    setJob("");
    setUsername("");
    setPassword("");
    setCtrlPassword("");
  };

  // Fonction pour gérer les erreurs et envoyer les données
  const handleRegister = async (e) => {
    e.preventDefault();
    const lastnameError = document.querySelector(".lastname-error.error");
    const firstnameError = document.querySelector(".firstname-error.error");
    const jobError = document.querySelector(".job-error.error");
    const usernameError = document.querySelector(".username-error.error");
    const passwordError = document.querySelector(".password-error.error");
    const ctrlPasswordError = document.querySelector(
      ".ctrlPassword-error.error"
    );

    // Mettre à zero les erreurs
    lastnameError.innerHTML = "";
    firstnameError.innerHTML = "";
    jobError.innerHTML = "";
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";
    ctrlPasswordError.innerHTML = "";

    if (password !== ctrlPassword) {
      ctrlPasswordError.innerHTML = "Mot de passe différents";
    } else if (
      lastname === "" ||
      firstname === "" ||
      job === "" ||
      username === "" ||
      password === ""
    ) {
      ctrlPasswordError.innerHTML = "Veuillez remplir tous les champs";
    } else {
      await axios({
        method: "post",
        url: `${urlAPI}api/users/register`,
        withCredentials: true,
        data: {
          lastname,
          firstname,
          job,
          username,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data === "Pseudo déjà pris !") {
            alert("Pseudo déjà pris !");
          } else if (res.data.errors) {
            lastnameError.innerHTML = res.data.errors.lastname;
            firstnameError.innerHTML = res.data.errors.firstname;
            jobError.innerHTML = res.data.errors.job;
            usernameError.innerHTML = res.data.errors.username;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            removeText();
            functConnection()
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // State pour la visibilité du password
  const [eye, setEye] = useState(true);
  const toggleEye = () => {
    setEye(!eye);
  };

  // Icone oeil
  const elementEye = <FontAwesomeIcon icon={faEye} />;

  return (
    <div>
      <form className="form-signup" onSubmit={handleRegister}>
        <div className="cntr-name-button">
          <input
            id="lastname"
            type="text"
            className="input last"
            placeholder="Nom"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          ></input>
          <div className="lastname-error error"></div>
          <input
            id="firstname"
            type="text"
            className="input first"
            placeholder="Prénom"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          ></input>
          <div className="firstname-error error"></div>
          <button className="btn-signup-submit" type="submit">
            S'inscrire
          </button>
        </div>
        <div className="ctnr-job-auth">
          <input
            id="job"
            type="text"
            className="input job"
            placeholder="Poste occupé"
            onChange={(e) => setJob(e.target.value)}
            value={job}
          ></input>
          <div className="job-error error"></div>
          <input
            id="username"
            type="text"
            className="input auth"
            placeholder="Identifiant"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
          <div className="username-error error"></div>
        </div>
        {eye ? (
          <div className="ctnr-password-signup">
            <input
              id="password"
              type="password"
              className="input password password-signup"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            <div className="password-error error"></div>
            <div className="eye-icon-signup" onClick={toggleEye}>
              {elementEye}
            </div>
            <input
              id="ctrlPassword"
              type="password"
              className="input password passwordConf-signup"
              placeholder="Confirmer le mot de passe"
              onChange={(e) => setCtrlPassword(e.target.value)}
              value={ctrlPassword}
            ></input>
            <div className="ctrlPassword-error error"></div>
          </div>
        ) : (
          <div className="ctnr-password-signup">
            <input
              id="password"
              type="text"
              className="input password password-signup"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            <div className="password-error error"></div>
            <div className="eye-icon-signup" onClick={toggleEye}>
              {elementEye}
            </div>
            <input
              id="ctrlPassword"
              type="text"
              className="input password passwordConf-signup"
              placeholder="Confirmer le mot de passe"
              onChange={(e) => setCtrlPassword(e.target.value)}
              value={ctrlPassword}
            ></input>
            <div className="ctrlPassword-error error"></div>
          </div>
        )}
      </form>
      <div className="sign-in" onClick={functConnection}>
        Déjà inscrit ? Connexion
      </div>
    </div>
  );
};

export default FormInscription;
