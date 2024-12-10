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
import {
  buzzkillHatchlingsNftAbi,
  useReadBuzzkillHatchlingsNftBalanceOf,
  useReadBuzzkillHatchlingsNftMaxSupply,
  useReadBuzzkillHatchlingsNftIsApprovedForAll,
  useWriteBuzzkillHatchlingsNftSetApprovalForAll,
} from "@/hooks/BuzzkillHatchlingsNFT";
import {
  useReadHiveStakingUserInfo,
  useReadHiveStakingTotalBeesStaked,
} from "@/hooks/HiveStaking";
import { Hatchling, HatchlingStatus } from "@/types/Hatchling";

import { fetchMetadata } from "@/app/utils/fetchMetaData";

import { useQuery } from "@apollo/client";
import { GET_USER_STAKED_TOKENS } from "@/subquery/getUserStakedTokens";
import { GET_USER_UNSTAKED_TOKENS } from "@/subquery/getUserUnstakedTokens";

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
  refreshBeesData: () => void;
  checkAndPromptApproval: () => Promise<boolean>;
  stakeBee: (beeId: number, environmentID: string, hiveID: string) => void;
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
  const [approvalForStaking, setApprovalForStaking] = useState(false);
  const [isCheckingApproval, setIsCheckingApproval] = useState(false);

  const hiveStakingAddress = process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS as
    | `0x${string}`
    | undefined;

  const buzzkillHatchlingsNftAddress = process.env
    .NEXT_PUBLIC_HATCHLINGS_ADDRESS as `0x${string}` | undefined;

  // ERC721 Hooks
  const { data: totalSupply } = useReadBuzzkillHatchlingsNftMaxSupply();
  const { data: balanceOf } = useReadBuzzkillHatchlingsNftBalanceOf({
    args: [address || "0x0000000000000000000000000000000000000000"],
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

  // Fetch total staked bees
  const { data: totalStaked } = useReadHiveStakingTotalBeesStaked();

  const lowercaseAddress = address?.toLowerCase();

  // GraphQL Queries
  const {
    data: stakedData,
    loading: loadingStaked,
    error: errorStaked,
    refetch: refetchStakedData,
  } = useQuery(GET_USER_STAKED_TOKENS, {
    variables: { userId: lowercaseAddress },
    skip: !isConnected || !lowercaseAddress,
    fetchPolicy: "network-only",
  });

  const {
    data: tokensData,
    loading: loadingTokens,
    error: errorTokens,
    refetch: refetchUnstakedData,
  } = useQuery(GET_USER_UNSTAKED_TOKENS, {
    variables: { userId: lowercaseAddress },
    skip: !isConnected || !lowercaseAddress,
    fetchPolicy: "network-only",
  });

  const createHatchling = (
    id: number,
    rarity: string,
    imageAddress: string,
    status: HatchlingStatus,
    environmentID: string | null,
    hiveID: string | null,
    ownerAddress: string
  ): Hatchling => ({
    id,
    rarity,
    imageAddress,
    status,
    environmentID,
    hiveID,
    ownerAddress,
  });

  useEffect(() => {
    if (errorStaked) {
      console.error("Error fetching staked tokens:", errorStaked);
    }
    if (errorTokens) {
      console.error("Error fetching tokens:", errorTokens);
    }

    const fetchStakedBees = async () => {
      if (stakedData) {
        try {
          const fetchedStakedBees: Hatchling[] = await Promise.all(
            stakedData.stakedNFTs.edges.map(async (edge: any) => {
              const nft = edge.node;
              const metadata = await fetchMetadata(nft.tokenId.tokenURI);
              return {
                id: parseInt(nft.tokenIdNum, 10),
                rarity: nft.tokenId.rarity,
                imageAddress: metadata,
                status: "Staked" as HatchlingStatus,
                environmentID: nft.environmentId?.environmentId || null,
                hiveID: nft.hiveId?.hiveId || null,
                ownerAddress: address || "",
              };
            })
          );
          setStakedBees(fetchedStakedBees);
        } catch (error) {
          console.error("Error fetching staked bees metadata:", error);
          setFetchError(true);
        }
      }
    };

    const fetchUnstakedBees = async () => {
      if (tokensData) {
        try {
          const fetchedUnstakedBees: Hatchling[] = await Promise.all(
            tokensData.tokens.edges
              .map((edge: any) => edge.node)
              .filter((token: any) => !token.isStaked)
              .map(async (token: any) => {
                const metadata = await fetchMetadata(token.tokenURI);
                return {
                  id: parseInt(token.id, 10),
                  rarity: token.rarity,
                  imageAddress: metadata,
                  status: "Free" as HatchlingStatus,
                  environmentID: null,
                  hiveID: null,
                  ownerAddress: token.owner || address || "",
                };
              })
          );
          setBees(fetchedUnstakedBees);
        } catch (error) {
          console.error("Error fetching unstaked bees metadata:", error);
          setFetchError(true);
        }
      }
    };

    if (stakedData) {
      fetchStakedBees();
    }

    if (tokensData) {
      fetchUnstakedBees();
    }

    setLoadingBees(loadingStaked || loadingTokens);
    setFetchError(!!errorStaked || !!errorTokens);
  }, [
    stakedData,
    tokensData,
    loadingStaked,
    loadingTokens,
    errorStaked,
    errorTokens,
    address,
  ]);

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

  // ADDED: Function to refresh all bees data
  const refreshBeesData = async () => {
    if (!isConnected || !lowercaseAddress) {
      console.log("User not connected or address missing. Skipping refresh.");
      return;
    }

    try {
      console.log("Refreshing staked and unstaked tokens...");
      await Promise.all([refetchStakedData(), refetchUnstakedData()]);
      console.log("Refresh complete.");
    } catch (error) {
      console.error("Error refreshing bees data:", error);
      setFetchError(true);
    }
  };

  const stakeBee = async (
    beeId: number,
    environmentID: string,
    hiveID: string
  ) => {
    console.log(`Attempting to stake Bee ID ${beeId}`);
    // After successful on-chain tx, refreshBeesData will be called externally.
  };

  const unstakeBee = async (beeId: number) => {
    console.log(`Attempting to unstake Bee ID ${beeId}`);
    // After successful on-chain tx, refreshBeesData will be called externally.
  };

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
        stakeBee,
        unstakeBee,
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
