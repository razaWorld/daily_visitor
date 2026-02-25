"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import MapComponent from "@/components/global/myMap/MapComponent";
import {
  VisitorAuth,
  ResidentAuth,
  LandingScreen,
} from "../(auth)/index";

const ResidentMapDemo = dynamic(
  () => import("../components/global/myMap/MapComponent"),
  { ssr: false }
);

export default function Home() {
  const [page, setPage] = useState<
    "landing" | "visitorAuth" | "residentAuth" | "map"
  >("landing");

  return (
    <div>
      {page === "landing" && (
        <LandingScreen
          onSelectVisitor={() => setPage("visitorAuth")}
          onSelectResident={() => setPage("residentAuth")}
        />
      )}

      {page === "visitorAuth" && (
        <VisitorAuth
          onLogin={() => setPage("map")}
          onBack={() => setPage("landing")}
        />
      )}

      {page === "residentAuth" && (
        <ResidentAuth
          onLogin={() => setPage("map")}
          onBack={() => setPage("landing")}
        />
      )}

      {page === "map" && <ResidentMapDemo />}
    </div>
  );
}