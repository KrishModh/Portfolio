const express = require("express");
const {
  createCertificate,
  deleteCertificate,
  listCertificates,
  updateCertificate
} = require("../controllers/certificateController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { certificateRules } = require("../validators/certificateValidators");

const router = express.Router();

router.get("/", listCertificates);
router.post("/", protect, upload.single("image"), certificateRules, validateRequest, createCertificate);
router.put("/:id", protect, upload.single("image"), certificateRules, validateRequest, updateCertificate);
router.delete("/:id", protect, deleteCertificate);

module.exports = router;
