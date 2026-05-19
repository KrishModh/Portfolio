import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import ThemeToggle from "../common/ThemeToggle";
import "../../styles/navbar/navbar.css";

const links = ["home", "about", "skills", "projects", "certificates", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { settings } = usePortfolio();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      const current = links.find((link) => {
        const element = document.getElementById(link);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });
      if (current) setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", open);
    return () => document.body.classList.remove("nav-menu-open");
  }, [open]);

  return (
    <motion.header className={`nav-shell${scrolled ? " nav-shell-scrolled" : ""}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <a className="brand-mark" href="#home" aria-label="Home">
        <span>K</span>
      </a>
      <nav className="nav-links">
        {links.map((link) => (
          <a key={link} className={active === link ? "active" : ""} href={`#${link}`}>
            {link}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <ThemeToggle />
        {settings.githubUrl && (
          <a className="icon-button" href={settings.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
        )}
        {settings.linkedinUrl && (
          <a className="icon-button" href={settings.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        )}
        <button className="icon-button menu-button" onClick={() => setOpen((value) => !value)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              className="mobile-nav-backdrop"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
            >
              {links.map((link) => (
                <a key={link} className={active === link ? "active" : ""} href={`#${link}`} onClick={() => setOpen(false)}>
                  {link}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
