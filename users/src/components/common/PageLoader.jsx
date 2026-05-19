import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), 850);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="page-loader" aria-label="Loading portfolio">
      <div className="loader-core" />
      <p>Initializing interface</p>
    </div>
  );
}
