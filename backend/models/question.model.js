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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
