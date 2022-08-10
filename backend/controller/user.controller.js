const user = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassoord = await bcrypt.hash(password, salt);
    console.log(req.body, salt, hashedPassoord);
    const result = await user.create({
      name: name,
      email: email,
      password: hashedPassoord,
    });

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUserById = async (req, res) => {
  try {
    console.log("called deleteUserById");
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const result = await user.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ error: "User does not exist" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllUser = async (req, res) => {
  try {
    console.log("called getAllUser");
    const result = await user.find({}).sort({ createdAt: -1 });

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    console.log("called getUserById");
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const result = await user.findById(id);

    if (!result) {
      return res.status(400).json({ error: "User does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("called updateUserById");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const result = await user.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!result) {
      return res.status(400).json({ error: "User does not exist" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    console.log("called login", req.body);
    const { email, password } = req.body;

    const result = await user.find({ email: email });

    if (!result) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (await bcrypt.compare(password, result[0].password)) {
      let user = { email: email, role: result[0].role, _id: result[0]._id };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ accessToken: accessToken });
    } else {
      res.status(403).send("Not Allowed");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUser,
  deleteUserById,
  updateUserById,
  login,
};
