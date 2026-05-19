import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminLayout from "./components/layout/AdminLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProjectForm from "./pages/projects/ProjectForm.jsx";
import ManageProjects from "./pages/projects/ManageProjects.jsx";
import CertificateForm from "./pages/certificates/CertificateForm.jsx";
import ManageCertificates from "./pages/certificates/ManageCertificates.jsx";
import Messages from "./pages/messages/Messages.jsx";
import Settings from "./pages/settings/Settings.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="certificates/new" element={<CertificateForm />} />
        <Route path="certificates" element={<ManageCertificates />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
