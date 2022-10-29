const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  text: {
    type: String,
    max: 30000,
  },
});

module.exports = mongoose.model("text", textSchema);
