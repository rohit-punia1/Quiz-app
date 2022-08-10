const express = require("express");

const router = express.Router();
const {
    createScore,
    deleteScoreById,
    getAllScore,
    getScoreByQuizId,
    updateScoreById,
} = require("../controller/score.controller");
const authenticateToken = require("../middleware/authenticate-token");

// get all score
router.get("/", authenticateToken, getAllScore);

// Create new Score
router.post("/_add", authenticateToken, createScore);

// get score By Id
router.get("/:id", authenticateToken, getScoreByQuizId);

// Delete a score
router.delete("/:id", authenticateToken, deleteScoreById);
// update a score
router.put("/:id", authenticateToken, updateScoreById);

module.exports = router;
