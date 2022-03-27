import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";

// Import icones fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faTrashAlt,
  faCommentAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { deletePost, getAllPosts } from "../../actions/post.actions";
import { addComment, getAllComments } from "../../actions/comment.actions";
import { addAndDeleteLike, getAllLikes } from "../../actions/like.actions";
import Commentaire from "./Commentaire";

// Icone spinner
const elementSpinner = (
  <FontAwesomeIcon icon={faSyncAlt} spin className="spinner" />
);

// Icone supression post
const elementDelete = <FontAwesomeIcon icon={faTrashAlt} />;

// Icone commentaires
const elementComments = <FontAwesomeIcon icon={faCommentAlt} />;

// Icone supression post
const elementLike = <FontAwesomeIcon icon={faThumbsUp} />;

const Posts = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [confirm, setConfirm] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const allComments = useSelector((state) => state.commentReducer);
  const allLikes = useSelector((state) => state.likeReducer);
  const dispatch = useDispatch();
  let userName = "";
  let hour = post.createdAt.substr(11, 2);
  hour = parseInt(hour) <= 22 ? (hour = parseInt(hour) + 1) : (hour = "00");

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  const showUserPic = () => {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].username === post.username) {
        userName = usersData[i].lastname + " " + usersData[i].firstname;
        return usersData[i].picture;
      }
    }
  };

  const showConfirm = () => {
    setConfirm(true);
  };

  const delConfirm = () => {
    setConfirm(false);
  };

  const delPost = async () => {
    const postId = post.id;
    await dispatch(deletePost(postId));
    dispatch(getAllPosts());
  };

  const toggleComment = () => {
    if (isOpen) {
      setIsOpen(false);
    } else if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    console.log(comment);
    if (comment) {
      const data = {
        commentBody: comment,
        UserId: userData.id,
        PostId: post.id,
        username: userData.username,
      };
      console.log(data);
      await dispatch(addComment(data));
      dispatch(getAllComments());
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const showNbrOfComments = () => {
    let nbrOfComments = [];
    for (let i = 0; i < allComments.length; i++) {
      if (parseInt(allComments[i].PostId) === post.id) {
        nbrOfComments += allComments[i].unit;
      }
    }
    return nbrOfComments.length;
  };

  const addLike = async () => {
    const data = {
      PostId: post.id,
      UserId: userData.id,
    };
    await dispatch(addAndDeleteLike(data));
    dispatch(getAllLikes());
  };

  const showNbrOfLikes = () => {
    let nbrOfLikes = [];
    for (let i = 0; i < allLikes.length; i++) {
      if (parseInt(allLikes[i].PostId) === post.id) {
        nbrOfLikes += allLikes[i].unit;
      }
    }
    return nbrOfLikes.length;
  };

  return (
    <li className="allPosts-container border">
      {isLoading ? (
        elementSpinner
      ) : (
        <div className="post-container">
          <div className="post-head">
            <div className="user-pic">
              <img
                src={`../uploads/profil/${showUserPic()}`}
                alt="profil"
                className="post-profilePicture"
              />
            </div>
            <div className="user-name">{userName}</div>
          </div>
          <div className="post-title">{post.title}</div>
          {post.picture === null ? (
            <div></div>
          ) : (
            <div className="post-img">
              <img
                src={`../uploads/posts/${post.picture}`}
                alt="post"
                className="post-picture"
              />
            </div>
          )}
          <div className="post-text">{post.postText}</div>
          <div className="post-date">
            Posté le {post.createdAt.substr(0, 10)} à{" "}
            {hour + post.createdAt.substr(13, 6)}
          </div>
          {parseInt(post.UserId) === userData.id ||
          userData.role === "admin" ? (
            <>
              <div className="post-delete" onClick={showConfirm}>
                {elementDelete}
              </div>
              {confirm ? (
                <div className="post-confirm">
                  <label>Supprimer ?</label>
                  <button onClick={delPost}>Oui</button>
                  <button onClick={delConfirm}>Non</button>
                </div>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <div></div>
          )}
          <div className="ctnr-likes-comments">
            <div className="comment-likes" onClick={addLike}>
              {elementLike}
              {showNbrOfLikes()}
            </div>
            <div className="comment-icon" onClick={toggleComment}>
              {elementComments}
              {showNbrOfComments()}
            </div>
          </div>
          {isOpen ? (
            <>
              <div className="container-input">
                <textarea
                  className="input-comment"
                  rows="2"
                  cols="58"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                ></textarea>
                <button
                  className="comment-button"
                  onClick={handleComment}
                  type="submit"
                >
                  Envoyer
                </button>
              </div>
              {!isEmpty(allComments[0]) &&
                allComments.map((comment) => {
                  return (
                    <Commentaire
                      comment={comment}
                      post={post}
                      key={comment.id}
                    />
                  );
                })}
            </>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </li>
  );
};

export default Posts;
