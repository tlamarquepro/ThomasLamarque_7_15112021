import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";

// Import icones fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faTrashAlt,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { deletePost, getAllPosts } from "../../actions/post.actions";
import Commentaire from "./Commentaire";
import { addComment } from "../../actions/comment.actions";

// Icone spinner
const elementSpinner = (
  <FontAwesomeIcon icon={faSyncAlt} spin className="spinner" />
);

// Icone supression post
const elementDelete = <FontAwesomeIcon icon={faTrashAlt} />;

// Icone supression post
const elementComments = <FontAwesomeIcon icon={faCommentAlt} />;

const Posts = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [comment, setComment] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const allComments = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();
  let userName = "";

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

  const delPost = async () => {
    const postId = post.id;
    await dispatch(deletePost(postId));
    dispatch(getAllPosts());
  };

  const toggleComment = () => {
    if (isOpen === true) {
      setIsOpen(false);
    } else if (isOpen === false) {
      setIsOpen(true);
    }
  };

  const handleComment = async () => {
    if (comment.trim()) {
      await dispatch(addComment({ comment: comment.trim() }));
    }
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
            {post.createdAt.substr(0, 10)} à {post.createdAt.substr(11, 8)}
          </div>
          {post.UserId === userData.id ? (
            <div className="post-delete" onClick={delPost}>
              {elementDelete}
            </div>
          ) : (
            <div></div>
          )}
          <div className="comment-icon" onClick={toggleComment}>
            {elementComments}
          </div>
          {isOpen ? (
            <>
              <textarea
                className="input-comment"
                rows="3"
                cols="60"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
              <button onClick={handleComment}>Commenter</button>
              <div>
                {!isEmpty(allComments[0]) &&
                  allComments.map((comment) => {
                    return (
                      <Commentaire
                        comment={comment}
                        key={comment.id}
                        post={post}
                      />
                    );
                  })}
              </div>
            </>
          ) : (
            <div>no comment</div>
          )}
        </div>
      )}
    </li>
  );
};

export default Posts;
