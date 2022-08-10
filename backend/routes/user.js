const express = require("express");

const router = express.Router();
const {
  createUser,
  getUserById,
  getAllUser,
  updateUserById,
  deleteUserById,
  login,
} = require("../controller/user.controller");
const authenticateToken = require("../middleware/authenticate-token");

// get all questions
router.get("/", authenticateToken, getAllUser);

// Create new question
router.post("/signup", createUser);

// login
router.post("/login", login);

// get question By Id
router.get("/:id", authenticateToken, getUserById);

// Delete a question
router.delete("/:id", authenticateToken, deleteUserById);
// update a question
router.put("/:id", authenticateToken, updateUserById);

module.exports = router;
