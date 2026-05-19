const { body } = require("express-validator");

const certificateRules = [
  body("title").trim().isLength({ min: 2, max: 140 }).withMessage("Certificate title must be 2-140 characters"),
  body("description").trim().isLength({ min: 10, max: 900 }).withMessage("Certificate description must be 10-900 characters"),
  body("issuer").trim().isLength({ min: 2, max: 100 }).withMessage("Issuer must be 2-100 characters"),
  body("issuedAt").isISO8601().withMessage("Certificate date is required"),
  body("credentialUrl").trim().optional({ checkFalsy: true }).isURL({ require_protocol: true }).withMessage("Credential URL must be valid")
];

module.exports = { certificateRules };
