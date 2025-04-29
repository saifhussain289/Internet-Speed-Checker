"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SpeedTestResult {
  id: string;
  timestamp: number;
  downloadSpeed: number | null;
  uploadSpeed: number | null;
}

interface SpeedTestContextType {
  history: SpeedTestResult[];
  addTestResult: (downloadSpeed: number | null, uploadSpeed: number | null) => void;
  clearHistory: () => void;
}

const SpeedTestContext = createContext<SpeedTestContextType | undefined>(undefined);

export function useSpeedTest() {
  const context = useContext(SpeedTestContext);
  if (context === undefined) {
    throw new Error("useSpeedTest must be used within a SpeedTestProvider");
  }
  return context;
}

export function SpeedTestProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<SpeedTestResult[]>([]);

  // Load history from localStorage when component mounts
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("speedTestHistory");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Error loading speed test history:", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("speedTestHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving speed test history:", error);
    }
  }, [history]);

  // Add a new test result to history
  const addTestResult = (downloadSpeed: number | null, uploadSpeed: number | null) => {
    const newResult: SpeedTestResult = {
      id: generateId(),
      timestamp: Date.now(),
      downloadSpeed,
      uploadSpeed,
    };

    setHistory((prev) => [newResult, ...prev].slice(0, 10)); // Keep only the 10 most recent tests
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
  };

  // Generate a simple ID for each test result
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  return (
    <SpeedTestContext.Provider value={{ history, addTestResult, clearHistory }}>
      {children}
    </SpeedTestContext.Provider>
  );
}
