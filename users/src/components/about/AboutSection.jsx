import { motion } from "framer-motion";
import { Binary, BriefcaseBusiness, Handshake, Shield } from "lucide-react";
import SectionHeader from "../common/SectionHeader.jsx";
import { usePortfolio } from "../../context/PortfolioContext";
import { fadeUp, stagger } from "../../animations/variants";
import "../../styles/about/about.css";

const principles = [
  { icon: Binary, title: "Build", text: "Designing scalable web architectures, robust server-side systems, and optimized database layouts from scratch." },
  { icon: Shield, title: "Break", text: "Adopting an offensive mindset to conduct deep threat modeling, expose authentication flaws, and uncover logical vulnerabilities." },
  { icon: BriefcaseBusiness, title: "Fix", text: "Translating vulnerability findings into secure code, implementing strict server-side validation, and hardening systemic defenses." },
  { icon: Handshake, title: "Improve", text: "Optimizing end-to-end application performance, streamlining secure deployment lifecycles, and adapting to modern engineering standards." }
];

export default function AboutSection() {
  const { settings } = usePortfolio();
  return (
    <section id="about" className="section-shell">
      <SectionHeader eyebrow="About" title="Developer energy with an attacker-aware edge">
        Available for freelance projects, AppSec roles, and high-impact engineering collaborations.      </SectionHeader>
      <div className="about-grid">
        <motion.article className="glass-panel about-story" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p>{settings.about}</p>
          <p>
            {/* The core philosophy is simple: every feature deserves both a builder’s care and a breaker’s skepticism.
            That mindset keeps interfaces polished, APIs disciplined, and user data treated with respect. */}

            I build, analyze, break, and secure software with a security-first mindset. My work bridges the gap between scalable full-stack engineering and offensive application security—ensuring digital products are not just high-performing, but inherently resilient against modern threats.
            </p>
            <p>
            The core philosophy is simple: every system deserves both a builder’s care and a breaker’s skepticism. That mindset keeps user interfaces polished, core APIs disciplined, and critical data completely hardened.

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
