const mongoose = require("mongoose");

const assistantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  barber: { type: mongoose.Schema.Types.ObjectId, ref: "Barber", required: true },
});

module.exports = mongoose.model("Assistant", assistantSchema);
