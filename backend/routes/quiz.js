const express = require("express");

const router = express.Router();
const {
  createQuiz,
  deleteQuizById,
  getAllQuiz,
  getQuizById,
  updateQuizById,
} = require("../controller/quiz.controller");
const authenticateToken = require("../middleware/authenticate-token");

// get all questions
router.get("/", authenticateToken, getAllQuiz);

// Create new question
router.post("/_add", authenticateToken, createQuiz);

// get question By Id
router.get("/:id", authenticateToken, getQuizById);

// Delete a question
router.delete("/:id", authenticateToken, deleteQuizById);
// update a question
router.put("/:id", authenticateToken, updateQuizById);

module.exports = router;
