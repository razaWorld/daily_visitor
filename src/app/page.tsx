"use client";

import React, { useState } from "react";
import LandingScreen from "../(auth)/landing/page";
import LoginPage from "../(auth)/login/page";
import ResidentAuth from "../(auth)/register/page";
import ResidentMapDemo from "../components/global/myMap/page";

export default function Home() {
  const [page, setPage] = useState<"landing" | "login" | "register" | "map">("landing");

  return (
    <div>
      {page === "landing" && (
        <LandingScreen
          onSelectVisitor={() => setPage("login")}
          onSelectResident={() => setPage("register")}
        />
      )}
      {page === "login" && <LoginPage />}
      {page === "register" && <ResidentAuth onLogin={() => setPage("map")} onBack={() => setPage("landing")} />}
      {page === "map" && <ResidentMapDemo />}
    </div>
  );
}
