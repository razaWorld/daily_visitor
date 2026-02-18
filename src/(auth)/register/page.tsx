"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowLeft, MapPin, Home } from "lucide-react";
import { motion } from "framer-motion";

interface ResidentAuthProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function ResidentAuth({ onLogin, onBack }: ResidentAuthProps) {
  const [view, setView] = useState<"login" | "signup" | "map">("login");
  const [location, setLocation] = useState<{ x: number; y: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLocation({ x, y });
  };

  if (view === "map") {
    return (
      <div className="h-screen flex flex-col bg-slate-50">
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-3 max-w-4xl mx-auto w-full">
          <button
            onClick={() => setView("signup")}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-bold text-slate-900">Set Home Location</h1>
          </div>
        </div>

        {/* Map */}
        <div
          className="flex-1 relative bg-slate-200 overflow-hidden cursor-crosshair max-w-4xl mx-auto w-full rounded-lg mt-6"
          onClick={handleMapClick}
          style={{ minHeight: "400px" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-slate-400 font-semibold text-xl opacity-20">MAP VIEW</span>
          </div>

          {location && (
            <div
              className="absolute w-6 h-6 -ml-3 -mt-6 text-red-500 animate-bounce"
              style={{ left: location.x, top: location.y }}
            >
              <MapPin className="w-full h-full fill-current" />
            </div>
          )}

          <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-md text-xs text-slate-600 shadow-sm pointer-events-none">
            Tap on the map to pin your exact home location.
          </div>
        </div>

        {/* Confirm Button */}
        <div className="p-4 max-w-4xl mx-auto w-full">
          <button
            onClick={onLogin}
            disabled={!location}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              location ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
            } transition-all`}
          >
            Confirm Location & Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Logo + Title */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 text-center"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-md">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {view === "login" ? "Welcome Resident" : "Join as Resident"}
          </h1>
          <p className="text-gray-500 text-sm">
            {view === "login"
              ? "Manage your home services efficiently."
              : "Register your home to request services."}
          </p>
        </motion.div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {view === "signup" && (
            <div className="space-y-1">
              <label className="text-gray-700 font-medium text-sm">Full Name</label>
              <input
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            className="w-full py-2 mt-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all"
            onClick={() => (view === "login" ? onLogin() : setView("map"))}
          >
            {view === "login" ? "Sign In" : "Continue"}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            {view === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setView(view === "login" ? "signup" : "login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              {view === "login" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
