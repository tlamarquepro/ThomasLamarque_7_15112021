const { Comments } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.getAllComments = async (req, res) => {
  const listOfComments = await Comments.findAll();
  res.json(listOfComments);
};

module.exports.getCommentById = async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
};

module.exports.createComment = async (req, res) => {
  const { postId, commentBody, picture } = req.body;
  await Comments.create({
    postId: postId,
    commentBody: commentBody,
    picture: picture,
  });
  res.json(req.body);
};

module.exports.deleteComment = async (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("Suppression effectuée !");
};

module.exports.updateComment = async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });
  res.json(newTitle);
};
