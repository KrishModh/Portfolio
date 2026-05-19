const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { env } = require("../config/env");

const protect = asyncHandler(async (req, _res, next) => {
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;
  const token = bearer || req.cookies?.[env.ADMIN_COOKIE_NAME];

  if (!token) throw new ApiError(401, "Authentication required");

  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (decoded.sub !== "admin" || decoded.username !== env.ADMIN_USERNAME) {
    throw new ApiError(401, "Invalid admin session");
  }

  req.admin = {
    id: "env-admin",
    name: env.ADMIN_USERNAME,
    username: env.ADMIN_USERNAME
  };
  next();
});

module.exports = { protect };
