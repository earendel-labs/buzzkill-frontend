// src/context/LoadingContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

type LoadingContextType = {
  registerLoading: () => void;
  unregisterLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const pathname = usePathname();

  const registerLoading = useCallback(() => {
    setLoadingCount((count) => count + 1);
  }, []);

  const unregisterLoading = useCallback(() => {
    setLoadingCount((count) => Math.max(0, count - 1));
  }, []);

  // Use `pathname` from `next/navigation` to detect route changes
  useEffect(() => {
    registerLoading();
    unregisterLoading();

    // Clean up loading state on unmount or route change
    return () => unregisterLoading();
  }, [pathname, registerLoading, unregisterLoading]);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ registerLoading, unregisterLoading }}>
      {isLoading && <HexagonSpinner />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
