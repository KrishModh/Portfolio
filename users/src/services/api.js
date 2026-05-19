import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is required");
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

export const portfolioApi = {
  async getSettings() {
    const { data } = await api.get("/settings");
    return data.settings;
  },
  async getProjects() {
    const { data } = await api.get("/projects");
    return Array.isArray(data.projects) ? data.projects : [];
  },
  async getCertificates() {
    const { data } = await api.get("/certificates");
    return Array.isArray(data.certificates) ? data.certificates : [];
  },
  async sendMessage(payload) {
    const { data } = await api.post("/contact", payload);
    return data;
  }
};
