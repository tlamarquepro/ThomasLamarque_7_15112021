/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Commentaire = ({ comment, post }) => {
  const usersData = useSelector((state) => state.usersReducer);
  let hour = comment.createdAt.substr(11, 2);
  hour = parseInt(hour) + 1;
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
  return (
    <div>
      {comment.postId == post.id ? (
        <div className="post-comment">
          <div className="comment-header">
            {commentUserLastname}
            Le {comment.createdAt.substr(0, 10)} à{" "}
            {hour + comment.createdAt.substr(13, 6)}
          </div>
          {comment.commentBody}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Commentaire;
