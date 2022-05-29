const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "authorModel"
    },
    nama: String,
    authorModel: {
      type: String,
      enum: ["Admin", "User"]
    },
    action: {
      path: String,
      method: String
    },
    originPath: String,
    message: String,
    statusCode: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Log", LogSchema);
