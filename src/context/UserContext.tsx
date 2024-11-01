// src/context/UserContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAccount, useBalance, useReadContract } from "wagmi";
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
import { Hatchling } from "@/types/Hatchling";

const hiveStakingAddress = process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS;

// Function-specific ABI for `getAllStakedNFTsForUser`
const getAllStakedNFTsForUserABI = [
  {
    type: "function",
    name: "getAllStakedNFTsForUser",
    inputs: [],
    outputs: [
      {
        name: "",
        internalType: "struct HiveStaking.StakedNFT[]",
        type: "tuple[]",
        components: [
          { name: "tokenId", internalType: "uint256", type: "uint256" },
          { name: "stakedAt", internalType: "uint256", type: "uint256" },
          { name: "environmentId", internalType: "uint256", type: "uint256" },
          { name: "hiveId", internalType: "uint256", type: "uint256" },
          { name: "lastClaimedAt", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
];

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
  if (isError) {
    console.error("Error fetching staked NFTs:", error);
  } else {
    console.log("Fetched staked NFTs:", allStakedNFTsData);
  }
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

  const result = useReadContract({
    abi: getAllStakedNFTsForUserABI,
    address: hiveStakingAddress,
    functionName: "getAllStakedNFTsForUser",
  });

  console.log("result", result);

  // Fetch total staked bees
  const { data: totalStaked } = useReadHiveStakingTotalBeesStaked();
  console.log("totalStaked", totalStaked);
  const { data: AllStakedInHive } = useReadHiveStakingGetStakedNfTsInHive({
    args: [BigInt(2), BigInt(2)],
  });

  console.log("AllStakedInHive", AllStakedInHive);

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
      return "/default-image.png"; // Fallback image
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
          environmentID: null,
          hiveID: null,
        });
      }
    }
    console.log("Unstaked Hatchlings:", unstakedHatchlings);
    setBees(unstakedHatchlings);
  };

  useEffect(() => {
    if (allStakedNFTsData) {
      const stakedBeeArray: Hatchling[] = [];
      console.log("allStakedNFTsData:", allStakedNFTsData); // Log to inspect data

      // Assuming allStakedNFTsData is an array of StakedNFTData
      allStakedNFTsData.forEach((nft: any) => {
        const tokenId = Number(nft.tokenId);
        const environmentID = nft.environmentId.toString();
        const hiveID = nft.hiveId.toString();

        if (!isNaN(tokenId)) {
          stakedBeeArray.push({
            id: tokenId,
            imageAddress: imageUrl || "/default-image.png",
            status: "Staked",
            environmentID: environmentID || null,
            hiveID: hiveID || null,
          });
        }
      });

      console.log("Fetched Staked Bees:", stakedBeeArray);
      setStakedBees(stakedBeeArray);
    }
  }, [allStakedNFTsData, imageUrl]);

  useEffect(() => {
    if (uri && !imageUrl && totalMinted) {
      fetchMetadata(uri).then((image) => setImageUrl(image));
    }
  }, [uri, totalMinted]);

  useEffect(() => {
    if (batchBalances && address && imageUrl) {
      setLoadingBees(true);
      fetchBeesData().finally(() => setLoadingBees(false));
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
