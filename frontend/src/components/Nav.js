import React from "react";
import { NavLink } from "react-router-dom";

// Import icones fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  // Icone oeil
  const elementUser = <FontAwesomeIcon icon={faUserCircle} />;
  const elementComments = <FontAwesomeIcon icon={faComments} />;
  return (
    <div className="navigation">
      <NavLink exact="true" to="/wall" className="nav" activeclassname="active">
        {elementComments} Mur
      </NavLink>
      <NavLink
        exact="true"
        to="/profile"
        className="nav"
        activeclassname="active"
      >
        {elementUser} Profil
      </NavLink>
    </div>
  );
};

export default Navigation;
