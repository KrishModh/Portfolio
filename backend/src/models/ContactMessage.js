const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ name: "text", email: "text", message: "text" });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
