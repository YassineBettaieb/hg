const express = require("express");
const { registerAssistant, loginAssistant, getAllAssistants, getAssistantById, updateAssistant, deleteAssistant } = require("../controllers/assistantController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerAssistant);
router.post("/login", loginAssistant);
router.get("/", authenticate, authorize(["admin", "barber"]), getAllAssistants);
router.get("/:id", authenticate, authorize(["admin", "barber", "assistant"]), getAssistantById);
router.put("/:id", authenticate, authorize(["admin", "barber"]), updateAssistant);
router.delete("/:id", authenticate, authorize(["admin"]), deleteAssistant);


module.exports = router;
