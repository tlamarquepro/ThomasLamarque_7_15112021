import React, { useContext, useState, useEffect } from "react";

//
import Navigation from "../Nav";
import Accueil from "../Connexion/Accueil";
import Auchoix1 from "../Mur/Auchoix1";
import Auchoix2 from "../Mur/Auchoix2";
import NouveauPost from "../Mur/NouveauPost";
import Posts from "../Mur/Posts";

//
import "../../styles/Wall.css";

//
import { UidContext } from "../AppContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/post.actions";
import { isEmpty } from "../Utils";

const Mur = () => {
  const uid = useContext(UidContext);

  // Dispatch des posts dans le store
  const [loadPost, setLoadPosts] = useState(true);
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.postReducer);
  useEffect(() => {
    if (loadPost) {
      dispatch(getAllPosts());
      setLoadPosts(false);
    }
  }, [loadPost, dispatch]);
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
          <div className="wall-container">
            <Auchoix1 />
            <div className="posts-container">
              <NouveauPost />
              <ul>
                {!isEmpty(allPosts[0]) &&
                  allPosts.map((post) => {
                    return <Posts post={post} key={post.id} />;
                  })}
              </ul>
            </div>
            <Auchoix2 />
          </div>
        </div>
      ) : (
        <Accueil />
      )}
    </div>
  );
};

export default Mur;
