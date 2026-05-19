import { useEffect, useState } from "react";
import { Award, FolderKanban, Mail, Settings } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import { LoadingState } from "../../components/common/StatusState";
import { adminApi } from "../../services/api";
import { applyTilt, resetTilt } from "../../utils/tilt";

export default function Dashboard() {
  const [data, setData] = useState({ projects: [], certificates: [], messages: [], settings: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.dashboard()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Projects", value: data.projects.length, icon: FolderKanban },
    { label: "Certificates", value: data.certificates.length, icon: Award },
    { label: "Messages", value: data.messages.length, icon: Mail },
    { label: "Profile", value: data.settings?.name || "Ready", icon: Settings }
  ];

  return (
    <>
      <PageHeader eyebrow="Overview" title="Mission control">
        Manage every public signal from one protected dashboard.
      </PageHeader>
      {loading && <LoadingState label="Loading dashboard overview..." />}
      {!loading && <div className="metric-grid">
        {cards.map(({ label, value, icon: Icon }) => (
          <article className="metric-card tilt-card" key={label} onMouseMove={applyTilt} onMouseLeave={resetTilt}>
            <Icon />
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>}
    </>
  );
}
