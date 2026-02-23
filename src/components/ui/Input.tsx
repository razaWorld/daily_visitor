"use client";

import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="text-gray-700 font-medium text-sm">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}