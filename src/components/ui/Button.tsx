"use client";

import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  title,
  onClick,
  disabled,
  className,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 rounded-md font-semibold transition-all
      ${
        disabled
          ? "bg-blue-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } ${className}`}
    >
      {title}
    </button>
  );
}