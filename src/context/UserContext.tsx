"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccount, useBalance } from "wagmi";
import {
  useReadBuzzkillHatchlingsNftBalanceOfBatch,
  useReadBuzzkillHatchlingsNftTotalMinted,
  useReadBuzzkillHatchlingsNftUri,
} from "@/hooks/BuzzkillHatchlingsNFT";

interface Hatchling {
  id: number;
  imageAddress: string;
  status: string;
  environment: string | null;
}

interface UserContextType {
  activeBee: number | null;
  setActiveBee: (beeId: number) => void;
  bees: Hatchling[];
  loadingBees: boolean;
  fetchError: boolean;
  address: string | null;
  isConnected: boolean;
  balance: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: address,
  });

  const [activeBee, setActiveBeeState] = useState<number | null>(null);
  const [bees, setBees] = useState<Hatchling[]>([]);
  const [loadingBees, setLoadingBees] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { data: totalMinted } = useReadBuzzkillHatchlingsNftTotalMinted();
  const { data: uri } = useReadBuzzkillHatchlingsNftUri({ args: [BigInt(1)] });
  const { data: batchBalances } = useReadBuzzkillHatchlingsNftBalanceOfBatch({
    args: [
      Array.from(
        { length: Number(totalMinted) },
        () => address || "0x0000000000000000000000000000000000000000"
      ),
      Array.from({ length: Number(totalMinted) }, (_, i) => BigInt(i + 1)),
    ],
  });

  const setActiveBee = (beeId: number) => {
    setActiveBeeState(beeId);
  };

  const fetchMetadata = async (metadataUri: string) => {
    try {
      const response = await fetch(ipfsToHttp(metadataUri));
      const metadata = await response.json();
      return ipfsToHttp(metadata.image);
    } catch (err) {
      console.error("Failed to fetch metadata:", err);
      setFetchError(true);
      return "/default-image.png";
    }
  };

  const ipfsToHttp = (ipfsUri: string) => {
    if (ipfsUri.startsWith("ipfs://")) {
      return ipfsUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    }
    return ipfsUri;
  };

  const fetchBeesData = async () => {
    if (!batchBalances || !address || !imageUrl || !totalMinted) {
      setLoadingBees(false);
      return;
    }

    const hatchlings: Hatchling[] = [];
    for (let i = 0; i < totalMinted; i++) {
      const balance = batchBalances[i];
      if (balance && Number(balance) > 0) {
        hatchlings.push({
          id: i + 1,
          imageAddress: imageUrl || "/default-image.png",
          status: "Free",
          environment: null,
        });
      }
    }
    setBees(hatchlings);
    setLoadingBees(false);

    // If the user owns bees but hasn't selected one, we don't set `activeBee`
    if (hatchlings.length > 0 && !activeBee) {
      setActiveBeeState(null); // Ensure activeBee is null for 'Select Your Bee'
    }
  };

  useEffect(() => {
    if (uri && !imageUrl && totalMinted) {
      fetchMetadata(uri).then((image) => setImageUrl(image));
    }
  }, [uri, totalMinted]);

  useEffect(() => {
    if (batchBalances && address && imageUrl) {
      setLoadingBees(true);
      fetchBeesData();
    }
  }, [batchBalances, address, imageUrl]);

  // Reset the state on disconnect
  useEffect(() => {
    if (!isConnected) {
      setBees([]);
      setActiveBeeState(null);
    }
  }, [isConnected]);

  return (
    <UserContext.Provider
      value={{
        activeBee,
        setActiveBee,
        bees,
        loadingBees,
        fetchError,
        address: address ?? null,
        isConnected,
        balance: balanceData?.formatted ?? null,
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
