import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { useState } from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import Modal from "../common/Modal.jsx";
import { usePortfolio } from "../../context/PortfolioContext";
import { fadeUp, stagger } from "../../animations/variants";
import { applyTilt, resetTilt } from "../../utils/tilt";
import "../../styles/projects/projects.css";

export default function ProjectsSection() {
  const { projects, loading } = usePortfolio();
  const [active, setActive] = useState(null);
  const visibleProjects = Array.isArray(projects) ? projects.filter(Boolean) : [];

  return (
    <section id="projects" className="section-shell">
      <SectionHeader eyebrow="Projects" title="Dynamic workbench of shipped ideas">
        {/* Projects are managed from the admin dashboard and rendered from the backend. */}
      </SectionHeader>
      {loading && <div className="skeleton-grid"><span /><span /><span /></div>}
      {!loading && visibleProjects.length === 0 && <p className="empty-state">No projects published yet.</p>}
      {!loading && visibleProjects.length > 0 && (
        <motion.div className="project-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {visibleProjects.map((project, index) => (
          <motion.article
            className="project-card tilt-card"
            key={project._id || `${project.title}-${index}`}
            variants={fadeUp}
            onMouseMove={applyTilt}
            onMouseLeave={resetTilt}
          >
            <button onClick={() => setActive(project)} className="project-image" aria-label={`Open ${project.title}`}>
              {project.image?.url ? (
                <img src={project.image.url} alt={project.title || "Project preview"} loading="lazy" />
              ) : (
                <span className="project-image-fallback">Project preview</span>
              )}
              {project.featured && <span className="featured-badge"><Star size={14} /> Featured</span>}
            </button>
            <div className="project-card-body">
              <h3>{project.title || "Untitled project"}</h3>
              <p>{project.description || "Details are being updated."}</p>
              {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                <div className="tag-row">
                  {project.techStack.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
              )}
              <div className="card-actions">
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={17} /> Code</a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><ExternalLink size={17} /> Live</a>}
              </div>
            </div>
          </motion.article>
        ))}
        </motion.div>
      )}
      <AnimatePresence>
        {active && <Modal item={active} type="Project" onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
