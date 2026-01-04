import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/login", form);
            navigate("/dashboard"); // ✅ redirect
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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

                <button className="btn-primary mb-4">Login</button>

                {/* 🔁 Signup redirect */}
                <p className="text-sm text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-semibold">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
}
