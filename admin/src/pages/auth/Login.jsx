import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LockKeyhole, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success("Secure session established.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-screen">
      <form className="login-card" onSubmit={submit}>
        <Shield size={42} />
        <p className="eyebrow">Admin access</p>
        <h1>Portfolio Command Center</h1>
        <input
          type="email"
          placeholder="Admin email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          minLength="8"
          required
        />
        <button className="neon-button" disabled={loading}>
          <LockKeyhole size={18} /> {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </main>
  );
}
