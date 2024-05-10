const mongoose = require("mongoose");

const filedSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    size: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", filedSchema);
module.exports = File;
