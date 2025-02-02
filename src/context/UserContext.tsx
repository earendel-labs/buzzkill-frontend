// src/context/UserContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { useAccount, useBalance } from "wagmi";
import {
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
import { pollUntilCondition } from "@/utils/polling";
import { fetchMetadata } from "@/utils/fetchMetaData";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER_STAKED_TOKENS } from "@/subquery/getUserStakedTokens";
import { GET_USER_UNSTAKED_TOKENS } from "@/subquery/getUserUnstakedTokens";
import { logger } from "@/utils/logger";

// ----------- GraphQL Interfaces -----------
interface StakedNFTNode {
  tokenIdNum: string;
  tokenId: {
    rarity: string;
    tokenURI: string;
  };
  environmentId?: {
    environmentId: string;
  };
  hiveId?: {
    hiveId: string;
  };
}

interface StakedNFTEdge {
  node: StakedNFTNode;
}

interface StakedNFTsData {
  stakedNFTs: {
    edges: StakedNFTEdge[];
  };
}

interface UnstakedNFTNode {
  id: string;
  rarity: string;
  tokenURI: string;
  isStaked: boolean;
  owner: string;
}

interface UnstakedNFTEdge {
  node: UnstakedNFTNode;
}

interface UnstakedNFTsData {
  tokens: {
    edges: UnstakedNFTEdge[];
  };
}

// ----------- Context Interface -----------
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
  refreshBeesData: (
    beeId?: number,
    action?: "stake" | "unstake" | "mint",
    mintedQuantity?: number
  ) => Promise<void>;
  checkAndPromptApproval: () => Promise<boolean>;
  stakeBee: (beeId: number, environmentID: string, hiveID: string) => void;
  unstakeBee: (beeId: number) => void;
  // Expose isRefreshing so the UI can hide partial states
  isRefreshing: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });

  // ----------------------
  // State & Flags
  // ----------------------
  const [activeBee, setActiveBeeState] = useState<number | null>(null);
  const [bees, setBees] = useState<Hatchling[]>([]);
  const [stakedBees, setStakedBees] = useState<Hatchling[]>([]);
  const [loadingBees, setLoadingBees] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [approvalForStaking, setApprovalForStaking] = useState(false);
  const [isCheckingApproval, setIsCheckingApproval] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const hiveStakingAddress = process.env.NEXT_PUBLIC_HIVE_STAKING_ADDRESS as
    | `0x${string}`
    | undefined;

  const buzzkillHatchlingsNftAddress = process.env
    .NEXT_PUBLIC_HATCHLINGS_ADDRESS as `0x${string}` | undefined;

  // ----------------------
  // Contract Hooks
  // ----------------------
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

  // ----------------------
  // Additional On-chain Reads
  // ----------------------
  const { data: userInfoData } = useReadHiveStakingUserInfo({
    args: [address ?? "0x0000000000000000000000000000000000000000"],
  });
  const { data: totalStaked } = useReadHiveStakingTotalBeesStaked();

  const lowercaseAddress = address?.toLowerCase();

  // ----------------------
  // GraphQL Queries
  // ----------------------
  const {
    data: stakedData,
    loading: loadingStaked,
    error: errorStaked,
    refetch: refetchStakedData,
  } = useQuery<StakedNFTsData>(GET_USER_STAKED_TOKENS, {
    variables: { userId: lowercaseAddress },
    skip: !isConnected || !lowercaseAddress,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        // Map staked data
        const stakedBeesData: Hatchling[] = data.stakedNFTs.edges.map(
          (edge) => ({
            id: parseInt(edge.node.tokenIdNum, 10),
            rarity: edge.node.tokenId.rarity,
            imageAddress: "",
            status: "Staked" as HatchlingStatus,
            environmentID: edge.node.environmentId?.environmentId || null,
            hiveID: edge.node.hiveId?.hiveId || null,
            ownerAddress: address || "",
          })
        );
        // Deduplicate staked bees by id
        const uniqueStakedBees = Array.from(
          new Map(stakedBeesData.map((bee) => [bee.id, bee])).values()
        );
        setStakedBees(uniqueStakedBees);
      }
    },
  });

  const {
    data: tokensData,
    loading: loadingTokens,
    error: errorTokens,
    refetch: refetchUnstakedData,
  } = useQuery<UnstakedNFTsData>(GET_USER_UNSTAKED_TOKENS, {
    variables: { userId: lowercaseAddress },
    skip: !isConnected || !lowercaseAddress,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        // Map unstaked data
        const unstakedBeesData: Hatchling[] = data.tokens.edges
          .map((edge) => edge.node)
          .filter((node) => !node.isStaked)
          .map((node) => ({
            id: parseInt(node.id, 10),
            rarity: node.rarity,
            imageAddress: "",
            status: "Free" as HatchlingStatus,
            environmentID: null,
            hiveID: null,
            ownerAddress: node.owner || address || "",
          }));
        // Deduplicate unstaked bees by id
        const uniqueUnstakedBees = Array.from(
          new Map(unstakedBeesData.map((bee) => [bee.id, bee])).values()
        );
        setBees(uniqueUnstakedBees);
      }
    },
  });

  const stakedDataRef = useRef(stakedData);
  const unstakedDataRef = useRef(tokensData);
  const client = useApolloClient();

  // Keep stakedDataRef updated
  useEffect(() => {
    stakedDataRef.current = stakedData;
  }, [stakedData]);

  // Keep unstakedDataRef updated
  useEffect(() => {
    unstakedDataRef.current = tokensData;
  }, [tokensData]);

  // ----------------------
  // Initial Data Fetch
  // ----------------------
  useEffect(() => {
    if (errorStaked) {
      logger.error("Error fetching staked tokens:", errorStaked);
    }
    if (errorTokens) {
      logger.error("Error fetching tokens:", errorTokens);
    }

    // Optionally fetch metadata once:
    fetchStakedBees();
    fetchUnstakedBees();

    setLoadingBees(loadingStaked || loadingTokens);
    setFetchError(!!errorStaked || !!errorTokens);
  }, [
    stakedData,
    tokensData,
    loadingStaked,
    loadingTokens,
    errorStaked,
    errorTokens,
  ]);

  // ----------------------
  // Fetch Staked Bees w/ Metadata
  // ----------------------
  const fetchStakedBees = useCallback(async () => {
    if (!stakedData) return;
    try {
      const fetchedStakedBees: Hatchling[] = await Promise.all(
        stakedData.stakedNFTs.edges.map(async (edge: StakedNFTEdge) => {
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
      // Deduplicate before setting state
      const uniqueStakedBees = Array.from(
        new Map(fetchedStakedBees.map((bee) => [bee.id, bee])).values()
      );
      setStakedBees(uniqueStakedBees);
    } catch (error) {
      logger.error("Error fetching staked bees metadata:", error);
      setFetchError(true);
    }
  }, [stakedData, address]);

  // ----------------------
  // Fetch Unstaked Bees w/ Metadata
  // ----------------------
  const fetchUnstakedBees = useCallback(async () => {
    if (!tokensData) return;
    try {
      const fetchedUnstakedBees: Hatchling[] = await Promise.all(
        tokensData.tokens.edges
          .map((edge: UnstakedNFTEdge) => edge.node)
          .filter((token: UnstakedNFTNode) => !token.isStaked)
          .map(async (token: UnstakedNFTNode) => {
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
      // Deduplicate before setting state
      const uniqueUnstakedBees = Array.from(
        new Map(fetchedUnstakedBees.map((bee) => [bee.id, bee])).values()
      );
      setBees(uniqueUnstakedBees);
    } catch (error) {
      logger.error("Error fetching unstaked bees metadata:", error);
      setFetchError(true);
    }
  }, [tokensData, address]);

  // ----------------------
  // Optional effect to update stakedBees if stakedData changes
  // ----------------------
  useEffect(() => {
    if (stakedData) {
      const stakedBeesData: Hatchling[] = stakedData.stakedNFTs.edges.map(
        (edge: any) => {
          const beeId = parseInt(edge.node.tokenIdNum, 10);
          let existingBee =
            stakedBees.find((b) => b.id === beeId) ||
            bees.find((b) => b.id === beeId);
          return {
            id: beeId,
            rarity: edge.node.tokenId.rarity,
            imageAddress: existingBee?.imageAddress || "",
            status: "Staked" as HatchlingStatus,
            environmentID: edge.node.environmentId?.environmentId || null,
            hiveID: edge.node.hiveId?.hiveId || null,
            ownerAddress: address || "",
          };
        }
      );
      // Deduplicate before setting state
      const uniqueStakedBees = Array.from(
        new Map(stakedBeesData.map((bee) => [bee.id, bee])).values()
      );
      setStakedBees(uniqueStakedBees);
    }
  }, [stakedData, address]);

  // ----------------------
  // setActiveBee
  // ----------------------
  const setActiveBee = (beeId: number | null) => {
    logger.log(`Setting activeBee to: ${beeId}`);
    setActiveBeeState(beeId);
  };

  // ----------------------
  // Approval Logic
  // ----------------------
  const checkAndPromptApproval = async () => {
    if (!address || !hiveStakingAddress || isApproved === undefined) {
      logger.log("Address, hive staking, or approval status is not available.");
      return false;
    }

    setIsCheckingApproval(true);
    logger.log("Checking if approval is already set...");

    if (!isApproved) {
      logger.log("Prompting user to approve staking contract...");
      try {
        await approveTokens({
          args: [hiveStakingAddress, true],
        });
        setApprovalForStaking(true);
        setIsCheckingApproval(false);
        return true;
      } catch (error) {
        logger.error("Failed to set approval:", error);
        setApprovalForStaking(false);
        setIsCheckingApproval(false);
        return false;
      }
    } else {
      setApprovalForStaking(true);
      setIsCheckingApproval(false);
      return true;
    }
  };

  // -----------------------------------------------------------------
  // REFRESH BEES (With Polling & Re-using Old Metadata)
  // Option B: We'll hide partial states in the UI if isRefreshing = true
  // -----------------------------------------------------------------
  const refreshBeesData = useCallback(
    async (
      beeId?: number,
      action?: "stake" | "unstake" | "mint",
      mintedQuantity?: number
    ) => {
      if (!isConnected || !lowercaseAddress) {
        logger.log("User not connected or address missing. Skipping refresh.");
        return;
      }

      // Indicate we are refreshing to hide partial states in the UI
      setIsRefreshing(true);
      setLoadingBees(true);

      const oldUnstakedCount = bees.length;

      try {
        // 1) Define a condition function for polling
        const isBeesDataUpdated = async (): Promise<boolean> => {
          const [stakedRes, unstakedRes] = await Promise.all([
            refetchStakedData({ fetchPolicy: "network-only" }),
            refetchUnstakedData({ fetchPolicy: "network-only" }),
          ]);

          const stakedDataResult = stakedRes.data;
          const unstakedDataResult = unstakedRes.data;
          if (!stakedDataResult || !unstakedDataResult) {
            logger.warn("Polling: No data returned.");
            return false;
          }

          // Minimal arrays to check presence
          const updatedStakedBeesShort = stakedDataResult.stakedNFTs.edges.map(
            (edge: any) => ({
              id: parseInt(edge.node.tokenIdNum, 10),
            })
          );
          const updatedUnstakedBeesShort = unstakedDataResult.tokens.edges
            .map((edge: any) => edge.node)
            .filter((node: any) => !node.isStaked)
            .map((node: any) => ({
              id: parseInt(node.id, 10),
            }));

          const isBeeStaked = beeId
            ? updatedStakedBeesShort.some((b) => b.id === beeId)
            : false;

          if (action === "stake") {
            return isBeeStaked;
          }
          if (action === "unstake") {
            return !isBeeStaked;
          }
          if (action === "mint") {
            const newUnstakedBeesCount = updatedUnstakedBeesShort.length;
            const expectedCount = oldUnstakedCount + (mintedQuantity ?? 1);
            return newUnstakedBeesCount >= expectedCount;
          }

          // If no action, return true
          return true;
        };

        // 2) Poll until condition is met
        const pollingResult = await pollUntilCondition(
          isBeesDataUpdated,
          1000,
          10
        );
        logger.log("Polling completed. Condition met:", pollingResult);

        // 3) Optional short delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 4) Final fetch & update state, re-using old metadata
        const [finalStakedRes, finalUnstakedRes] = await Promise.all([
          refetchStakedData({ fetchPolicy: "network-only" }),
          refetchUnstakedData({ fetchPolicy: "network-only" }),
        ]);

        // ----------------------
        // Final STAKED
        // ----------------------
        if (finalStakedRes.data) {
          const updatedStaked = finalStakedRes.data.stakedNFTs.edges.map(
            (edge: any) => {
              const beeID = parseInt(edge.node.tokenIdNum, 10);
              let existingBee =
                stakedBees.find((b) => b.id === beeID) ||
                bees.find((b) => b.id === beeID);
              return {
                id: beeID,
                rarity: edge.node.tokenId.rarity,
                imageAddress: existingBee?.imageAddress || "",
                status: "Staked" as HatchlingStatus,
                environmentID: edge.node.environmentId?.environmentId || null,
                hiveID: edge.node.hiveId?.hiveId || null,
                ownerAddress: address || "",
              };
            }
          );
          // Deduplicate final staked bees array
          const uniqueFinalStaked = Array.from(
            new Map(
              updatedStaked.map((bee: Hatchling) => [bee.id, bee])
            ).values()
          );
          setStakedBees(uniqueFinalStaked);
          stakedDataRef.current = finalStakedRes.data;
        }

        // ----------------------
        // Final UNSTAKED
        // ----------------------
        if (finalUnstakedRes.data) {
          const updatedUnstaked = finalUnstakedRes.data.tokens.edges
            .map((edge: any) => edge.node)
            .filter((node: any) => !node.isStaked)
            .map((node: any) => {
              const beeID = parseInt(node.id, 10);
              let existingBee =
                bees.find((b) => b.id === beeID) ||
                stakedBees.find((b) => b.id === beeID);
              return {
                id: beeID,
                rarity: node.rarity,
                imageAddress: existingBee?.imageAddress || "",
                status: "Free" as HatchlingStatus,
                environmentID: null,
                hiveID: null,
                ownerAddress: node.owner || address || "",
              };
            });
          // Deduplicate final unstaked bees array
          const uniqueFinalUnstaked = Array.from(
            new Map(
              updatedUnstaked.map((bee: Hatchling) => [bee.id, bee])
            ).values()
          );
          setBees(uniqueFinalUnstaked);
          unstakedDataRef.current = finalUnstakedRes.data;
        }
      } catch (error) {
        logger.error("Error refreshing bees data:", error);
        setFetchError(true);
      } finally {
        setLoadingBees(false);
        setIsRefreshing(false);
      }
    },
    [
      isConnected,
      lowercaseAddress,
      refetchStakedData,
      refetchUnstakedData,
      address,
      bees,
      stakedBees,
    ]
  );

  // ----------------------
  // Example stake/un-stake methods
  // ----------------------
  const stakeBee = async (
    beeId: number,
    environmentID: string,
    hiveID: string
  ) => {
    logger.log(`Attempting to stake Bee ID ${beeId}`);
    // after on-chain TX, call refreshBeesData(beeId, "stake")
  };

  const unstakeBee = async (beeId: number) => {
    logger.log(`Attempting to unstake Bee ID ${beeId}`);
    // after on-chain TX, call refreshBeesData(beeId, "unstake")
  };

  // ----------------------
  // Debug Logging
  // ----------------------
  useEffect(() => {
    logger.log("Current Unstaked Bees:", bees);
  }, [bees]);

  useEffect(() => {
    logger.log("Current Staked Bees:", stakedBees);
  }, [stakedBees]);

  // ----------------------
  // Render Provider
  // ----------------------
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
        isRefreshing,
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
