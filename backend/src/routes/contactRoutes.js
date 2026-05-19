const express = require("express");
const rateLimit = require("express-rate-limit");
const { createMessage, deleteMessage, listMessages, markMessageRead } = require("../controllers/contactController");
const { env } = require("../config/env");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { contactRules } = require("../validators/contactValidators");

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.CONTACT_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many contact attempts. Please try again later." }
});

router.post("/", contactLimiter, contactRules, validateRequest, createMessage);
router.get("/messages", protect, listMessages);
router.patch("/messages/:id/read", protect, markMessageRead);
router.delete("/messages/:id", protect, deleteMessage);

module.exports = router;
