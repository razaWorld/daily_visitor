// src/components/global/myMap/ResidentMapCardInner.tsx
"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ShieldCheck } from "lucide-react";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom icon for current location
const currentLocationIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Location type
interface Location {
  lat: number;
  lng: number;
  address?: string;
}

// Map click component
interface MyMapProps {
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

const MyMap: React.FC<MyMapProps> = ({ location, setLocation }) => {
  useMapEvents({
    click(e) {
      fetchAddress(e.latlng.lat, e.latlng.lng);
    },
  });

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setLocation({ lat, lng, address: data.display_name });
    } catch {
      setLocation({ lat, lng, address: "Address not found" });
    }
  };

  return location ? <Marker position={[location.lat, location.lng]} /> : null;
};

// Main inner map card
export default function ResidentMapCardInner() {
  const [location, setLocation] = useState<Location | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [search, setSearch] = useState("");

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchAddress(latitude, longitude);
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (err) => console.log("Geolocation error:", err)
    );
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setLocation({ lat, lng, address: data.display_name });
    } catch {
      setLocation({ lat, lng, address: "Address not found" });
    }
  };

  const searchLocation = async () => {
    if (!search) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          search
        )}`
      );
      const data = await res.json();
      if (data[0]) {
        const { lat, lon, display_name } = data[0];
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon), address: display_name });
      } else {
        alert("Location not found");
      }
    } catch {
      alert("Error fetching location");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Set Your Home Location</h2>
        </div>

        {/* Search */}
        <div className="p-4 flex gap-2 items-center border-b border-gray-200">
          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={searchLocation}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            Search
          </button>
        </div>

        {/* Map */}
        <div className="relative h-[400px] w-full">
          <MapContainer
            center={
              currentLocation
                ? ([currentLocation.lat, currentLocation.lng] as LatLngExpression)
                : ([31.5, 74.3] as LatLngExpression)
            }
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {currentLocation && (
              <Marker
                position={[currentLocation.lat, currentLocation.lng]}
                icon={currentLocationIcon}
              />
            )}

            <MyMap location={location} setLocation={setLocation} />
          </MapContainer>

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs text-gray-600 shadow-sm">
            Click on the map to select your location
          </div>
        </div>

        {/* Confirm */}
        <div className="p-4 border-t border-gray-200 flex flex-col gap-2">
          {location && (
            <p className="text-gray-700 text-sm text-center break-words">
              Selected: {location.address}
            </p>
          )}
          <button
            onClick={() => alert(`Location confirmed!\n${location?.address}`)}
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
