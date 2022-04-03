import React, { useState } from "react";
import "../../styles/Accueil.css";
import Connexion from "../Connexion/Connexion";

const Accueil = () => {
  const [connection, setConnection] = useState(true);
  return (
    <div className="container">
      <div className="container-logo">
        <img
          src="./assets/icon-left-font-monochrome-black.svg"
          alt="logo"
          className="logo-accueil"
        />
        <div className="bar"></div>
      </div>
      {connection ? (
        <img src="./assets/com.png" alt="logo message" className="logo-site" />
      ) : (
        <img src="./assets/com.png" alt="logo message" className="logo-site-signup" />
      )}
      <Connexion connection={connection} setConnection={setConnection} />
    </div>
  );
};

export default Accueil;
