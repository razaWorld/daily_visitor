"use client";

import React, { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface VisitorAuthProps {
  onLogin: () => void;
  onBack: () => void;
}

type ViewType = "login" | "signup" | "map";

export default function VisitorAuth({ onLogin, onBack }: VisitorAuthProps) {
  const [view, setView] = useState<ViewType>("login");
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPoints([...points, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const PolygonOverlay = points.length < 3 ? null : (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <path
        d={points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"}
        fill="rgba(59,130,246,0.3)"
        stroke="#2563EB"
        strokeWidth="2"
      />
    </svg>
  );

  // ===== MAP VIEW =====
  if (view === "map")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-white border-b flex items-center gap-3">
            <button onClick={() => setView("signup")} className="p-2 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Define Secure Work Area
            </h1>
          </div>

          {/* Map */}
          <div
            className="relative bg-slate-200 cursor-crosshair"
            onClick={handleMapClick}
            style={{ minHeight: "300px" }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            />
            {points.map((p, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"
                style={{ left: p.x, top: p.y }}
              />
            ))}
            {PolygonOverlay}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between mb-4 text-sm text-slate-600">
              <span>{points.length} points selected</span>
              <button onClick={() => setPoints([])} className="text-red-500 hover:text-red-600">
                Clear
              </button>
            </div>
            <button
              onClick={onLogin}
              disabled={points.length < 3}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
                points.length >= 3 ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Complete Registration
            </button>
          </div>
        </div>
      </div>
    );

  // ===== LOGIN / SIGNUP =====
  const isLogin = view === "login";

  const AuthInput = ({ label, ...props }: any) => (
    <div className="space-y-1">
      <label className="text-gray-700 font-medium text-sm">{label}</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Back Button */}
        <button onClick={onBack} className="mb-4 p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Logo + Title */}
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">{isLogin ? "Welcome Back" : "Join as Visitor"}</h1>
          <p className="text-gray-500 text-sm">
            {isLogin
              ? "Sign in to manage your daily tasks."
              : "Create an account to start accepting jobs securely."}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <AuthInput label="Email" type="email" placeholder="Enter your email" />
          <AuthInput label="Password" type="password" placeholder="••••••••" />
          {!isLogin && (
            <>
              <AuthInput label="Full Name" placeholder="Ali Jahanzaib" />
              <div className="space-y-1">
                <label className="text-gray-700 font-medium text-sm">Profession (Single Service)</label>
                <select className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {["Milk Delivery", "House Cleaning", "Car Wash", "Plumbing", "Electrician", "Gardening"].map(
                    (p) => (
                      <option key={p}>{p}</option>
                    )
                  )}
                </select>
                <p className="text-xs text-slate-500">You can only select one active profession.</p>
              </div>
            </>
          )}

          <button
            onClick={() => (isLogin ? onLogin() : setView("map"))}
            className="w-full py-2 mt-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all"
          >
            {isLogin ? "Sign In" : "Continue"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setView(isLogin ? "signup" : "login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
