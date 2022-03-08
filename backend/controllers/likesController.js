const { Likes } = require("../models");


module.exports.getAllLikes = async (req, res) => {
  const listOfLikes = await Likes.findAll();
  res.json(listOfLikes);
};


module.exports.likeAPost = async (req, res) => {
    const PostId = req.body.PostId;
    const UserId = res.locals.user.id;
  
    const found = await Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    });
    if (!found) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.json({ liked: true });
    } else {
      await Likes.destroy({
        where: { PostId: PostId, UserId: UserId },
      });
      res.json({ liked: false });
    }
  }