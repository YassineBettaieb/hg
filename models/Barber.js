const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  services: [{ type: String }],
  assistants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assistant" }],
  ratings: [{ user: mongoose.Schema.Types.ObjectId, rating: Number }],
});

module.exports = mongoose.model("Barber", barberSchema);
