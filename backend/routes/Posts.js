const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const multer = require("multer");
const { checkUser } = require("../middlewares/authMiddleware");
const upload = multer();

router.get("/", postController.getAllPosts); // Tous les posts

router.get("/byId/:id", postController.getPostById); // Afficher un post avec l'ID

router.delete("/byId/:id", checkUser, postController.deletePost); // Supprimer un post avec l'ID


router.post("/",upload.single("file"), postController.createPost); // Création de post

module.exports = router;
