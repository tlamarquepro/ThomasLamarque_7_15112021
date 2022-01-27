import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getAllPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";

// Import icones fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

// Icone connexion
const elementSpinner = (
  <FontAwesomeIcon icon={faSyncAlt} spin className="spinner" />
);

const NouveauPost = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!isEmpty(userData)) {
      setIsLoading(false);
    }
  }, [userData]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (postText || file) {
      const data = new FormData();
      data.append("title", title);
      data.append("postText", postText);
      data.append("username", userData.username);
      data.append("file", file);
      data.append("UserId", userData.id);
      await dispatch(addPost(data));
      dispatch(getAllPosts());
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="newpost-container border">
      {isLoading ? (
        elementSpinner
      ) : (
        <form action="" onSubmit={handlePost} className="upload-pic">
          <input
            id="title"
            type="text"
            className="newpost-title input"
            placeholder="Titre"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <textarea
            id="postText"
            type="text"
            className="newpost-text"
            placeholder="Texte..."
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          ></textarea>
          <input
            className="input-addPicture"
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handlePicture(e)}
          />
          <br />

          <button className="" onClick={handlePost} type="submit">
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
};

export default NouveauPost;
