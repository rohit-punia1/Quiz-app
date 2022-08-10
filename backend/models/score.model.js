const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = new Schema(
    {
        total_score: {
            type: String,
            required: true
        },
        score: {
            type: Array,
            required: true,
        },
        quizId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

var Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
