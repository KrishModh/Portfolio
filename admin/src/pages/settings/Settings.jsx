import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/common/PageHeader";
import { adminApi } from "../../services/api";

export default function Settings() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    location: "",
    githubUrl: "",
    linkedinUrl: "",
    resumeUrl: "",
    about: ""
  });

  useEffect(() => {
    adminApi.settings().then((settings) => setForm((state) => ({ ...state, ...settings })));
  }, []);

  const update = (event) => setForm((state) => ({ ...state, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    try {
      const saved = await adminApi.updateSettings(form);
      setForm((state) => ({ ...state, ...saved }));
      toast.success("Settings saved.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Settings could not be saved.");
    }
  };

  return (
    <>
      <PageHeader eyebrow="Settings" title="Public profile controls" />
      <form className="admin-form settings-form" onSubmit={submit}>
        <input name="name" value={form.name || ""} onChange={update} placeholder="Name" />
        <input name="title" value={form.title || ""} onChange={update} placeholder="Professional title" />
        <input name="email" value={form.email || ""} onChange={update} placeholder="Email" />
        <input name="location" value={form.location || ""} onChange={update} placeholder="Location" />
        <input name="githubUrl" value={form.githubUrl || ""} onChange={update} placeholder="GitHub URL" />
        <input name="linkedinUrl" value={form.linkedinUrl || ""} onChange={update} placeholder="LinkedIn URL" />
        <input name="resumeUrl" value={form.resumeUrl || ""} onChange={update} placeholder="Resume URL" />
        <textarea name="about" value={form.about || ""} onChange={update} placeholder="About content" />
        <button className="neon-button">Save settings</button>
      </form>
    </>
  );
}
