"use client";

import { Home, Calendar, Map, Briefcase } from "lucide-react";
import VisitorNotifications from "./notifications";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import VisitorHome from "./home";
import VisitorCalendar from "./calender";
import { VisitorServices } from "./services";


const ResidentMapCardInner = dynamic(
  () => import("../../components/global/myMap/MapComponent"),
  { ssr: false }
);

export default function BottomNavbarVisitor() {
  const [activeTab, setActiveTab] = useState<
    "calender" | "home" | "map" | "services" | "notifications"
  >("home");

  return (
    <div className="pb-20">
      <div>
        {activeTab === "home" && <VisitorHome setActiveTab={setActiveTab} />}
        {activeTab === "calender" && <VisitorCalendar />}
        {activeTab === "services" && <VisitorServices />}
        {activeTab === "map" && <ResidentMapCardInner />}
        {activeTab === "notifications" && <VisitorNotifications />}
      </div>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t shadow flex justify-around items-center">

        {/* Home */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "home" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          <span>Home</span>
        </button>

        {/* Calendar */}
        <button
          onClick={() => setActiveTab("calender")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "calender" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Calendar className="w-6 h-6" />
          <span>Calendar</span>
        </button>

        {/* Services */}
        <button
          onClick={() => setActiveTab("services")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "services" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Briefcase className="w-6 h-6" />
          <span>Services</span>
        </button>

        {/* Map */}
        <button
          onClick={() => setActiveTab("map")}
          className={`flex flex-col items-center text-sm ${
            activeTab === "map" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Map className="w-6 h-6" />
          <span>Map</span>
        </button>

      </nav>
    </div>
  );
}