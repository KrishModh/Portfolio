const Certificate = require("../models/Certificate");
const { ApiError } = require("../utils/apiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { deleteFromCloudinary, uploadToCloudinary } = require("../utils/uploadToCloudinary");

function cleanOptionalUrl(value) {
  return typeof value === "string" ? value.trim() : "";
}

const listCertificates = asyncHandler(async (req, res) => {
  const query = req.query.search ? { $text: { $search: req.query.search } } : {};
  const certificates = await Certificate.find(query).sort({ issuedAt: -1 });
  res.json({ certificates });
});

const createCertificate = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Certificate image is required");
  const uploaded = await uploadToCloudinary(req.file.buffer, "certificates");
  const certificate = await Certificate.create({
    title: req.body.title,
    description: req.body.description,
    issuer: req.body.issuer,
    issuedAt: req.body.issuedAt,
    credentialUrl: cleanOptionalUrl(req.body.credentialUrl),
    image: { url: uploaded.secure_url, publicId: uploaded.public_id }
  });
  res.status(201).json({ certificate });
});

const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) throw new ApiError(404, "Certificate not found");

  if (req.file) {
    await deleteFromCloudinary(certificate.image?.publicId);
    const uploaded = await uploadToCloudinary(req.file.buffer, "certificates");
    certificate.image = { url: uploaded.secure_url, publicId: uploaded.public_id };
  }

  certificate.title = req.body.title ?? certificate.title;
  certificate.description = req.body.description ?? certificate.description;
  certificate.issuer = req.body.issuer ?? certificate.issuer;
  certificate.issuedAt = req.body.issuedAt ?? certificate.issuedAt;
  certificate.credentialUrl = req.body.credentialUrl === undefined ? certificate.credentialUrl : cleanOptionalUrl(req.body.credentialUrl);
  await certificate.save();
  res.json({ certificate });
});

const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) throw new ApiError(404, "Certificate not found");
  await deleteFromCloudinary(certificate.image?.publicId);
  await certificate.deleteOne();
  res.json({ message: "Certificate deleted" });
});

module.exports = { listCertificates, createCertificate, updateCertificate, deleteCertificate };
