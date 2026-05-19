const express = require("express");
const {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { validateRequest } = require("../middleware/validateRequest");
const { projectRules } = require("../validators/projectValidators");

const router = express.Router();

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", protect, upload.single("image"), projectRules, validateRequest, createProject);
router.put("/:id", protect, upload.single("image"), projectRules, validateRequest, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
