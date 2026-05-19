const multer = require("multer");
const { ApiError } = require("../utils/apiError");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new ApiError(400, "Only image uploads are allowed"));
    }
    return callback(null, true);
  }
});

module.exports = { upload };
