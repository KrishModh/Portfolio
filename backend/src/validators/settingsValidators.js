const { body } = require("express-validator");

const optionalUrl = (field, label) =>
  body(field).optional({ checkFalsy: true }).isURL({ require_protocol: true }).withMessage(`${label} must be a valid URL`);

const settingsRules = [
  body("name").optional().trim().isLength({ min: 2, max: 80 }).withMessage("Name must be 2-80 characters"),
  body("title").optional().trim().isLength({ min: 2, max: 160 }).withMessage("Title must be 2-160 characters"),
  body("email").optional({ checkFalsy: true }).isEmail().withMessage("Email must be valid").normalizeEmail(),
  body("location").optional().trim().isLength({ max: 120 }).withMessage("Location is too long"),
  optionalUrl("githubUrl", "GitHub URL"),
  optionalUrl("linkedinUrl", "LinkedIn URL"),
  optionalUrl("resumeUrl", "Resume URL"),
  body("about").optional().trim().isLength({ max: 3000 }).withMessage("About content is too long")
];

module.exports = { settingsRules };
