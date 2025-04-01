const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Barber = require("../models/Barber");
const Assistant = require("../models/Assistant");

exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

exports.authorize = (roles) => {
  return async (req, res, next) => {
    try {
      let user;

      switch (req.user.role) {
        case "admin":
          user = await Admin.findById(req.user.id);
          break;
        case "barber":
          user = await Barber.findById(req.user.id);
          break;
        case "assistant":
          user = await Assistant.findById(req.user.id);
          break;
        default:
          return res.status(403).json({ message: "Unauthorized" });
      }

      if (!user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Forbidden" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
