const express = require("express");
const connectDB = require("./db/db.js");
const app = express();
const port = 3000;
const textModal = require("./db/model.js");
require("dotenv").config(".env");
app.use(express.json());
app.use(require("cors")());
connectDB();

app.get("/text/:username", async (req, res) => {
  try {
    const data = await textModal.findOne({ username: req.params.username });
    if (!data) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: data.text });
  } catch (e) {
    throw error;
  }
});

app.post("/text", async (req, res) => {
  try {
    const { username, text } = req.body;

    if (!username) {
      return res.status(404).json({ message: "username required" });
    }

    if (!text) {
      return res.status(404).json({ message: "text required" });
    }

    if (text.length > 30000) {
      return res
        .status(404)
        .json({ message: "maximum 30,000 characters allowed for text " });
    }

    const data = await textModal.findOne({ username });
    if (!data) {
      return res.status(404).json({ message: "user not found" });
    }
    await textModal.findByIdAndUpdate(data._id, { text });
    res.status(200).json({ message: "copied!!" });
  } catch (error) {
    throw error;
  }
});

app.post("/create-user", async (req, res) => {
  try {
    const { username } = req.body;
    const data = await textModal.findOne({ username });
    if (username.length > 40) {
      return res
        .status(404)
        .json({ message: "maximum 40 characters allowed for username " });
    }
    if (data) {
      return res.status(404).json({
        message:
          "user already exists with the specified username, please try with another username.",
      });
    }
    await textModal.create({ username, text: "" });
    res.status(200).json({ message: "user created" });
  } catch (error) {
    throw error;
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message || "Server error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
