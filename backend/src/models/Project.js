const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    techStack: [{ type: String, trim: true, maxlength: 40 }],
    image: imageSchema,
    githubUrl: { type: String, trim: true, default: "" },
    liveUrl: { type: String, trim: true, default: "" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

projectSchema.index({ featured: -1, createdAt: -1 });
projectSchema.index({ title: "text", description: "text", techStack: "text" });

module.exports = mongoose.model("Project", projectSchema);
