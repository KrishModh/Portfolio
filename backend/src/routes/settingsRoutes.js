const express = require("express");
const { getSettings, updateSettings } = require("../controllers/settingsController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { settingsRules } = require("../validators/settingsValidators");

const router = express.Router();

router.get("/", getSettings);
router.put("/", protect, settingsRules, validateRequest, updateSettings);

module.exports = router;
