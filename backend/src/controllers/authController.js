const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { env } = require("../config/env");
const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");

function signToken(adminId) {
  return jwt.sign({ id: adminId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = signToken(admin._id);
  res.cookie(env.ADMIN_COOKIE_NAME, token, cookieOptions());
  res.json({
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email }
  });
});

const me = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin });
});

const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(env.ADMIN_COOKIE_NAME, cookieOptions());
  res.json({ message: "Logged out" });
});

module.exports = { login, me, logout };
