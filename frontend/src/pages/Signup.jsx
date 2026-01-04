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

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault(); // ✅ IMPORTANT

      try {
          await api.post("/register", form);
          alert("Signup successful, please login");

          // ✅ signup ke baad login page
          navigate("/login");
      } catch (err) {
          alert(err.response?.data?.message || "Signup failed");
      }
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

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

              <button type="submit" className="btn-primary mb-4">
                  Signup
              </button>

              <p className="text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 font-semibold">
                      Login
                  </Link>
              </p>
          </form>
      </div>
  );
}
