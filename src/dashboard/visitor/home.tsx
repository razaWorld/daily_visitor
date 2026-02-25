"use client";

import React, { JSX, useState } from "react";
import { Bell, Clock, MapPin, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

type VisitorStatus =
  | "available"
  | "en-route"
  | "arrived"
  | "working"
  | "busy";

interface Visitor {
  id: string;
  name: string;
  role: string;
  service: string;
  currentStatus: VisitorStatus;
}

interface Notification {
  id: number;
  read: boolean;
}

interface Job {
  residentName: string;
  address: string;
  startTime: string;
  endTime: string;
  title: string;
}
interface VisitorHomeProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<"home" | "calender" | "map" | "services" | "notifications">
  >;
}

export default function VisitorHome({ setActiveTab }: VisitorHomeProps): JSX.Element {

  const [visitor, setVisitor] = useState<Visitor>({
    id: "v1",
    name: "Ali Raza",
    role: "visitor",
    service: "AC Maintenance",
    currentStatus: "available",
  });

  const [notifications] = useState<Notification[]>([
    { id: 1, read: false },
    { id: 2, read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentJob: Job = {
    residentName: "Sarah Smith",
    address: "Block A, Villa 42, Palm Jumeirah",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    title: visitor.service,
  };

  // Status change
  const handleStatusChange = () => {
    const nextStatus = visitor.currentStatus === "available" ? "en-route" : "available";
    setVisitor({ ...visitor, currentStatus: nextStatus });
    toast.success(`Status updated to ${nextStatus}`);
  };

  // Arrive button
  const handleArrive = () => {
    toast.loading("Verifying location...");
    setTimeout(() => {
      setVisitor({ ...visitor, currentStatus: "arrived" });
      toast.dismiss();
      toast.success("Location Verified!");
    }, 1500);
  };

  const getStatusColor = (status: VisitorStatus) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "en-route":
        return "bg-blue-500";
      case "arrived":
        return "bg-purple-500";
      case "working":
        return "bg-orange-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hello, {visitor.name.split(" ")[0]} 👋
          </h1>

          <button
            onClick={handleStatusChange}
            className="flex items-center gap-2 px-3 py-1.5 mt-2 bg-white border rounded-full shadow-sm"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(visitor.currentStatus)}`} />
            <span className="text-xs font-semibold capitalize text-gray-800">
              {visitor.currentStatus.replace("-", " ")}
            </span>
          </button>
        </div>

        {/* Notification */}
        <button className="relative p-2.5 bg-white border rounded-xl shadow-sm">
          <Bell className="text-gray-800 w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </div>

      {/* CURRENT TASK */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Current Task</h2>
          <Badge variant="outline" className="text-gray-700">
            {visitor.currentStatus === "arrived" ? "On Site" : "Scheduled"}
          </Badge>
        </div>

        <Card className="p-0 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">{currentJob.title}</p>
                <h3 className="text-xl font-bold text-white">{currentJob.residentName}</h3>
              </div>
              <Clock className="text-white" />
            </div>

            <div className="mt-4">
              <p className="flex gap-2 text-sm text-white">
                <Clock className="text-white" />
                {currentJob.startTime} - {currentJob.endTime}
              </p>
              <p className="flex gap-2 text-sm mt-2 text-white">
                <MapPin className="text-white" />
                {currentJob.address}
              </p>
            </div>

            <div className="mt-4">
              {visitor.currentStatus === "arrived" ? (
                <div className="bg-white text-blue-800 p-2 rounded flex justify-center gap-2 font-medium">
                  <Check className="w-4 h-4" />
                  Arrived
                </div>
              ) : (
                <button
                  onClick={handleArrive}
                  className="w-full bg-white text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-all"
                >
                  I Have Arrived
                </button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* TIMELINE */}
      <div>
        <h2 className="font-semibold mb-4 text-gray-900">Today's Timeline</h2>
        <div className="space-y-4">
          <Card className="p-3">
            <p className="text-xs text-gray-700">09:00 AM</p>
            <h4 className="font-semibold text-gray-900">Sarah Smith</h4>
            <p className="text-xs text-gray-500">AC Maintenance</p>
          </Card>

          <Card className="p-3">
            <p className="text-xs text-gray-700">02:00 PM</p>
            <h4 className="font-semibold text-gray-900">Ahmed Khan</h4>
            <p className="text-xs text-gray-500">AC Maintenance</p>
          </Card>
        </div>
      </div>
    </div>
  );
}