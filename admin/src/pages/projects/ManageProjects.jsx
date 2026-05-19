import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { EmptyState, ErrorState, LoadingState } from "../../components/common/StatusState";
import { adminApi } from "../../services/api";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setProjects(await adminApi.projects());
    } catch (requestError) {
      const message = requestError.response?.data?.message || "Could not load projects.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async () => {
    if (!deleting) return;
    try {
      await adminApi.deleteProject(deleting._id);
      toast.success("Project deleted.");
      setDeleting(null);
      load();
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || "Delete failed.");
    }
  };

  const startEdit = (project) => {
    setEditing({
      ...project,
      techStack: project.techStack?.join(", ") || ""
    });
    setImage(null);
  };

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setEditing((state) => ({ ...state, [name]: type === "checkbox" ? checked : value }));
  };

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = new FormData();
    ["title", "description", "techStack", "githubUrl", "liveUrl", "featured"].forEach((key) => {
      payload.append(key, editing[key] ?? "");
    });
    if (image) payload.append("image", image);
    try {
      await adminApi.updateProject(editing._id, payload);
      toast.success("Project updated.");
      setEditing(null);
      load();
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Projects" title="Manage projects" />
      {editing && (
        <form className="admin-form stacked-edit-form" onSubmit={save}>
          <input name="title" value={editing.title} onChange={updateField} required />
          <textarea name="description" value={editing.description} onChange={updateField} required />
          <input name="techStack" value={editing.techStack} onChange={updateField} />
          <input name="githubUrl" value={editing.githubUrl || ""} onChange={updateField} placeholder="GitHub URL (optional)" />
          <input name="liveUrl" value={editing.liveUrl || ""} onChange={updateField} placeholder="Live URL (optional)" />
          <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] || null)} />
          {/* <label className="toggle-row">
            <input type="checkbox" name="featured" checked={Boolean(editing.featured)} onChange={updateField} />
            Featured project
          </label> */}
          <div className="form-actions">
            <button className="neon-button" disabled={saving}>{saving ? "Saving..." : "Save project"}</button>
            <button type="button" onClick={() => setEditing(null)} disabled={saving}>Cancel</button>
          </div>
        </form>
      )}
      {loading && <LoadingState label="Loading projects..." />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && projects.length === 0 && (
        <EmptyState title="No projects yet" message="Uploaded projects will appear here for editing and deletion." />
      )}
      {!loading && !error && projects.length > 0 && (
        <div className="admin-list project-admin-list">
          {projects.map((project) => (
          <article className="admin-row" key={project._id}>
            {project.image?.url ? <img src={project.image.url} alt={project.title} /> : <div className="admin-image-fallback">No image</div>}
            <div>
              <h3>{project.title || "Untitled project"}</h3>
              <p>{project.description || "No description."}</p>
            </div>
            <div className="row-actions">
              <button onClick={() => startEdit(project)}>Edit</button>
              <button onClick={() => setDeleting(project)}>Delete</button>
            </div>
          </article>
          ))}
        </div>
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete project?"
          message={`This will permanently delete "${deleting.title || "this project"}" and its uploaded image.`}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </>
  );
}
