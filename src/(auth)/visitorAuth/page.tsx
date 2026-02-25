"use client";

import React, { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import VisitorHome from "../../dashboard/visitor/home";
import BottomNavbarVisitor from "../../dashboard/visitor/page";
/* ---------------- TYPES ---------------- */

type ViewType = "login" | "signup" | "map" | "home";

interface VisitorAuthProps {
  onLogin?: () => void;
  onBack?: () => void;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  profession: string;
}

interface Point {
  x: number;
  y: number;
}

/* ---------------- DUMMY DATA ---------------- */

const professions = [
  "Milk Delivery",
  "House Cleaning",
  "Car Wash",
  "Plumbing",
  "Electrician",
  "Gardening",
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function VisitorAuth({
  onLogin,
  onBack,
}: VisitorAuthProps) {
  const [view, setView] = useState<ViewType>("login");

  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    profession: professions[0],
  });

  const [points, setPoints] = useState<Point[]>([]);

  /* ---------------- HANDLERS ---------------- */

  const updateField = (
    key: keyof FormData,
    value: string
  ) => {
    setForm({ ...form, [key]: value });
  };

  const validateLogin = () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!form.email || !form.password || !form.name) {
      alert("All fields are required");
      return false;
    }
    return true;
  };

  /* ---------------- MAP ---------------- */

  const handleMapClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    setPoints([
      ...points,
      {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
  };

  const PolygonOverlay =
    points.length < 3 ? null : (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d={
            points
              .map(
                (p, i) =>
                  `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`
              )
              .join(" ") + " Z"
          }
          fill="rgba(59,130,246,0.3)"
          stroke="#2563EB"
          strokeWidth="2"
        />
      </svg>
    );

  /* ---------------- HOME VIEW ---------------- */

  if (view === "home") {
    return <BottomNavbarVisitor />;
  }

  /* ---------------- MAP VIEW ---------------- */

  if (view === "map")
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-3">
            <button
              onClick={() => setView("signup")}
              className="p-2 hover:bg-slate-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h1 className="font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Define Secure Work Area
            </h1>
          </div>

          {/* Map */}
          <div
            onClick={handleMapClick}
            className="relative bg-slate-200 cursor-crosshair"
            style={{ minHeight: 300 }}
          >
            {points.map((p, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: p.x,
                  top: p.y,
                }}
              />
            ))}

            {PolygonOverlay}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between text-sm mb-3">
              <span>
                {points.length} points selected
              </span>

              <button
                onClick={() => setPoints([])}
                className="text-red-500"
              >
                Clear
              </button>
            </div>

            <Button
              title="Complete Registration"
              disabled={points.length < 3}
              onClick={() => {
                if (points.length < 3) {
                  alert(
                    "Please select at least 3 points"
                  );
                  return;
                }

                alert("Registration Completed!");
                setView("home"); // GO TO HOME
              }}
            />
          </div>
        </div>
      </div>
    );

  /* ---------------- LOGIN / SIGNUP ---------------- */

  const isLogin = view === "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card>
        {/* Back */}
        <button
          onClick={() =>
            onBack ? onBack() : setView("login")
          }
          className="mb-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-xl font-bold">
            {isLogin
              ? "Welcome Visitor!"
              : "Join as Visitor"}
          </h1>

          <p className="text-sm text-gray-500">
            {isLogin
              ? "Sign in to manage your work."
              : "Create an account to start accepting jobs."}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Input
            label="Email"
            value={form.email}
            onChange={(e: any) =>
              updateField(
                "email",
                e.target.value
              )
            }
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e: any) =>
              updateField(
                "password",
                e.target.value
              )
            }
          />

          {!isLogin && (
            <>
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e: any) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
              />

              <div>
                <label className="text-sm font-medium">
                  Profession
                </label>

                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={form.profession}
                  onChange={(e) =>
                    updateField(
                      "profession",
                      e.target.value
                    )
                  }
                >
                  {professions.map((p) => (
                    <option key={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <Button
            title={
              isLogin ? "Sign In" : "Continue"
            }
            onClick={() => {
              if (isLogin) {
                if (!validateLogin()) return;

                alert("Login Success!");
                setView("home"); // SHOW VisitorHome
              } else {
                if (!validateSignup())
                  return;

                setView("map");
              }
            }}
          />

          <div className="text-center text-sm text-gray-500">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() =>
                setView(
                  isLogin
                    ? "signup"
                    : "login"
                )
              }
              className="text-blue-600 ml-1"
            >
              {isLogin
                ? "Sign Up"
                : "Log In"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}