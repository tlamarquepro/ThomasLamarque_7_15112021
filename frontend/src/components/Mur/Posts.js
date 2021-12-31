import React from "react";

const Posts = ({ post }) => {
  return (
    <div className="allPosts-container border">
      <div className="post-title">{post.title}</div>
      <div className="post-img">{post.picture}</div>
      <div className="post-text">{post.postText}</div>
    </div>
  );
};

export default Posts;
