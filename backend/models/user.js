const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String },
  friends: [{ type: Schema.Types.Object, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
