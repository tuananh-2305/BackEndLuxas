const mongoose = require("mongoose");

const filedSchema = new mongoose.Schema(
  {
    typeFile: { type: String },
    fileCode: { type: String },
    fileName: { type: String, required: true },
    size: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", filedSchema);
module.exports = File;
