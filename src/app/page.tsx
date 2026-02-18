"use client"; // ⚠️ must be first line

import LandingScreen from "../(auth)/landing/page";
import LoginPage from "../(auth)/login/page";
import ResidentAuth from "../(auth)/register/page";
import ResidentMapDemo from "../components/global/myMap/page";

export default function Home() {
  return (
    // <LandingScreen
    //   onSelectVisitor={() => { alert("Visitor clicked!") }}
    //   onSelectResident={() => { alert("Resident clicked!") }}
    // />
    // <ResidentAuth/>
    <ResidentMapDemo/>
  );
}
