const express = require("express");
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser, forgotPassword, resetPassword, changePassword } = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authenticate, authorize(["admin"]), getAllUsers);
router.get("/:id", authenticate, authorize(["admin", "user"]), getUserById);
router.put("/:id", authenticate, authorize(["admin", "user"]), updateUser);
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser);
// Forgot Password - Send Email
router.post("/forgot-password", forgotPassword);

// Reset Password - Set New Password
router.post("/reset-password/:token", resetPassword);

// Change Password - Requires Login
router.post("/change-password", authenticate, changePassword);



module.exports = router;
