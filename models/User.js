const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  appointments: [{ barber: mongoose.Schema.Types.ObjectId, date: Date }],
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null }
});


module.exports = mongoose.model("User", userSchema);
