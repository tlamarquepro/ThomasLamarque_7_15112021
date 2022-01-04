const { Posts } = require("../models");

module.exports.getAllPosts = async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
};

module.exports.getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
};

module.exports.createPost = async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
};
