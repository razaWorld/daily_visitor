import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "solid";
}

export default function Badge({
  children,
  className = "",
  variant = "solid",
}: BadgeProps) {

  const baseStyle = "px-2 py-1 rounded-md text-xs";

  const variantStyle =
    variant === "outline"
      ? "border border-gray-300"
      : "bg-gray-200";

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </span>
  );
}