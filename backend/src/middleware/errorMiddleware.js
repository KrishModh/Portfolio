const { env } = require("../config/env");

function notFoundHandler(req, _res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, _req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";

  if (err.name === "MulterError") {
    statusCode = 400;
    message = err.code === "LIMIT_FILE_SIZE" ? "Image must be 4MB or smaller" : err.message;
  }

  res.status(statusCode).json({
    message,
    stack: env.NODE_ENV === "production" ? undefined : err.stack
  });
}

module.exports = { notFoundHandler, errorHandler };
