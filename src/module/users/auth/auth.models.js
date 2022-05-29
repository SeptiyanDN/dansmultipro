const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    accessToken: String,
    refreshToken : String,
    author: {
      type: mongoose.Types.ObjectId,
      refPath: "authorModel"
    },
  
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Auth", AuthSchema);
