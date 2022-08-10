const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/question");
const quizRoutes = require("./routes/quiz");
const userRoutes = require("./routes/user");
const scoreRoutes = require("./routes/score");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/score", scoreRoutes);

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to db and Server is running on port :${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
