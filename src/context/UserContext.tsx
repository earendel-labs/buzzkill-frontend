"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  activeBee: number | null;
  setActiveBee: (beeId: number) => void;
  resourceCount: number;
  updateResourceCount: (count: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeBee, setActiveBeeState] = useState<number | null>(null);
  const [resourceCount, setResourceCount] = useState(0);

  const setActiveBee = (beeId: number) => {
    setActiveBeeState(beeId);
  };

  const updateResourceCount = (count: number) => {
    setResourceCount(count);
  };

  return (
    <UserContext.Provider
      value={{
        activeBee,
        setActiveBee,
        resourceCount,
        updateResourceCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
