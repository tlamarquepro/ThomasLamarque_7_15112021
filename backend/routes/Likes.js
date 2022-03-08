const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { checkUser } = require("../middlewares/AuthMiddleware");

router.post("/", checkUser, async (req, res) => {
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
});

module.exports = router;
