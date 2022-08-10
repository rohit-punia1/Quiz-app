const question = require("../models/question.model");
const mongoose = require("mongoose");

const createQuestion = async (req, res) => {
  try {
    const { title, level, options, answers, type } = req.body;
    const result = await question.create({
      level,
      options,
      answers,
      type,
      title,
    });

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Question does not exist" });
    }
    const result = await question.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ error: "Question does not exist" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const result = await question.find({}).sort({ createdAt: -1 });

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Question does not exist" });
    }
    const result = await question.findById(id);

    if (!result) {
      return res.status(400).json({ error: "Question does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateQuestionById = async (req, res) => {
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
  createQuestion,
  deleteQuestionById,
  getAllQuestion,
  getQuestionById,
  updateQuestionById,
};
