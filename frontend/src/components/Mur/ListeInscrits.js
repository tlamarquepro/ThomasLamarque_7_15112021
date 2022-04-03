import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const ListeInscrits = () => {
  const usersData = useSelector((state) => state.usersReducer);
  return (
    <div className={"listOfUsers-container border"}>
      <h1 className="newpost-h1">Inscrits !</h1>
      <ul>
        {!isEmpty(usersData[0]) &&
          usersData.map((user) => {
            return (
              <li key={user.id}>
                <div className="userslist-ctnr">
                  <div className="user-pic">
                    <img
                      src={`../uploads/profil/${user.picture}`}
                      alt="profil"
                      className="post-profilePicture"
                    />
                  </div>
                  <div className="user-name">
                    {user.lastname + " " + user.firstname}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ListeInscrits;
