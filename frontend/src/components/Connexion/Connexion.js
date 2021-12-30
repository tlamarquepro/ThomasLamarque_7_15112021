import React from "react";
import "../../styles/Accueil.css";
import FormConnexion from "./FormConnexion";
import FormInscription from "./FormInscription";

const Connexion = ({ connection, setConnection }) => {
  const toggleRegister = () => {
    setConnection(!connection);
  };
  return (
    <div className="container-form">
      {connection ? (
        <h1 className="title">Work & Co</h1>
      ) : (
        <h1 className="title-signup">Work & Co</h1>
      )}

      {connection ? (
        <FormConnexion functConnection={toggleRegister} />
      ) : (
        <FormInscription functConnection={toggleRegister} />
      )}
    </div>
  );
};

export default Connexion;
