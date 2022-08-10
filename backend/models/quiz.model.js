const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    type: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const quizSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    assigned_user: {
      type: Array,
    },
    total_question: {
      type: Number,
      required: true,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);
var Quizes = mongoose.model("Quiz", quizSchema);

module.exports = Quizes;
