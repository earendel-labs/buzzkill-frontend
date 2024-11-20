// src/context/UserContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccount, useBalance } from "wagmi";
import { Log } from "viem"; // Ensure this import is correct
import {
  useReadBuzzkillHatchlingsNftBalanceOfBatch,
  useReadBuzzkillHatchlingsNftTotalMinted,
  useReadBuzzkillHatchlingsNftUri,
  useWriteBuzzkillHatchlingsNftSetApprovalForAll,
  useReadBuzzkillHatchlingsNftIsApprovedForAll,
} from "@/hooks/BuzzkillHatchlingsNFT";
import {
  useReadHiveStakingUserInfo,
  useReadHiveStakingGetAllStakedNfTsForUser,
  useReadHiveStakingTotalBeesStaked,
  useReadHiveStakingGetStakedNfTsInHive,
} from "@/hooks/HiveStaking";
import { useWatchContractEvent } from "wagmi"; // Import the hook directly
import hiveStakingAbi from "@/app/libs/abi/HiveStaking.json"; // Import your ABI
import { Hatchling, HatchlingStatus } from "@/types/Hatchling";

interface UserContextType {
  activeBee: number | null;
  setActiveBee: (beeId: number | null) => void;
  bees: Hatchling[];
  stakedBees: Hatchling[];
  loadingBees: boolean;
  fetchError: boolean;
  address: string | null;
  isConnected: boolean;
  balance: string | null;
  approvalForStaking: boolean;
  checkAndPromptApproval: () => Promise<boolean>;
  refreshBeesData: () => void;
  stakeBee: (beeId: number, environmentID: string, hiveID: string) => void; // Updated
  unstakeBee: (beeId: number) => void;
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

  // Fetch user info data
  const { data: userInfoData } = useReadHiveStakingUserInfo({
    args: [address ?? "0x0000000000000000000000000000000000000000"],
  });

  // Fetch all staked NFTs for the user
  const {
    data: allStakedNFTsData,
    isError,
    error,
  } = useReadHiveStakingGetAllStakedNfTsForUser({
    args: [address ?? "0x0000000000000000000000000000000000000000"],
  });

  useEffect(() => {
    if (isError) {
      console.error("Error fetching staked NFTs:", error);
    } else {
      console.log("Fetched staked NFTs:", allStakedNFTsData);
    }
  }, [isError, error, allStakedNFTsData]);

  console.log("Connected address:", address);
  console.log("userInfoData", userInfoData);
  console.log("Data Type:", typeof allStakedNFTsData);
  console.log("Data Structure:", allStakedNFTsData);

  useEffect(() => {
    if (allStakedNFTsData && allStakedNFTsData.length > 0) {
      console.log("Staked NFTs:", allStakedNFTsData);
    } else {
      console.log("Staked NFTs data is not yet available.");
    }
  }, [allStakedNFTsData]);

  // Fetch total staked bees
  const { data: totalStaked } = useReadHiveStakingTotalBeesStaked();
  console.log("totalStaked", totalStaked);
  const { data: AllStakedInHive } = useReadHiveStakingGetStakedNfTsInHive({
    args: [BigInt(2), BigInt(2)],
  });

  console.log("AllStakedInHive", AllStakedInHive);

  const setActiveBee = (beeId: number | null) => {
    console.log(`Setting activeBee to: ${beeId}`);
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
      return "/default-image.png"; // Fallback image
    }
  };

  const ipfsToHttp = (ipfsUri: string) => {
    if (ipfsUri.startsWith("ipfs://")) {
      return ipfsUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    }
    return ipfsUri;
  };

  // Helper function to create Hatchling objects
  const createHatchling = (
    id: number,
    imageAddress: string,
    status: HatchlingStatus,
    environmentID: string | null,
    hiveID: string | null
  ): Hatchling => ({
    id,
    imageAddress,
    status,
    environmentID,
    hiveID,
  });

  // Fetch unstaked (free) bees
  const fetchUnstakedBees = async () => {
    if (!batchBalances || !address || !imageUrl || !totalMinted) {
      setLoadingBees(false);
      return;
    }

    const unstakedHatchlings: Hatchling[] = [];
    for (let i = 0; i < Number(totalMinted); i++) {
      const balance = batchBalances[i];
      if (balance && Number(balance) > 0) {
        const hatchling = createHatchling(
          i + 1,
          imageUrl || "/default-image.png",
          "Free",
          null,
          null
        );
        unstakedHatchlings.push(hatchling);
      }
    }
    console.log("Unstaked Hatchlings:", unstakedHatchlings);
    setBees(unstakedHatchlings);
  };

  // Fetch staked bees
  const fetchStakedBees = async () => {
    if (!allStakedNFTsData || !imageUrl) {
      return;
    }

    const stakedBeeArray: Hatchling[] = [];
    console.log("allStakedNFTsData:", allStakedNFTsData); // Log to inspect data

    allStakedNFTsData.forEach((nft: any) => {
      const tokenId = Number(nft.tokenId);
      const environmentID = nft.environmentId?.toString() || null;
      const hiveID = nft.hiveId?.toString() || null;

      if (!isNaN(tokenId)) {
        const hatchling = createHatchling(
          tokenId,
          imageUrl || "/default-image.png",
          "Staked",
          environmentID,
          hiveID
        );
        stakedBeeArray.push(hatchling);
      }
    });

    console.log("Fetched Staked Bees:", stakedBeeArray);
    setStakedBees(stakedBeeArray);
  };

  // Function to refresh all bees data
  const refreshBeesData = async () => {
    console.log("Refreshing bees data due to event...");
    setLoadingBees(true);
    try {
      // Re-fetch unstaked bees
      await fetchUnstakedBees();

      // Re-fetch staked bees
      await fetchStakedBees();
    } catch (error) {
      console.error("Failed to refresh bees data:", error);
      setFetchError(true);
    } finally {
      setLoadingBees(false);
    }
  };

  // Initial data fetching
  useEffect(() => {
    const initializeData = async () => {
      setLoadingBees(true);
      try {
        if (uri && !imageUrl && totalMinted) {
          const image = await fetchMetadata(uri);
          setImageUrl(image);
        }
        await fetchUnstakedBees();
        await fetchStakedBees();
      } catch (error) {
        console.error("Error initializing data:", error);
        setFetchError(true);
      } finally {
        setLoadingBees(false);
      }
    };

    if (isConnected) {
      initializeData();
    } else {
      // Reset state when not connected
      setBees([]);
      setStakedBees([]);
      setActiveBeeState(null);
      setImageUrl(null);
      setLoadingBees(false);
      setFetchError(false);
    }
  }, [isConnected, address, batchBalances, uri, totalMinted, imageUrl]);

  // Function to move a bee from unstaked to staked
  const stakeBee = (beeId: number, environmentID: string, hiveID: string) => {
    console.log(`Attempting to stake Bee ID ${beeId}`);
    setBees((prevBees) => {
      const beeToStake = prevBees.find((bee) => bee.id === beeId);
      if (beeToStake) {
        console.log(`Staking Bee ID ${beeId}:`, beeToStake);
        setStakedBees((prevStakedBees) => {
          const hatchling = createHatchling(
            beeToStake.id,
            beeToStake.imageAddress,
            "Staked",
            environmentID,
            hiveID
          );
          const updatedStakedBees = [...prevStakedBees, hatchling];
          console.log(
            `Added Bee ID ${beeId} to stakedBees:`,
            updatedStakedBees
          );
          return updatedStakedBees;
        });
        const updatedBees = prevBees.filter((bee) => bee.id !== beeId);
        console.log(
          `Removed Bee ID ${beeId} from bees. Updated bees:`,
          updatedBees
        );
        return updatedBees;
      } else {
        console.warn(`Bee ID ${beeId} not found in unstaked bees.`);
        return prevBees;
      }
    });
  };

  const unstakeBee = (beeId: number) => {
    console.log(`Attempting to unstake Bee ID ${beeId}`);
    setStakedBees((prevStakedBees) => {
      const beeToUnstake = prevStakedBees.find((bee) => bee.id === beeId);
      if (beeToUnstake) {
        console.log(`Unstaking Bee ID ${beeId}:`, beeToUnstake);
        setBees((prevBees) => {
          const hatchling = createHatchling(
            beeToUnstake.id,
            beeToUnstake.imageAddress,
            "Free",
            null,
            null
          );
          const updatedBees = [...prevBees, hatchling];
          console.log(`Added Bee ID ${beeId} back to bees:`, updatedBees);
          return updatedBees;
        });
        const updatedStakedBees = prevStakedBees.filter(
          (bee) => bee.id !== beeId
        );
        console.log(
          `Removed Bee ID ${beeId} from stakedBees. Updated stakedBees:`,
          updatedStakedBees
        );
        return updatedStakedBees;
      } else {
        console.warn(`Bee ID ${beeId} not found in staked bees.`);
        return prevStakedBees;
      }
    });
  };

  // Optional: Log bees and stakedBees whenever they change
  useEffect(() => {
    console.log("Current Unstaked Bees:", bees);
  }, [bees]);

  useEffect(() => {
    console.log("Current Staked Bees:", stakedBees);
  }, [stakedBees]);

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
        refreshBeesData,
        stakeBee, // Provide stakeBee with updated signature
        unstakeBee, // Provide unstakeBee
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
