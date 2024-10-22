"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccount, useBalance } from "wagmi"; // Import from Wagmi to manage account and balance

interface UserContextType {
  activeBee: number | null;
  setActiveBee: (beeId: number) => void;
  resourceCount: number;
  updateResourceCount: (count: number) => void;
  address: string | null; // Wallet address
  isConnected: boolean; // Connection status
  balance: string | null; // User's balance
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeBee, setActiveBeeState] = useState<number | null>(null);
  const [resourceCount, setResourceCount] = useState(0);
  const { address, isConnected } = useAccount(); // Get account info from RainbowKit and wagmi
  const { data: balanceData } = useBalance({
    address: address, // Get the balance for the current address
  });

  const setActiveBee = (beeId: number) => {
    setActiveBeeState(beeId);
  };

  const updateResourceCount = (count: number) => {
    setResourceCount(count);
  };

  // Handle Wallet Disconnect or Account Change
  useEffect(() => {
    if (!isConnected) {
      // Reset context values if the user disconnects
      setActiveBeeState(null);
      setResourceCount(0);
    }
  }, [isConnected]); // This effect runs whenever isConnected changes

  return (
    <UserContext.Provider
      value={{
        activeBee,
        setActiveBee,
        resourceCount,
        updateResourceCount,
        address: address ?? null, // Convert undefined to null
        isConnected,
        balance: balanceData?.formatted ?? null, // Use the formatted balance or null
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
