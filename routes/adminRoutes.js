const express = require("express");
const { registerAdmin, loginAdmin, getAllAdmins,getAdminById,updateAdmin,deleteAdmin} = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", authenticate, authorize(["admin"]), getAllAdmins);
router.get("/:id", authenticate, authorize(["admin"]), getAdminById);
router.put("/:id", authenticate, authorize(["admin"]), updateAdmin);
router.delete("/:id", authenticate, authorize(["admin"]), deleteAdmin);

module.exports = router;
