const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer();

router.get("/", postController.getAllPosts);

router.get("/byId/:id", postController.getPostById);

router.post("/",upload.single("file"), postController.createPost); // Création de post

module.exports = router;
