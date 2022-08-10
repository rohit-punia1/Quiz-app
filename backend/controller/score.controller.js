const Score = require("../models/Score.model");
const mongoose = require("mongoose");

const createScore = async (req, res) => {
    try {
        const { total_score, score, quizId } = req.body;
        const result = await Score.create({
            total_score, score, quizId
        });

        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteScoreById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Score does not exist" });
        }
        const result = await Score.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).json({ error: "Score does not exist" });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
};

const getAllScore = async (req, res) => {
    try {
        const result = await Score.find({}).sort({ createdAt: -1 });

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getScoreByQuizId = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Score does not exist" });
        }
        const result = await Score.find({ quizId: id });

        if (!result) {
            return res.status(400).json({ error: "Score does not exist" });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateScoreById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Score does not exist" });
        }
        const result = await Score.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
            },
            { new: true }
        );

        if (!result) {
            return res.status(400).json({ error: "Score does not exist" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error);
    }
};
module.exports = {
    createScore,
    deleteScoreById,
    getAllScore,
    getScoreByQuizId,
    updateScoreById,
};
