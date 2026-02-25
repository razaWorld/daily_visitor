"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";

type ViewMode = "day" | "week" | "month";

interface Job {
  id: string;
  type: string;
  residentName: string;
  startTime: string;
  endTime: string;
  status: "current" | "upcoming" | "completed";
}

interface Visitor {
  id: string;
  name: string;
  role: string;
  service: string;
  currentStatus: string;
}

export default function VisitorCalendar() {
  // Mock visitor data
  const visitor: Visitor = {
    id: "v1",
    name: "Ali Raza",
    role: "visitor",
    service: "AC Maintenance",
    currentStatus: "working",
  };

  const [view, setView] = useState<ViewMode>("day");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + i);
    return d;
  });

  // Mock jobs data
  const jobs: Job[] = [
    {
      id: "job1",
      type: visitor.service,
      residentName: "Sarah Smith",
      startTime: "09:00 AM",
      endTime: "11:00 AM",
      status: visitor.currentStatus === "working" ? "current" : "upcoming",
    },
  ];

  const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
    <div className={`bg-white rounded-xl shadow p-4 ${className}`}>{children}</div>
  );

  const Badge: React.FC<{ variant?: "success" | "default" | "secondary"; className?: string; children: React.ReactNode }> = ({
    variant = "default",
    className,
    children,
  }) => {
    let base = "px-2 py-0.5 rounded text-xs font-semibold ";
    let variantClass = "";
    switch (variant) {
      case "success":
        variantClass = "bg-green-100 text-green-800";
        break;
      case "secondary":
        variantClass = "bg-gray-100 text-gray-800";
        break;
      default:
        variantClass = "bg-blue-100 text-blue-800";
    }
    return <span className={`${base} ${variantClass} ${className}`}>{children}</span>;
  };

  const changeDate = (delta: number) => {
    const newDate = new Date(selectedDate);
    if (view === "week") newDate.setDate(newDate.getDate() + delta * 7);
    else newDate.setDate(newDate.getDate() + delta);
    setSelectedDate(newDate);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Schedule</h1>
      </div>

      {/* View Mode Buttons */}
      <div className="bg-slate-200 p-1 rounded-xl flex mb-6">
        {(["day", "week", "month"] as ViewMode[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
              view === v ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Calendar Strip */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeDate(-1)}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-slate-700">
            {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={() => changeDate(1)}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day / Week / Month Views */}
        {view === "week" ? (
          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-[10px] font-bold text-slate-400 mb-2">
                {day}
              </div>
            ))}
            {days.map((date, i) => {
              const isToday = date.getDate() === new Date().getDate();
              const isSelected = date.getDate() === selectedDate.getDate();
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(new Date(date))}
                  className={`
                    h-9 w-9 md:h-10 md:w-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all mx-auto
                    ${isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-200" : isToday ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        ) : view === "month" ? (
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            <span className="col-span-7 py-8 text-slate-400">Month View Mockup</span>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-2xl font-bold text-slate-900">
              {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
            </span>
            <p className="text-slate-500 text-sm">
              {selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "long" })}
            </p>
          </div>
        )}
      </Card>

      {/* Jobs List */}
      <div className="flex-1 overflow-y-auto pr-1 pb-20">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-slate-400" />
          {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </h3>

        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow border-slate-200/60">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
                    <span className="text-xs font-bold text-slate-400">{job.startTime.split(" ")[0]}</span>
                    <span className="text-[10px] text-slate-400 uppercase">{job.startTime.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-slate-900">{job.type}</h4>
                      <Badge
                        variant={job.status === "completed" ? "success" : job.status === "current" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{job.residentName}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        {job.startTime} - {job.endTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
            <p className="text-slate-400 text-sm">No more jobs scheduled for this day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}