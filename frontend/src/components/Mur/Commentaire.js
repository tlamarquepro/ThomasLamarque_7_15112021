/* eslint-disable eqeqeq */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteComment, getAllComments } from "../../actions/comment.actions";

// Icone supression commentaire
const elementDelete = <FontAwesomeIcon icon={faTrashAlt} />;

const Commentaire = ({ comment, post }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  let hour = comment.createdAt.substr(11, 2);
  hour = parseInt(hour) <= 22 ? (hour = parseInt(hour) + 1) : (hour = "00");
  let commentUserLastname = "";
  let commentUserFirstname = "";
  let commentUserPicture = "";
  let commentUserJob = "";

  const showCommentUser = () => {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].username === comment.username) {
        commentUserLastname = usersData[i].lastname;
        commentUserFirstname = usersData[i].firstname;
        commentUserPicture = usersData[i].picture;
        commentUserJob = usersData[i].job;
      }
    }
  };

  showCommentUser();

  const delComment = async () => {
    const postId = comment.id;
    await dispatch(deleteComment(postId));
    dispatch(getAllComments());
  };
  return (
    <div>
      {comment.postId == post.id ? (
        <div className="post-comment">
          <div className="comment-header">
            <img
              src={`../uploads/profil/${commentUserPicture}`}
              alt="profil"
              className="post-profilePicture comment-pic"
            />
            <div>
              {commentUserLastname} {commentUserFirstname}
            </div>
            <div></div>
            <div>{commentUserJob}</div>
            <div>
              le {comment.createdAt.substr(0, 10)} à{" "}
              {hour + comment.createdAt.substr(13, 6)}
            </div>
          </div>
          <div className="comment-text">{comment.commentBody}</div>
          <div className="comment-delete" onClick={delComment}>
            {elementDelete}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Commentaire;
