import React, { useContext, useState, useEffect } from "react";

//
import Navigation from "../Nav";
import Accueil from "../Connexion/Accueil";
import Auchoix1 from "./Bio";
import ListeInscrits from "../Mur/ListeInscrits";
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
  const [bio, setBio] = useState()

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
            <Auchoix1 bio={bio} setBio={setBio} />
            <div className="posts-container">
              <NouveauPost />
              <ul>
                {!isEmpty(allPosts[0]) &&
                  allPosts.slice(0).reverse().map((post) => {
                    return <Posts post={post} key={post.id} />;
                  })}
              </ul>
            </div>
            <ListeInscrits bio={bio} setBio={setBio}/>
          </div>
        </div>
      ) : (
        <Accueil />
      )}
    </div>
  );
};

export default Mur;
