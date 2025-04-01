const Barber = require("../models/Barber");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerBarber = async (req, res) => {
  try {
    const { name, email, password, phone, location, services } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const barber = new Barber({ name, email, password: hashedPassword, phone, location, services });
    await barber.save();
    res.status(201).json({ message: "Barber registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginBarber = async (req, res) => {
  try {
    const { email, password } = req.body;
    const barber = await Barber.findOne({ email });
    if (!barber || !(await bcrypt.compare(password, barber.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: barber._id, role: "barber" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBarberById = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) return res.status(404).json({ message: "Barber not found" });
    res.json(barber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBarber = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedBarber = await Barber.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBarber) return res.status(404).json({ message: "Barber not found" });

    res.json(updatedBarber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteBarber = async (req, res) => {
  try {
    const deletedBarber = await Barber.findByIdAndDelete(req.params.id);
    if (!deletedBarber) return res.status(404).json({ message: "Barber not found" });
    res.json({ message: "Barber deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

