import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import axios from "axios";

// Import icones fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faComments,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

// Url API dotenv
const urlAPI = process.env.REACT_APP_URL_API;

const Navigation = () => {
  // Check de connexion
  const uid = useContext(UidContext);
  // Icones
  const elementUser = <FontAwesomeIcon icon={faUserCircle} />;
  const elementComments = <FontAwesomeIcon icon={faComments} />;
  const elementLogout = <FontAwesomeIcon icon={faSignOutAlt} />;

  // Fonction deconnexion
  const logOut = () => {
    axios({
      method: "get",
      url: `${urlAPI}api/users/auth/logout`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
      window.location = "/";
  };
  return (
    <div>
      {uid ? (
        <div className="navigation">
          <NavLink
            exact="true"
            to="/wall"
            className="nav"
            activeclassname="active"
          >
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
          <div className="nav" onClick={logOut}>
            {elementLogout} Deconnexion
          </div>
        </div>
      ) : (
        <div className="navigation">
          <NavLink
            exact="true"
            to="/wall"
            className="nav"
            activeclassname="active"
          >
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
      )}
    </div>
  );
};

export default Navigation;
