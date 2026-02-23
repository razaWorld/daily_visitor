"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      {children}
    </div>
  );
}