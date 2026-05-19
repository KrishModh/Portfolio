const { validationResult } = require("express-validator");
const { ApiError } = require("../utils/apiError");

function validateRequest(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg).join(", ");
    throw new ApiError(422, message);
  }
  next();
}

module.exports = { validateRequest };
