"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ShieldCheck } from "lucide-react";

// Fix default marker icon issue in React-Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MyMapProps {
  location: { lat: number; lng: number } | null;
  setLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
}

const MyMap: React.FC<MyMapProps> = ({ location, setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return location ? <Marker position={[location.lat, location.lng]} /> : null;
};

export default function ResidentMapCard() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Card Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Set Your Home Location</h2>
        </div>

        {/* Map Section */}
        <div className="relative h-[400px] w-full">
          <MapContainer
            center={[31.5, 74.3] as LatLngExpression}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MyMap location={location} setLocation={setLocation} />
          </MapContainer>

          {/* Overlay Instructions */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs text-gray-600 shadow-sm">
            Click on the map to select your home location
          </div>
        </div>

        {/* Confirm Button & Coordinates */}
        <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
          {location && (
            <p className="text-gray-700 text-sm text-center">
              Selected: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
            </p>
          )}
          <button
            onClick={() => alert("Location confirmed!")}
            disabled={!location}
            className={`w-full py-2 rounded-lg font-semibold text-white transition-all ${
              location ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}
