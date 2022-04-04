import React from "react";
import { useSelector } from "react-redux";

const Bio = ({ bio }) => {

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  let myBio = "";
  let myName = "";
  let myJob = "";
  let myPic = "";

  const showBio = (bio) => {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].id === bio) {
        myBio = usersData[i].bio;
        myName = usersData[i].firstname + " " + usersData[i].lastname;
        myJob = usersData[i].job;
        myPic = usersData[i].picture;
      }
    }
  };
  showBio(bio);

  return (
    <div className={`bio-container border`}>
      <h1 className="bio-title">Biographie</h1>
      <h2 className="bio-title">
        {myBio !== ""
          ? myName
          : userData.firstname + " " + userData.lastname}
      </h2>
      {myBio !== "" ? (
        <img
          src={`../uploads/profil/${myPic}`}
          alt="profil"
          className="picture-bio"
        />
      ) : (
        <img
          src={`../uploads/profil/${userData.picture}`}
          alt="profil"
          className="picture-bio"
        />
      )}
      <h3 className="bio-title">
        {myBio !== "" ? myJob : userData.job}
      </h3>
      {myBio !== "" ? myBio : userData.bio}
    </div>
  );
};

export default Bio;
