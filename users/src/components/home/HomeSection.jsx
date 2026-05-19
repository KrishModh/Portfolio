import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, ShieldCheck, Sparkles } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { fadeUp, stagger } from "../../animations/variants";
import "../../styles/home/home.css";

const tech = ["React", "Node", "MongoDB", "JWT", "API", "AppSec", "Cloud"];

export default function HomeSection() {
  const { settings } = usePortfolio();

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid" />
      <div className="hero-aura hero-aura-one" />
      <div className="hero-aura hero-aura-two" />
      <motion.div className="hero-content" variants={stagger} initial="hidden" animate="visible">
        <motion.p className="eyebrow hero-eyebrow" variants={fadeUp}>
          <Sparkles size={16} /> Modern full-stack engineering
        </motion.p>
        <motion.h1 className="hero-title" variants={fadeUp}>
          {settings.name}
        </motion.h1>
        <motion.div className="typing-line" variants={fadeUp}>
          <span>Full-Stack Developer</span>
          <span>Application Security Engineer</span>
        </motion.div>
        <motion.p className="hero-copy" variants={fadeUp}>
          I build scalable, high-performance web applications engineered with a security-first mindset. From pixel-perfect interfaces to bulletproof backend architecture, I deliver code that breaks-by-design but stands-by-delivery.        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a className="neon-button" href="#projects">
            View work <ArrowDown size={18} />
          </a>
          {settings.resumeUrl && (
            <a className="ghost-button resume-download-button" href={settings.resumeUrl} target="_blank" rel="noreferrer">
              <Download size={18} /> Download Resume
            </a>
          )}
          {settings.githubUrl && (
            <a className="ghost-button" href={settings.githubUrl} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
          )}
          {settings.linkedinUrl && (
            <a className="ghost-button" href={settings.linkedinUrl} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
          )}
        </motion.div>
        <motion.div className="stat-strip" variants={stagger}>
          {settings.heroStats?.map((stat) => (
            <motion.div className="stat-card" key={`${stat.label}-${stat.value}`} variants={fadeUp}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="orbit-panel" animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        <ShieldCheck className="security-icon" size={42} />
        <p>Secure-by-design product engineering</p>
        <div className="tech-orbit">
          {tech.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
