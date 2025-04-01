const express = require("express");
const { registerBarber, loginBarber, getAllBarbers,getBarberById,updateBarber,deleteBarber } = require("../controllers/barberController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerBarber);
router.post("/login", loginBarber);
router.get("/", authenticate, authorize(["admin"]), getAllBarbers);
router.get("/:id", authenticate, authorize(["admin", "barber"]), getBarberById);
router.put("/:id", authenticate, authorize(["admin", "barber"]), updateBarber);
router.delete("/:id", authenticate, authorize(["admin"]), deleteBarber);


module.exports = router;
