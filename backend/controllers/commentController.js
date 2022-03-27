const { Comments } = require("../models");

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
  const { PostId, commentBody, username, UserId } = req.body;
  await Comments.create({
    PostId: PostId,
    UserId: UserId,
    commentBody: commentBody,
    username: username,
  });
  res.json(req.body);
};

module.exports.deleteComment = async (req, res) => {
  const commentId = req.params.id;
  console.log(commentId);
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("Suppression effectuée !");
};
