import React, { useContext } from "react";
import { UidContext } from "./AppContext";
import Navigation from "./Nav";

const Mur = () => {
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
          <h1>Mur</h1>
        </div>
      ) : (
        <div>
          <Navigation />
          <img
            src="../assets/icon.svg"
            alt="logo groupomania"
            className="backLogo"
          />
          <h1>Mur</h1>
        </div>
      )}
    </div>
  );
};

export default Mur;
