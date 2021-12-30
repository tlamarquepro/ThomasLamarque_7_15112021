import React, { useState } from "react";
import "../../styles/Accueil.css";
import axios from "axios";

// Import icones fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

// Url API dotenv
const urlAPI = process.env.REACT_APP_URL_API;

const FormConnexion = ({ functConnection }) => {
  // State données du formulaire de connexion
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour gérer les erreurs et envoyer les données
  const handleLogin = async (e) => {
    e.preventDefault();

    // Selection des éléments
    const usernameError = document.querySelector(".user-error.error");
    const passwordError = document.querySelector(".pass-error.error");

    // Maj à l'appel de la fonction
    usernameError.innerHTML = "";
    passwordError.innerHTML = "";

    // Conditions erreurs + requête
    if (username === "" || password === "") {
      if (username === "" && password === "") {
        usernameError.innerHTML = "Vous devez renseigner un identifiant";
        passwordError.innerHTML = "Vous devez renseigner un mot de passe";
      } else if (username === "") {
        usernameError.innerHTML = "Vous devez renseigner un identifiant";
      } else if (password === "") {
        passwordError.innerHTML = "Vous devez renseigner un mot de passe";
      }
    } else {
      await axios({
        method: "post",
        url: `${urlAPI}api/users/auth/login`,
        withCredentials: true,
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.error) {
            passwordError.innerHTML = res.data.error;
          } else {
            window.location = "/wall";
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

  // Icone connexion
  const elementSignin = <FontAwesomeIcon icon={faSignInAlt} />;

  return (
    <div>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          className="input id"
          placeholder="Identifiant"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        ></input>
        <div className="user-error error"></div>
        {eye ? (
          <div className="ctnr-password">
            <input
              type="password"
              className="input password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            <div className="eye-icon" onClick={toggleEye}>
              {elementEye}
            </div>
          </div>
        ) : (
          <div className="ctnr-password">
            <input
              type="text"
              className="input password"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
            <div className="eye-icon" onClick={toggleEye}>
              {elementEye}
            </div>
          </div>
        )}
        <div className="pass-error error"></div>
        <button className="btn-signin-submit" type="submit">
          {elementSignin}
        </button>
      </form>
      <div className="sign-up" onClick={functConnection}>
        Pas encore inscrit ?
      </div>
    </div>
  );
};

export default FormConnexion;
