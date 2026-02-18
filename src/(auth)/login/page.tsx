"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"resident" | "visitor">("resident");

  const handleLogin = () => {
    // TODO: Add authentication logic
    alert(`Login as ${role} with ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Daily Visitor App
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Role Selector */}
          <div className="flex justify-between">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="resident"
                checked={role === "resident"}
                onChange={() => setRole("resident")}
              />
              Resident
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="visitor"
                checked={role === "visitor"}
                onChange={() => setRole("visitor")}
              />
              Visitor
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
