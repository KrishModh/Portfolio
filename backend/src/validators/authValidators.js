const { body } = require("express-validator");

const loginRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 80 })
    .withMessage("Username must be 80 characters or fewer"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
];

module.exports = { loginRules };
