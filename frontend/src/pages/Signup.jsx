import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault(); // 🔥 MUST
      setError("");
      setLoading(true);

      try {
        const res = await api.post("/register", form);
        console.log("REGISTER RESPONSE:", res.data);

        navigate("/login");
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Signup failed");
    } finally {
        setLoading(false);
    }
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

              {error && (
                  <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
              )}

              <input
                  name="name"
                  placeholder="Name"
                  className="input"
                  onChange={handleChange}
                  required
              />

              <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input"
                  onChange={handleChange}
                  required
              />

              <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input"
                  onChange={handleChange}
                  required
              />

              <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary ${loading ? "opacity-60 cursor-not-allowed" : ""
                      }`}
              >
                  {loading ? "Signing up..." : "Signup"}
              </button>

              <p className="text-sm text-center mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 font-semibold">
                      Login
                  </Link>
              </p>
          </form>
      </div>
  );
}
