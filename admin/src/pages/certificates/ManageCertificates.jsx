import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { EmptyState, ErrorState, LoadingState } from "../../components/common/StatusState";
import { adminApi } from "../../services/api";

export default function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);
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
      setCertificates(await adminApi.certificates());
    } catch (requestError) {
      const message = requestError.response?.data?.message || "Could not load certificates.";
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
      await adminApi.deleteCertificate(deleting._id);
      toast.success("Certificate deleted.");
      setDeleting(null);
      load();
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || "Delete failed.");
    }
  };

  const startEdit = (certificate) => {
    setEditing({
      ...certificate,
      issuedAt: certificate.issuedAt ? certificate.issuedAt.slice(0, 10) : ""
    });
    setImage(null);
  };

  const updateField = (event) => setEditing((state) => ({ ...state, [event.target.name]: event.target.value }));

  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = new FormData();
    ["title", "description", "issuer", "issuedAt", "credentialUrl"].forEach((key) => payload.append(key, editing[key] ?? ""));
    if (image) payload.append("image", image);
    try {
      await adminApi.updateCertificate(editing._id, payload);
      toast.success("Certificate updated.");
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
      <PageHeader eyebrow="Certificates" title="Manage certificates" />
      {editing && (
        <form className="admin-form stacked-edit-form" onSubmit={save}>
          <input name="title" value={editing.title} onChange={updateField} required />
          <textarea name="description" value={editing.description} onChange={updateField} required />
          <input name="issuer" value={editing.issuer} onChange={updateField} required />
          <input name="issuedAt" type="date" value={editing.issuedAt} onChange={updateField} required />
          <input name="credentialUrl" value={editing.credentialUrl || ""} onChange={updateField} placeholder="Credential URL (optional)" />
          <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] || null)} />
          <div className="form-actions">
            <button className="neon-button" disabled={saving}>{saving ? "Saving..." : "Save certificate"}</button>
            <button type="button" onClick={() => setEditing(null)} disabled={saving}>Cancel</button>
          </div>
        </form>
      )}
      {loading && <LoadingState label="Loading certificates..." />}
      {!loading && error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && certificates.length === 0 && (
        <EmptyState title="No certificates yet" message="Uploaded certificates will appear here." />
      )}
      {!loading && !error && certificates.length > 0 && (
        <div className="admin-list certificate-admin-list">
          {certificates.map((certificate) => {
            const issued = new Date(certificate.issuedAt);
            return (
          <article className="admin-row" key={certificate._id}>
            {certificate.image?.url ? <img src={certificate.image.url} alt={certificate.title} /> : <div className="admin-image-fallback">No image</div>}
            <div>
              <h3>{certificate.title || "Untitled certificate"}</h3>
              <p>{certificate.issuer || "Unknown issuer"} | {Number.isNaN(issued.getTime()) ? "Unknown date" : issued.toLocaleDateString()}</p>
            </div>
            <div className="row-actions">
              <button onClick={() => startEdit(certificate)}>Edit</button>
              <button onClick={() => setDeleting(certificate)}>Delete</button>
            </div>
          </article>
            );
          })}
        </div>
      )}
      {deleting && (
        <ConfirmDialog
          title="Delete certificate?"
          message={`This will permanently delete "${deleting.title || "this certificate"}" and its uploaded image.`}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        />
      )}
    </>
  );
}
