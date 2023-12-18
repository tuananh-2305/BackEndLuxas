const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    isAdmin: { type: Boolean, required: true, default: false },
    image: { type: String },
    idLuxas: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    password: { type: String, required: true },
    access_token: { type: String },
    refresh_token: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
