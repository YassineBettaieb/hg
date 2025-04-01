const Assistant = require("../models/Assistant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAssistant = async (req, res) => {
  try {
    const { name, email, password, barber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const assistant = new Assistant({ name, email, password: hashedPassword, barber });
    await assistant.save();
    res.status(201).json({ message: "Assistant registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginAssistant = async (req, res) => {
  try {
    const { email, password } = req.body;
    const assistant = await Assistant.findOne({ email });
    if (!assistant || !(await bcrypt.compare(password, assistant.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: assistant._id, role: "assistant" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllAssistants = async (req, res) => {
  try {
    const assistants = await Assistant.find();
    res.json(assistants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssistantById = async (req, res) => {
  try {
    const assistant = await Assistant.findById(req.params.id);
    if (!assistant) return res.status(404).json({ message: "Assistant not found" });
    res.json(assistant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAssistant = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedAssistant = await Assistant.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedAssistant) return res.status(404).json({ message: "Assistant not found" });

    res.json(updatedAssistant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteAssistant = async (req, res) => {
  try {
    const deletedAssistant = await Assistant.findByIdAndDelete(req.params.id);
    if (!deletedAssistant) return res.status(404).json({ message: "Assistant not found" });
    res.json({ message: "Assistant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
