const { body } = require("express-validator");

const projectRules = [
  body("title").trim().isLength({ min: 2, max: 120 }).withMessage("Project title must be 2-120 characters"),
  body("description").trim().isLength({ min: 8, max: 1200 }).withMessage("Project description must be 8-1200 characters"),
  body("techStack").customSanitizer((value) => {
    if (Array.isArray(value)) return value;
    return String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }),
  body("githubUrl").trim().optional({ checkFalsy: true }).isURL({ require_protocol: true }).withMessage("GitHub URL must be valid"),
  body("liveUrl").trim().optional({ checkFalsy: true }).isURL({ require_protocol: true }).withMessage("Live URL must be valid"),
  body("featured").optional().toBoolean().isBoolean().withMessage("Featured must be a boolean")
];

module.exports = { projectRules };
