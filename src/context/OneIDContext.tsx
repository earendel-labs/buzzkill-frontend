// src/context/OneIDContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { OneID } from "@oneid-xyz/inspect";

interface OneIDContextType {
  oneid: OneID | null;
}

const OneIDContext = createContext<OneIDContextType | undefined>(undefined);

export const OneIDProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [oneid, setOneID] = useState<OneID | null>(null);

  useEffect(() => {
    const initializeOneID = async () => {
      const oneidInstance = new OneID();
      await oneidInstance.systemConfig.initConfig();
      setOneID(oneidInstance);
    };

    initializeOneID();
  }, []);

  return (
    <OneIDContext.Provider value={{ oneid }}>{children}</OneIDContext.Provider>
  );
};

export const useOneID = () => {
  const context = useContext(OneIDContext);
  if (!context) {
    throw new Error("useOneID must be used within a OneIDProvider");
  }
  return context.oneid;
};
