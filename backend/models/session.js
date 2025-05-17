const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
