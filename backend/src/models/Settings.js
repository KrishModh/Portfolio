const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "primary", unique: true },
    name: { type: String, default: "Krish", trim: true },
    title: { type: String, default: "Full-Stack Developer | Application Security Engineer", trim: true },
    email: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    githubUrl: { type: String, default: "", trim: true },
    linkedinUrl: { type: String, default: "", trim: true },
    resumeUrl: { type: String, default: "", trim: true },
    availability: {
      freelance: { type: Boolean, default: true },
      internships: { type: Boolean, default: true },
      collaboration: { type: Boolean, default: true }
    },
    heroStats: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true }
      }
    ],
    about: { type: String, default: "", trim: true, maxlength: 3000 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
