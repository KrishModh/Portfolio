const Project = require("../models/Project");
const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { deleteFromCloudinary, uploadToCloudinary } = require("../utils/uploadToCloudinary");

function parseBoolean(value) {
  return value === true || value === "true" || value === "on" || value === "1";
}

function cleanOptionalUrl(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTechStack(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const listProjects = asyncHandler(async (req, res) => {
  const query = req.query.search ? { $text: { $search: req.query.search } } : {};
  const projects = await Project.find(query).sort({ featured: -1, createdAt: -1 });
  res.json({ projects });
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  res.json({ project });
});

const createProject = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Project image is required");
  const uploaded = await uploadToCloudinary(req.file.buffer, "projects");
  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    techStack: normalizeTechStack(req.body.techStack),
    githubUrl: cleanOptionalUrl(req.body.githubUrl),
    liveUrl: cleanOptionalUrl(req.body.liveUrl),
    featured: parseBoolean(req.body.featured),
    image: { url: uploaded.secure_url, publicId: uploaded.public_id }
  });
  res.status(201).json({ project });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  if (req.file) {
    await deleteFromCloudinary(project.image?.publicId);
    const uploaded = await uploadToCloudinary(req.file.buffer, "projects");
    project.image = { url: uploaded.secure_url, publicId: uploaded.public_id };
  }

  project.title = req.body.title ?? project.title;
  project.description = req.body.description ?? project.description;
  project.techStack = req.body.techStack === undefined ? project.techStack : normalizeTechStack(req.body.techStack);
  project.githubUrl = req.body.githubUrl === undefined ? project.githubUrl : cleanOptionalUrl(req.body.githubUrl);
  project.liveUrl = req.body.liveUrl === undefined ? project.liveUrl : cleanOptionalUrl(req.body.liveUrl);
  project.featured = req.body.featured === undefined ? project.featured : parseBoolean(req.body.featured);
  await project.save();
  res.json({ project });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  await deleteFromCloudinary(project.image?.publicId);
  await project.deleteOne();
  res.json({ message: "Project deleted" });
});

module.exports = { listProjects, getProject, createProject, updateProject, deleteProject };
