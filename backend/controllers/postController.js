const { Posts } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

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
  let fileName;
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      ) {
        res.status(200).send("Type de fichier incompatible");
        throw err;
      }
      if (req.file.size > 500000) {
        res.status(200).send("Fichier trop volumineux");
        throw err;
      }
    } catch (err) {
      return res.status(201).json({ error: err });
    }
    const listOfPosts = await Posts.findAll();
    let lastElement;
    const getPictureId = () => {
      if (!listOfPosts[0]) {
        return 1;
      } else {
        lastElement = listOfPosts[listOfPosts.length - 1].id + 1;
        return lastElement;
      }
    };
    fileName = req.body.username + getPictureId() + `.jpg`;
    console.log(fileName);

    await pipeline(
      req.file.stream,
      fs.createWriteStream(`../frontend/public/uploads/posts/${fileName}`)
    );
  }

  const { title, postText, username } = req.body;
  await Posts.create({
    title: title,
    postText: postText,
    username: username,
    picture: fileName,
  });
  res.json(req.body);
};
