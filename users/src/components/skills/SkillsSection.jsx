import { motion } from "framer-motion";
import SectionHeader from "../common/SectionHeader.jsx";
import { fadeUp, stagger } from "../../animations/variants";
import { skillGroups } from "../../utils/skills";
import { applyTilt, resetTilt } from "../../utils/tilt";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeader eyebrow="Skills" title="A stack built for product velocity and secure delivery" />
      <motion.div className="skill-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {skillGroups.map((group) => (
          <motion.article
            className="skill-card tilt-card"
            key={group.title}
            variants={fadeUp}
            onMouseMove={applyTilt}
            onMouseLeave={resetTilt}
          >
            <h3>{group.title}</h3>
            <div>
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
