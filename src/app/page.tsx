"use client";

import React, { useState } from "react";
import ResidentMapDemo from "../components/global/myMap/page";
import {VisitorAuth,ResidentAuth,LandingScreen} from "../(auth)/index";
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
      {page === "login" && <VisitorAuth onLogin={() => setPage("map")} onBack={() => setPage("landing")} />}
      {page === "register" && <ResidentAuth onLogin={() => setPage("map")} onBack={() => setPage("landing")} />}
      {page === "map" && <ResidentMapDemo />}
    </div>
  );
}
