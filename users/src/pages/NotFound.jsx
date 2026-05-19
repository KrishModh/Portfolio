import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="glass-panel not-found-card">
        <p className="eyebrow">404</p>
        <h1>Signal lost</h1>
        <Link className="neon-button not-found-link" to="/">
          Return home
        </Link>
      </div>
    </div>
  );
}
