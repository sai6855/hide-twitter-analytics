const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    max: 40,
    unique: true,
  },
  text: {
    type: String,
    max: 30000,
  },
});

module.exports = mongoose.model("text", textSchema);
