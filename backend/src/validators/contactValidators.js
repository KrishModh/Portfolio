const { body } = require("express-validator");

const contactRules = [
  body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name must be 2-80 characters"),
  body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("message").trim().isLength({ min: 10, max: 2000 }).withMessage("Message must be 10-2000 characters"),
  body("company").optional({ checkFalsy: true }).isEmpty().withMessage("Spam detected")
];

module.exports = { contactRules };
