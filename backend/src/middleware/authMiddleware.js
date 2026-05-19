const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
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
  const admin = await Admin.findById(decoded.id).select("-password");
  if (!admin || !admin.isActive) throw new ApiError(401, "Invalid admin session");

  req.admin = admin;
  next();
});

module.exports = { protect };
