import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const NouveauPost = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", postData.username);
    data.append("id", postData.id);
    data.append("file", file);

    dispatch(uploadPicture(data, postData.id));
  };
  return (
    <div className="newpost-container border">
      <form action="" onSubmit={handlePicture} className="upload-pic">
        <input
          id="lastname"
          type="text"
          className=""
          placeholder="Nom"
          onChange
          value="Titre"
        ></input>
        <input
          id="firstname"
          type="text"
          className=""
          placeholder="Prénom"
          onChange
          value="Texte ..."
        ></input>
        <input
          className="input-addPicture"
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button type="submit" className="btn-addPicture">
          Envoyer
        </button>
        <button className="" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default NouveauPost;
