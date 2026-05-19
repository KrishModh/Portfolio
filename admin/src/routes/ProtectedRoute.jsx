import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { checking, isAuthenticated } = useAuth();
  if (checking) return <div className="loading-screen">Verifying secure session...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
