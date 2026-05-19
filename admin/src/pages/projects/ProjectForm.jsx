import { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/common/PageHeader";
import ImagePicker from "../../components/common/ImagePicker";
import { adminApi } from "../../services/api";

export default function ProjectForm() {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    featured: false
  });

  const update = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((state) => ({ ...state, [name]: type === "checkbox" ? checked : value }));
  };

  const pickImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please choose a project image.");
      return;
    }
    setLoading(true);
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (image) payload.append("image", image);
    try {
      await adminApi.createProject(payload);
      toast.success("Project uploaded.");
      setForm({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", featured: false });
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
      <PageHeader eyebrow="Projects" title="Upload project" />
      <form className="admin-form project-admin-form" onSubmit={submit}>
        <ImagePicker preview={preview} onChange={pickImage} label="Project image preview" />
        <input name="title" value={form.title} onChange={update} placeholder="Project title" required />
        <textarea name="description" value={form.description} onChange={update} placeholder="Description" required />
        <input name="techStack" value={form.techStack} onChange={update} placeholder="Tech stack, comma separated" />
        <input name="githubUrl" value={form.githubUrl} onChange={update} placeholder="GitHub URL (optional)" />
        <input name="liveUrl" value={form.liveUrl} onChange={update} placeholder="Live preview URL (optional)" />
        {/* <label className="toggle-row">
          <input type="checkbox" name="featured" checked={form.featured} onChange={update} />
          Featured project
        </label> */}
        <button className="neon-button" disabled={loading}>{loading ? "Uploading..." : "Upload project"}</button>
      </form>
    </>
  );
}
