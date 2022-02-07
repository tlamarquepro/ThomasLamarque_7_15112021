const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { checkUser } = require("../middlewares/authMiddleware");

router.get("/", commentController.getAllComments);
router.get("/:postId", commentController.getCommentById);
router.post("/", checkUser, commentController.createComment);

module.exports = router;
