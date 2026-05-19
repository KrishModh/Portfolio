const xss = require("xss");
const ContactMessage = require("../models/ContactMessage");
const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");

const createMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.create({
    name: xss(req.body.name),
    email: req.body.email,
    message: xss(req.body.message),
    ipAddress: req.ip,
    userAgent: req.get("user-agent") || "",
    isRead: false,
    read: false
  });
  res.status(201).json({ message: "Message received", id: message._id });
});

const listMessages = asyncHandler(async (req, res) => {
  const filter = req.query.search ? { $text: { $search: req.query.search } } : {};
  const direction = req.query.sort === "asc" ? 1 : -1;
  const [messages, total, unread] = await Promise.all([
    ContactMessage.find(filter).sort({ createdAt: direction }),
    ContactMessage.countDocuments(filter),
    ContactMessage.countDocuments({ ...filter, isRead: { $ne: true }, read: { $ne: true } })
  ]);
  const normalizedMessages = messages.map((message) => {
    const payload = message.toObject();
    payload.isRead = Boolean(payload.isRead || payload.read);
    return payload;
  });

  res.json({
    messages: normalizedMessages,
    counts: {
      total,
      unread,
      read: Math.max(total - unread, 0)
    }
  });
});

const markMessageRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { $set: { isRead: true, read: true } },
    { new: true, runValidators: true }
  );
  if (!message) throw new ApiError(404, "Message not found");

  const payload = message.toObject();
  payload.isRead = true;
  res.json({ message: payload });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) throw new ApiError(404, "Message not found");
  await message.deleteOne();
  res.json({ message: "Message deleted" });
});

module.exports = { createMessage, listMessages, markMessageRead, deleteMessage };
