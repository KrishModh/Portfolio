import { usePortfolio } from "../../context/PortfolioContext";

export default function Footer() {
  const { settings } = usePortfolio();
  return (
    <footer className="footer-shell">
      <p>{settings.name} | Full-stack engineering with security depth.</p>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
}
