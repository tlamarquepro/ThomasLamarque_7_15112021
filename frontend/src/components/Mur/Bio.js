import React from "react";

const Bio = ({ bio }) => {
  return (
    <div className={`bio-container border`}>
      <h1>{bio}</h1>
    </div>
  );
};

export default Bio;
