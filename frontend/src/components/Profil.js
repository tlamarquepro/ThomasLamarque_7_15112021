import React, { useContext } from "react";
import Carte from "./Carte";
import Accueil from "./Accueil";
import Navigation from "./Nav";
import { UidContext } from "./AppContext";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="relative">
      <Navigation />
      {uid ? (
        <div>
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
