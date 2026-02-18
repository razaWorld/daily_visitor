"use client";

import React from "react";
import { ShieldCheck, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface LandingScreenProps {
  onSelectVisitor: () => void;
  onSelectResident: () => void;
}

export default function LandingScreen({ onSelectVisitor, onSelectResident }: LandingScreenProps) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white p-6 relative">
      
      {/* Logo + Title */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 text-center"
      >
        <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl ring-1 ring-white/30">
          <ShieldCheck className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">SmartEntry</h1>
        <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
          Smart Daily Visitor & Service Management System
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-5">
        
        {/* Visitor Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={onSelectVisitor}
          className="w-full h-20 bg-white text-blue-700 rounded-2xl flex items-center justify-between px-6 shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-blue-700" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-bold">I am a Visitor</span>
              <span className="text-xs text-gray-500 font-medium">Find jobs & manage visits</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 transition-all group-hover:text-blue-600" />
        </motion.button>

        {/* Resident Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onSelectResident}
          className="w-full h-20 bg-white/20 text-white border border-white/30 rounded-2xl flex items-center justify-between px-6 backdrop-blur-sm shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-bold">I am a Resident</span>
              <span className="text-xs text-white/70 font-medium">Request services & manage home</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/50 transition-all group-hover:text-white" />
        </motion.button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-[10px] text-white/40 font-medium tracking-widest uppercase">
        FYP Project Demo • v2.0
      </div>
    </div>
  );
}
