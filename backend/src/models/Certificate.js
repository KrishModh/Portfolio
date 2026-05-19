const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  { _id: false }
);

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, required: true, trim: true, maxlength: 900 },
    issuer: { type: String, required: true, trim: true, maxlength: 100 },
    issuedAt: { type: Date, required: true },
    credentialUrl: { type: String, trim: true, default: "" },
    image: imageSchema
  },
  { timestamps: true }
);

certificateSchema.index({ issuedAt: -1 });
certificateSchema.index({ title: "text", issuer: "text", description: "text" });

module.exports = mongoose.model("Certificate", certificateSchema);
