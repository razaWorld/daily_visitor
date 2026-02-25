"use client";

import React, { createContext, useContext } from "react";

/* ================= TYPES ================= */

export interface Notification {
  id: string | number;
  title: string;
  message: string;
}

export interface User {
  role: string;
  service?: string;
  currentStatus?: string;
}

export interface AppContextType {
  currentUser: User | null;
  notifications: Notification[];
}

/* ================= CONTEXT ================= */

// Create context with proper type
const AppContext = createContext<AppContextType | undefined>(undefined);

/* ================= HOOK ================= */

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
};

/* ================= PROVIDER ================= */

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const value: AppContextType = {
    currentUser: {
      role: "visitor",
      service: "Cleaning",
      currentStatus: "available",
    },
    notifications: [
      {
        id: 1,
        title: "Service Completed",
        message: "Your cleaning service has been completed.",
      },
      {
        id: 2,
        title: "Payment Received",
        message: "Payment has been successfully processed.",
      },
    ],
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};