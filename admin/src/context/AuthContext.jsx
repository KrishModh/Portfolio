import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { adminApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      setChecking(false);
      return;
    }
    adminApi.me()
      .then((data) => setAdmin(data.admin))
      .catch(() => localStorage.removeItem("admin_token"))
      .finally(() => setChecking(false));
  }, []);

  const login = async (payload) => {
    const data = await adminApi.login(payload);
    localStorage.setItem("admin_token", data.token);
    setAdmin(data.admin);
  };

  const logout = async () => {
    await adminApi.logout().catch(() => null);
    localStorage.removeItem("admin_token");
    setAdmin(null);
  };

  const value = useMemo(() => ({ admin, checking, login, logout, isAuthenticated: Boolean(admin) }), [admin, checking]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
