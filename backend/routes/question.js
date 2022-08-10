const express = require("express");
const {
  createQuestion,
  deleteQuestionById,
  getAllQuestion,
  getQuestionById,
  updateQuestionById,
} = require("../controller/question.controller");
const authenticateToken = require("../middleware/authenticate-token");

const router = express.Router();

// get all questions
router.get("/", authenticateToken, getAllQuestion);

// Create new question
router.post("/_add", authenticateToken, createQuestion);

// get question By Id
router.get("/:id", authenticateToken, getQuestionById);

// Delete a question
router.delete("/:id", authenticateToken, deleteQuestionById);
// update a question
router.put("/:id", authenticateToken, updateQuestionById);

module.exports = router;
