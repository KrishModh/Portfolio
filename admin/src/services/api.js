import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) throw new Error("VITE_API_BASE_URL is required");

export const api = axios.create({ baseURL, withCredentials: true });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
    }
    return Promise.reject(error);
  }
);

const arrayFrom = (value) => (Array.isArray(value) ? value : []);
const projectArray = (res) => arrayFrom(res.data?.projects);
const certificateArray = (res) => arrayFrom(res.data?.certificates);
const messageData = (res) => ({
  messages: arrayFrom(res.data?.messages),
  counts: res.data?.counts || { total: 0, unread: 0, read: 0 }
});

export const adminApi = {
  login: (payload) => api.post("/auth/login", payload).then((res) => res.data),
  me: () => api.get("/auth/me").then((res) => res.data),
  logout: () => api.post("/auth/logout").then((res) => res.data),
  dashboard: async () => {
    const [projects, certificates, messages, settings] = await Promise.allSettled([
      api.get("/projects"),
      api.get("/certificates"),
      api.get("/contact/messages"),
      api.get("/settings")
    ]);
    return {
      projects: projects.status === "fulfilled" ? arrayFrom(projects.value.data?.projects) : [],
      certificates: certificates.status === "fulfilled" ? arrayFrom(certificates.value.data?.certificates) : [],
      messages: messages.status === "fulfilled" ? arrayFrom(messages.value.data?.messages) : [],
      settings: settings.status === "fulfilled" ? settings.value.data?.settings || null : null
    };
  },
  projects: () => api.get("/projects").then(projectArray),
  createProject: (payload) => api.post("/projects", payload).then((res) => res.data),
  updateProject: (id, payload) => api.put(`/projects/${id}`, payload).then((res) => res.data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  certificates: () => api.get("/certificates").then(certificateArray),
  createCertificate: (payload) => api.post("/certificates", payload).then((res) => res.data),
  updateCertificate: (id, payload) => api.put(`/certificates/${id}`, payload).then((res) => res.data),
  deleteCertificate: (id) => api.delete(`/certificates/${id}`),
  messages: (params) => api.get("/contact/messages", { params }).then(messageData),
  markMessageRead: (id) => api.patch(`/contact/messages/${id}/read`).then((res) => res.data.message),
  deleteMessage: (id) => api.delete(`/contact/messages/${id}`),
  settings: () => api.get("/settings").then((res) => res.data.settings),
  updateSettings: (payload) => api.put("/settings", payload).then((res) => res.data.settings)
};
