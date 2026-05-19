const express = require("express");
const { login, logout, me } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { loginRules } = require("../validators/authValidators");

const router = express.Router();

router.post("/login", loginRules, validateRequest, login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

module.exports = router;
