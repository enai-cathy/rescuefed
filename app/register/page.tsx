"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name:"", username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.username || !form.name) {
      setError("All fields are required.");
      return;
    }
    register(form);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-red-700">
          Create an Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Join Rescue Federation today
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            value={form.username}
            onChange={handleChange}
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            value={form.username}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold 
                       hover:bg-red-700 focus:ring-2 focus:ring-red-300 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
