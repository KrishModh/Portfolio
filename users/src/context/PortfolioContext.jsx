import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { portfolioApi } from "../services/api";

const PortfolioContext = createContext(null);

const fallbackSettings = {
  name: "Krish",
  title: "Full-Stack Developer | Application Security Engineer",
  githubUrl: "",
  linkedinUrl: "",
  resumeUrl: "",
  email: "",
  about:
    "I build, analyze, break, fix, and improve software with a security-first mindset, combining full-stack engineering with web and API security.",
  heroStats: [
    { label: "Engineering", value: "Full-stack" },
    { label: "Security", value: "AppSec" },
    { label: "Method", value: "Build/Break/Fix" }
  ],
  availability: { freelance: true, internships: true, collaboration: true }
};

export function PortfolioProvider({ children }) {
  const [settings, setSettings] = useState(fallbackSettings);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    Promise.allSettled([
      portfolioApi.getSettings(),
      portfolioApi.getProjects(),
      portfolioApi.getCertificates()
    ]).then(([settingsResult, projectResult, certificateResult]) => {
      if (!mounted) return;
      if (settingsResult.status === "fulfilled") setSettings({ ...fallbackSettings, ...(settingsResult.value || {}) });
      if (projectResult.status === "fulfilled") setProjects(Array.isArray(projectResult.value) ? projectResult.value : []);
      if (certificateResult.status === "fulfilled") setCertificates(Array.isArray(certificateResult.value) ? certificateResult.value : []);
      if ([settingsResult, projectResult, certificateResult].some((result) => result.status === "rejected")) {
        setError("Some live content could not be loaded.");
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({ settings, projects, certificates, loading, error }),
    [settings, projects, certificates, loading, error]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return context;
}
