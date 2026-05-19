import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/common/PageHeader";
import ImagePicker from "../../components/common/ImagePicker";
import { adminApi } from "../../services/api";

export default function CertificateForm() {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", issuer: "", issuedAt: "", credentialUrl: "" });

  const update = (event) => setForm((state) => ({ ...state, [event.target.name]: event.target.value }));
  const pickImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please choose a certificate image.");
      return;
    }
    setLoading(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (image) payload.append("image", image);
    try {
      await adminApi.createCertificate(payload);
      toast.success("Certificate uploaded.");
      setForm({ title: "", description: "", issuer: "", issuedAt: "", credentialUrl: "" });
      setImage(null);
      setPreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Certificates" title="Upload certificate" />
      <form className="admin-form certificate-admin-form" onSubmit={submit}>
        <ImagePicker preview={preview} onChange={pickImage} label="Certificate image preview" />
        <input name="title" value={form.title} onChange={update} placeholder="Certificate title" required />
        <textarea name="description" value={form.description} onChange={update} placeholder="Description" required />
        <input name="issuer" value={form.issuer} onChange={update} placeholder="Issuer" required />
        <input name="issuedAt" value={form.issuedAt} onChange={update} type="date" required />
        <input name="credentialUrl" value={form.credentialUrl} onChange={update} placeholder="Credential URL (optional)" />
        <button className="neon-button" disabled={loading}>{loading ? "Uploading..." : "Upload certificate"}</button>
      </form>
    </>
  );
}
