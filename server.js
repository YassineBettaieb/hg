// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const barberRoutes = require("./routes/barberRoutes");
const assistantRoutes = require("./routes/assistantRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB using the URI from the .env file
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes for different roles (Admin, Barber, Assistant, User)
app.use("/admin", adminRoutes);
app.use("/barber", barberRoutes);
app.use("/assistant", assistantRoutes);
app.use("/user", userRoutes);

// Start the server on the port defined in the .env file
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
