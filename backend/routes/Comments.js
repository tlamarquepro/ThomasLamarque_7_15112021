const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/", commentController.getAllComments);
router.get("/:postId", commentController.getCommentById);
router.post("/", commentController.createComment);
router.delete("/byId/:id", commentController.deleteComment);

module.exports = router;
