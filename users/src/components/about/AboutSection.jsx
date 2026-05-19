import { motion } from "framer-motion";
import { Binary, BriefcaseBusiness, Handshake, Shield } from "lucide-react";
import SectionHeader from "../common/SectionHeader.jsx";
import { usePortfolio } from "../../context/PortfolioContext";
import { fadeUp, stagger } from "../../animations/variants";
import "../../styles/about/about.css";

const principles = [
  { icon: Binary, title: "Build", text: "Create scalable products with clean React, Node, API, and database architecture." },
  { icon: Shield, title: "Break", text: "Think like an attacker to expose weak inputs, auth flaws, and risky assumptions." },
  { icon: BriefcaseBusiness, title: "Fix", text: "Turn findings into secure code, validation, hardening, and maintainable patterns." },
  { icon: Handshake, title: "Improve", text: "Iterate with real-world feedback, practical learning, and business context." }
];

export default function AboutSection() {
  const { settings } = usePortfolio();
  return (
    <section id="about" className="section-shell">
      <SectionHeader eyebrow="About" title="Developer energy with an attacker-aware edge">
        Open for freelance work, AppSec internships, and collaboration opportunities.
      </SectionHeader>
      <div className="about-grid">
        <motion.article className="glass-panel about-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p>{settings.about}</p>
          <p>
            The core philosophy is simple: every feature deserves both a builder’s care and a breaker’s skepticism.
            That mindset keeps interfaces polished, APIs disciplined, and user data treated with respect.
          </p>
        </motion.article>
        <motion.div className="principle-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {principles.map(({ icon: Icon, title, text }) => (
            <motion.div className="principle-card" key={title} variants={fadeUp}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
