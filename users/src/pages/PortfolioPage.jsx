import { motion } from "framer-motion";
import PublicLayout from "../layouts/PublicLayout.jsx";
import HomeSection from "../components/home/HomeSection.jsx";
import AboutSection from "../components/about/AboutSection.jsx";
import SkillsSection from "../components/skills/SkillsSection.jsx";
import ProjectsSection from "../components/projects/ProjectsSection.jsx";
import CertificatesSection from "../components/certificates/CertificatesSection.jsx";
import ContactSection from "../components/contact/ContactSection.jsx";

export default function PortfolioPage() {
  return (
    <PublicLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </motion.div>
    </PublicLayout>
  );
}
