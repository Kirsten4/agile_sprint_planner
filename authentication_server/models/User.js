const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    unique: true,
    type: String,
  },
  password: String,
});

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;