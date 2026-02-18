"use client"; // ⚠️ must be first line

import LandingScreen from "../(auth)/landing/page";

export default function Home() {
  return (
    <LandingScreen
      onSelectVisitor={() => { alert("Visitor clicked!") }}
      onSelectResident={() => { alert("Resident clicked!") }}
    />
  );
}
