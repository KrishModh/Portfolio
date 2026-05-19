import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import SectionHeader from "../common/SectionHeader.jsx";
import Modal from "../common/Modal.jsx";
import { usePortfolio } from "../../context/PortfolioContext";
import { fadeUp, stagger } from "../../animations/variants";
import { applyTilt, resetTilt } from "../../utils/tilt";
import "../../styles/certificates/certificates.css";

export default function CertificatesSection() {
  const { certificates, loading } = usePortfolio();
  const [active, setActive] = useState(null);
  const visibleCertificates = Array.isArray(certificates) ? certificates.filter(Boolean) : [];

  return (
    <section id="certificates" className="section-shell">
      <SectionHeader eyebrow="Certificates" title="Proof signals and learning milestones" />
      {loading && <div className="skeleton-grid"><span /><span /><span /></div>}
      {!loading && visibleCertificates.length === 0 && <p className="empty-state">No certificates published yet.</p>}
      {!loading && visibleCertificates.length > 0 && (
        <motion.div className="certificate-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {visibleCertificates.map((certificate, index) => (
          <motion.article
            className="certificate-card tilt-card"
            key={certificate._id || `${certificate.title}-${index}`}
            variants={fadeUp}
            onMouseMove={applyTilt}
            onMouseLeave={resetTilt}
          >
            <button onClick={() => setActive(certificate)} className="certificate-image" aria-label={`Open ${certificate.title}`}>
              {certificate.image?.url ? (
                <img src={certificate.image.url} alt={certificate.title || "Certificate preview"} loading="lazy" />
              ) : (
                <span className="project-image-fallback">Certificate preview</span>
              )}
            </button>
            <h3>{certificate.title || "Untitled certificate"}</h3>
            <p>{certificate.issuer || "Unknown issuer"}</p>
            <time>{certificate.issuedAt ? new Date(certificate.issuedAt).toLocaleDateString() : "Date pending"}</time>
            {certificate.credentialUrl && (
              <a href={certificate.credentialUrl} target="_blank" rel="noreferrer">
                Credential <ExternalLink size={15} />
              </a>
            )}
          </motion.article>
        ))}
        </motion.div>
      )}
      <AnimatePresence>
        {active && <Modal item={active} type="Certificate" onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
