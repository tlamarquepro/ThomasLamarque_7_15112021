import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewPost } from "../../actions/post.actions";
import { isEmpty } from "../Utils";

const NouveauPost = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [file, setFile] = useState();
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!isEmpty) {
      setIsLoading(false);
    }
  }, [userData]);

  const handlePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("postText", postText);
    data.append("username", userData.username);
    data.append("file", file);

    dispatch(postNewPost(data, userData.id));
  };
  return (
    <div className="newpost-container border">
      <form action="" onSubmit={handlePost} className="upload-pic">
        <input
          id="title"
          type="text"
          className="input"
          placeholder="Titre"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          id="postText"
          type="text"
          className="input"
          placeholder="Texte..."
          onChange={(e) => setPostText(e.target.value)}
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

        <button className="" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default NouveauPost;
