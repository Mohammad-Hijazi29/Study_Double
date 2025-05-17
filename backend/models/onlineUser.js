const mongoose = require("mongoose");

const onlineSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  lastSeen: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OnlineUser", onlineSchema);
