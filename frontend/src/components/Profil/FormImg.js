import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const FormImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", userData.username);
    data.append("id", userData.id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file" className="inactive">Changer d'image</label>
      <input
      className="input-addPicture"
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <button type="submit" className="btn-addPicture">Envoyer</button>
    </form>
  );
};

export default FormImg;
