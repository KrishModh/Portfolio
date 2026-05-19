import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Award, FolderKanban, Home, LogOut, Mail, PlusCircle, Settings, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ScrollProgress from "../common/ScrollProgress";
import ThemeToggle from "../common/ThemeToggle";

const nav = [
  { to: "/", label: "Overview", icon: Home },
  { to: "/projects/new", label: "Upload Project", icon: PlusCircle },
  { to: "/projects", label: "Manage Projects", icon: FolderKanban },
  { to: "/certificates/new", label: "Upload Certificate", icon: Award },
  { to: "/certificates", label: "Manage Certificates", icon: Award },
  { to: "/messages", label: "Contact Messages", icon: Mail },
  { to: "/settings", label: "Settings", icon: Settings }
];

export default function AdminLayout() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="admin-shell">
      <ScrollProgress />
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Shield />
          <div>
            <strong>Command Center</strong>
            <span>{admin?.name}</span>
          </div>
        </div>
        <nav>
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
        <button onClick={onLogout} className="logout-button">
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
