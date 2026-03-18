import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setError("Both fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message);
      }
    } catch (e) {
      setError("Something went wrong", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm">
        <h1 className="text-primary text-2xl font-bold mb-1">Admin Login</h1>
        <p className="text-gray-400 text-sm mb-6">OroGlee Clinical Dashboard</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mt-1 outline-none focus:border-secondary"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mt-1 outline-none focus:border-secondary"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-white py-2 rounded-xl hover:bg-secondary transition-colors text-sm font-medium mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
