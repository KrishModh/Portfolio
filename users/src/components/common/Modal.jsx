import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function Modal({ item, onClose, type }) {
  if (!item) return null;
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.article
        className="modal-card"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
      >
        <button className="icon-button modal-close-button" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>
        <img src={item.image?.url} alt={item.title} className="modal-image" />
        <p className="eyebrow">{type}</p>
        <h3 className="modal-title">{item.title}</h3>
        <p className="modal-description">{item.description}</p>
      </motion.article>
    </motion.div>
  );
}
