const quiz = require("../models/quiz.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createQuiz = async (req, res) => {
  try {
    console.log("called");
    const { name, assigned_user, total_question, questions } = req.body;
    console.log(req.body);
    const result = await quiz.create({
      name,
      assigned_user,
      total_question,
      questions,
    });

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Question does not exist" });
    }
    const result = await quiz.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ error: "Question does not exist" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllQuiz = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { role, _id } = jwt.decode(token)
    debugger
    let result
    if (role === "admin") {
      result = await quiz.find({}).sort({ createdAt: -1 });
    }
    if (role === "user") {
      result = await quiz.find({
        'assigned_user': {
          $in: [
            _id
          ]
        }
      }).sort({ createdAt: -1 });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Question does not exist" });
    }
    const result = await quiz.findById(id);

    if (!result) {
      return res.status(400).json({ error: "Question does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Question does not exist" });
    }
    const result = await question.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!result) {
      return res.status(400).json({ error: "Question does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  createQuiz,
  deleteQuizById,
  getAllQuiz,
  getQuizById,
  updateQuizById,
};
