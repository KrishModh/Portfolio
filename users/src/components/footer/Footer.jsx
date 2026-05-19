import { Github, Linkedin, Mail } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

export default function Footer() {
  const { settings } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <div className="footer-topline" />
      <div className="footer-brand">
        <a href="#home" className="footer-name">{settings.name}</a>
        <p>{settings.title || "Full-stack engineering with security depth."}</p>
        {settings.email && <a className="footer-email" href={`mailto:${settings.email}`}>{settings.email}</a>}
      </div>

      <nav className="footer-nav" aria-label="Footer navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </nav>

      <div className="footer-socials" aria-label="Social links">
        {settings.githubUrl && (
          <a href={settings.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
        )}
        {settings.linkedinUrl && (
          <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        )}
        {settings.email && (
          <a href={`mailto:${settings.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
        )}
      </div>

      <p className="footer-copy">&copy; {year} {settings.name}. All rights reserved.</p>
    </footer>
  );
}
