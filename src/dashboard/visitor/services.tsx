import React from "react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { Briefcase, Home, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

interface Household {
  id: string;
  name: string;
  address: string;
  time: string;
}

export const VisitorServices: React.FC = () => {
  const { currentUser } = useApp();

  const visitor =
    currentUser && currentUser.role === "visitor"
      ? currentUser
      : null;

  const service: string = visitor?.service || "Service";

  const assignedHouseholds: Household[] = [
    {
      id: "1",
      name: "Sarah Smith",
      address: "Block A, Villa 42",
      time: "09:00 AM",
    },
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        My Subscription
      </h1>

      <p className="text-slate-500 text-sm mb-6">
        You are subscribed to {service} service.
      </p>

      <div className="space-y-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-0 overflow-hidden border-0 shadow-xl shadow-blue-900/5 bg-white">
            
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white">
              <div className="flex items-start justify-between">

                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    {service}
                  </h2>

                  <p className="text-blue-200 text-sm mt-1">
                    Active Subscription
                  </p>
                </div>

                <div className="p-2 bg-white/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>

              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-slate-300">

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Daily Schedule</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Home className="w-4 h-4" />
                  <span>
                    {assignedHouseholds.length} Households
                  </span>
                </div>

              </div>
            </div>

            {/* Body */}
            <div>

              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Assigned Households
                </h3>
              </div>

              <div className="divide-y divide-slate-100">

                {assignedHouseholds.length > 0 ? (
                  assignedHouseholds.map((h) => (
                    <div
                      key={h.id}
                      className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >

                      <div className="flex items-start gap-3">

                        <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                          <Home className="w-4 h-4" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">
                            {h.name}
                          </h4>

                          <p className="text-xs text-slate-500">
                            {h.address}
                          </p>
                        </div>

                      </div>

                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-600 font-mono text-xs"
                      >
                        {h.time}
                      </Badge>

                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-slate-400 text-sm">
                      No active households assigned.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </Card>
        </motion.div>
      </div>
    </div>
  );
};