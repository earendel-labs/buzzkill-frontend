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
  useWriteBuzzkillHatchlingsNftSetApprovalForAll,
  useReadBuzzkillHatchlingsNftIsApprovedForAll,
} from "@/hooks/BuzzkillHatchlingsNFT";
import {
  useReadHiveStakingUserInfo,
  useReadHiveStakingGetStakedNfTsInHive,
} from "@/hooks/HiveStaking"; // Import staking hooks

interface Hatchling {
  id: number;
  imageAddress: string;
  status: string;
  environment: string | null;
  hive: string | null;
}

interface UserContextType {
  activeBee: number | null;
  setActiveBee: (beeId: number) => void;
  bees: Hatchling[];
  stakedBees: Hatchling[];
  loadingBees: boolean;
  fetchError: boolean;
  address: string | null;
  isConnected: boolean;
  balance: string | null;
  approvalForStaking: boolean;
  checkAndPromptApproval: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const [activeBee, setActiveBeeState] = useState<number | null>(null);
  const [bees, setBees] = useState<Hatchling[]>([]);
  const [stakedBees, setStakedBees] = useState<Hatchling[]>([]);
  const [loadingBees, setLoadingBees] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [approvalForStaking, setApprovalForStaking] = useState(false);
  const [isCheckingApproval, setIsCheckingApproval] = useState(false);

  const hiveStakingAddress = process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS as
    | `0x${string}`
    | undefined;

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

  const { data: isApproved } = useReadBuzzkillHatchlingsNftIsApprovedForAll({
    args: [
      address ?? "0x0000000000000000000000000000000000000000",
      hiveStakingAddress ?? "0x0000000000000000000000000000000000000000",
    ],
  });

  const { writeContractAsync: approveTokens } =
    useWriteBuzzkillHatchlingsNftSetApprovalForAll();

  const { data: userInfoData } = useReadHiveStakingUserInfo({
    args: [address ?? "0x0000000000000000000000000000000000000000"],
  });

  const setActiveBee = (beeId: number) => {
    setActiveBeeState(beeId);
  };

  const checkAndPromptApproval = async () => {
    if (!address || !hiveStakingAddress || isApproved === undefined) {
      console.log(
        "Address, hive staking, or approval status is not available."
      );
      return false;
    }

    setIsCheckingApproval(true);
    console.log("Checking if approval is already set...");

    if (!isApproved) {
      console.log(
        "Approval is not set, prompting user to approve staking contract..."
      );
      try {
        await approveTokens({
          args: [hiveStakingAddress, true],
        });
        setApprovalForStaking(true);
        console.log("User has approved the staking contract.");
        setIsCheckingApproval(false);
        return true;
      } catch (error) {
        console.error("Failed to set approval:", error);
        setApprovalForStaking(false);
        setIsCheckingApproval(false);
        return false;
      }
    } else {
      setApprovalForStaking(true);
      console.log("User has already approved the staking contract.");
      setIsCheckingApproval(false);
      return true;
    }
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

    const unstakedHatchlings: Hatchling[] = [];
    for (let i = 0; i < totalMinted; i++) {
      const balance = batchBalances[i];
      if (balance && Number(balance) > 0) {
        unstakedHatchlings.push({
          id: i + 1,
          imageAddress: imageUrl || "/default-image.png",
          status: "Free",
          environment: null,
          hive: null,
        });
      }
    }
    setBees(unstakedHatchlings);
  };

  const fetchStakedBees = async () => {
    if (!userInfoData) return;

    const stakedBeeArray: Hatchling[] = [];

    // Assume that we know the environment and hive IDs here, adjust as necessary
    for (let environmentId = 0; environmentId < 6; environmentId++) {
      for (let hiveId = 0; hiveId < 9; hiveId++) {
        const { data: stakedBeesData } = useReadHiveStakingGetStakedNfTsInHive({
          args: [BigInt(environmentId), BigInt(hiveId)],
        });

        if (stakedBeesData) {
          stakedBeesData.forEach((bee: any) => {
            stakedBeeArray.push({
              id: Number(bee.tokenId),
              imageAddress: imageUrl || "/default-image.png",
              status: "Staked",
              environment: environmentId.toString(),
              hive: hiveId.toString(),
            });
          });
        }
      }
    }
    setStakedBees(stakedBeeArray);
  };

  useEffect(() => {
    if (uri && !imageUrl && totalMinted) {
      fetchMetadata(uri).then((image) => setImageUrl(image));
    }
  }, [uri, totalMinted]);

  useEffect(() => {
    if (batchBalances && address && imageUrl) {
      setLoadingBees(true);
      fetchBeesData()
        .then(() => fetchStakedBees())
        .finally(() => setLoadingBees(false));
    }
  }, [batchBalances, address, imageUrl]);

  useEffect(() => {
    if (!isConnected) {
      setBees([]);
      setStakedBees([]);
      setActiveBeeState(null);
    }
  }, [isConnected]);

  return (
    <UserContext.Provider
      value={{
        activeBee,
        setActiveBee,
        bees,
        stakedBees,
        loadingBees,
        fetchError,
        address: address ?? null,
        isConnected,
        balance: balanceData?.formatted ?? null,
        approvalForStaking,
        checkAndPromptApproval,
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
