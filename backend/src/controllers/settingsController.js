const Settings = require("../models/Settings");
const { asyncHandler } = require("../utils/asyncHandler");

const defaultSettings = {
  key: "primary",
  name: "Krish",
  title: "Full-Stack Developer | Application Security Engineer",
  about:
    "I build, analyze, break, fix, and improve software with a security-first mindset. My work combines full-stack engineering with web and API security, secure coding discipline, and a practical attacker-aware development approach.",
  availability: { freelance: true, internships: true, collaboration: true },
  heroStats: [
    { label: "Build mindset", value: "Full-stack" },
    { label: "Security focus", value: "AppSec" },
    { label: "Method", value: "Break/Fix" }
  ]
};

async function getOrCreateSettings() {
  return Settings.findOneAndUpdate(
    { key: "primary" },
    { $setOnInsert: defaultSettings },
    { upsert: true, new: true }
  );
}

const getSettings = asyncHandler(async (_req, res) => {
  const settings = await getOrCreateSettings();
  res.json({ settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  const allowed = ["name", "title", "email", "location", "githubUrl", "linkedinUrl", "resumeUrl", "about", "availability", "heroStats"];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) settings[key] = req.body[key];
  });
  await settings.save();
  res.json({ settings });
});

module.exports = { getSettings, updateSettings };
