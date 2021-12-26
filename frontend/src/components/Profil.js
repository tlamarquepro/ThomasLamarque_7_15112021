import React from "react";
import Carte from "./Carte";
import Navigation from "./Nav";

const Profil = () => {
  return (
    <div className="relative">
      <Navigation />
      <img
        src="../assets/icon.svg"
        alt="logo groupomania"
        className="backLogo"
      />
      <Carte />
    </div>
  );
};

export default Profil;
