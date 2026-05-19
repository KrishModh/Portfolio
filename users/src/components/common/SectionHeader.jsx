import { motion } from "framer-motion";
import { fadeUp } from "../../animations/variants";

export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <motion.div
      className="section-header"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-copy">{children}</p>}
    </motion.div>
  );
}
