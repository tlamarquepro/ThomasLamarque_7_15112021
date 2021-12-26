const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// Identifiant
router.post("/register", authController.signUp); // Inscription
router.post("/auth/login", authController.signIn);  // Connexion
router.get("/auth/logout", authController.logOut);

// Utilisateurs
router.get("/", userController.getAllUsers);    // Tous les utilisateurs
router.get("/:id", userController.getUserById);   // Utilisateur par ID
router.put("/:id", userController.updateUser);  // Modifier un utilisateur
router.delete("/:id", userController.deleteUser);   // Supprimer un utilisateur

module.exports = router;
