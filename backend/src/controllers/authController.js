const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");

function signToken(username) {
  return jwt.sign({ sub: "admin", username }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

function safeCompare(value, expected) {
  const valueHash = crypto.createHash("sha256").update(String(value || "")).digest();
  const expectedHash = crypto.createHash("sha256").update(String(expected || "")).digest();
  return crypto.timingSafeEqual(valueHash, expectedHash);
}

function adminPayload() {
  return {
    id: "env-admin",
    name: env.ADMIN_USERNAME,
    username: env.ADMIN_USERNAME
  };
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
  const { username, password } = req.body;

  if (!safeCompare(username, env.ADMIN_USERNAME) || !safeCompare(password, env.ADMIN_PASSWORD)) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = signToken(env.ADMIN_USERNAME);
  res.cookie(env.ADMIN_COOKIE_NAME, token, cookieOptions());
  res.json({
    token,
    admin: adminPayload()
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
