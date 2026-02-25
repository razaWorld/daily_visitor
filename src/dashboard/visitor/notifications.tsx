"use client";

import React from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  ArrowLeft,
  BellRing,
  Clock,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

/* ================= TYPES ================= */

interface VisitorNotificationsProps {
  onBack?: () => void;
}

interface Notification {
  id: string | number;
  title: string;
  message: string;
}

interface VisitorUser {
  role: string;
  currentStatus?: string;
}

interface AppContextType {
  currentUser: VisitorUser | null;
  notifications: Notification[];
}

/* ================= COMPONENT ================= */

const VisitorNotifications: React.FC<VisitorNotificationsProps> = ({
  onBack,
}) => {
 const { currentUser, notifications } = useApp();
  const visitor =
    currentUser && currentUser.role === "visitor"
      ? currentUser
      : null;

  const isBusy =
    visitor && visitor.currentStatus !== "available";

  const isOutOfGeofence = false;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>

        <h1 className="text-lg font-bold text-slate-900">
          Notifications
        </h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">

        {/* New Notification */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Card className="border-l-4 border-l-blue-500 overflow-hidden">
            <div className="p-4">

              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">

                  <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                    <BellRing className="w-4 h-4" />
                  </div>

                  <span className="font-semibold text-sm text-blue-900">
                    New Service Request
                  </span>

                </div>

                <span className="text-[10px] text-slate-400">
                  Just now
                </span>
              </div>

              <h3 className="font-bold text-lg mb-1">
                Extra Service Visit
              </h3>

              <p className="text-slate-500 text-sm mb-4">
                From: Mrs. Sania • Block C, 304
              </p>

              {isBusy ? (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  Cannot accept: You are currently {visitor?.currentStatus}
                </div>
              ) : isOutOfGeofence ? (
                <div className="p-3 bg-orange-50 text-orange-600 text-xs rounded-lg border flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  Outside work area
                </div>
              ) : (
                <div className="flex gap-3">

                  <button className="flex-1 bg-white border border-red-200 text-red-600">
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </button>

                  <button className="flex-1 bg-blue-600 text-white">
                    <Check className="w-4 h-4 mr-2" />
                    Accept
                  </button>

                </div>
              )}

            </div>
          </Card>
        </motion.div>

        {/* Old Notifications */}
        <div className="mt-6">

          <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">
            Earlier
          </h3>

          <div className="space-y-3">

            {notifications &&
              notifications.map((n: Notification) => (
                <Card key={n.id} className="p-4 flex gap-3">

                  <div className="p-2 bg-slate-100 rounded-full">
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {n.title}
                    </p>

                    <p className="text-xs text-slate-500">
                      {n.message}
                    </p>
                  </div>

                </Card>
              ))}

            {(!notifications || notifications.length === 0) && (
              <p className="text-slate-400 text-sm italic">
                No past notifications
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default VisitorNotifications;