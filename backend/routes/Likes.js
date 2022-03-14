const express = require("express");
const router = express.Router();
const { checkUser } = require("../middlewares/AuthMiddleware");
const likesController = require("../controllers/likesController");

router.get("/", likesController.getAllLikes)
router.post("/", likesController.likeAPost);

module.exports = router;
