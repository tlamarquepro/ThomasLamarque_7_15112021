import React, { useContext } from "react";
import Carte from "../Profil/Carte";
import Accueil from "../Connexion/Accueil";
import Navigation from "../Nav";
import { UidContext } from "../AppContext";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="relative">
      {uid ? (
        <div>
          <Navigation />
          <img
            src="../assets/icon.svg"
            alt="logo groupomania"
            className="backLogo"
          />
          <Carte />
        </div>
      ) : (
        <Accueil />
      )}
    </div>
  );
};

export default Profil;
