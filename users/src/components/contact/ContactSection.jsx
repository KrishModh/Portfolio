import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, Send } from "lucide-react";
import SectionHeader from "../common/SectionHeader.jsx";
import { portfolioApi } from "../../services/api";
import { usePortfolio } from "../../context/PortfolioContext";
import { fadeUp } from "../../animations/variants";
import "../../styles/contact/contact.css";

export default function ContactSection() {
  const { settings } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (event) => setForm((value) => ({ ...value, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await portfolioApi.sendMessage(form);
      toast.success("Message sent securely.");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Message could not be sent.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell">
      <SectionHeader eyebrow="Contact" title="Let’s build something resilient" />
      <motion.div className="contact-grid" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <aside className="glass-panel contact-aside">
          <Mail className="contact-icon" size={30} />
          <h3>Freelance, internships, AppSec collaboration</h3>
          <p>Open to product builds, secure code reviews, web/API security work, and ambitious engineering teams.</p>
          {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
        </aside>
        <form className="contact-form" onSubmit={submit}>
          <input name="company" value={form.company} onChange={update} className="honeypot-field" tabIndex="-1" autoComplete="off" />
          <input name="name" value={form.name} onChange={update} placeholder="Name" minLength="2" required />
          <input name="email" value={form.email} onChange={update} placeholder="Email" type="email" required />
          <textarea name="message" value={form.message} onChange={update} placeholder="Message" minLength="10" required />
          <button className="neon-button" disabled={submitting}>
            <Send size={18} /> {submitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
