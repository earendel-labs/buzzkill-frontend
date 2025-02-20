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
  useReadHiveStakingGetUserPoints,
} from "@/hooks/HiveStaking";
import { Hatchling, HatchlingStatus } from "@/types/Hatchling";
import { pollUntilCondition } from "@/utils/polling";
import { fetchMetadata } from "@/utils/fetchMetaData";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_USER_STAKED_TOKENS } from "@/subquery/getUserStakedTokens";
import { GET_USER_UNSTAKED_TOKENS } from "@/subquery/getUserUnstakedTokens";
import { GET_USER_REWARDS_DATA } from "@/subquery/getUserRewardsData";
import { logger } from "@/utils/logger";
import { mutate } from "swr";

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
  lastClaimedAt: string; // Must be returned from your query (in seconds)
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

export interface UserRewards {
  id: string;
  mintedCount: number;
  lastMintedTime: string;
  stakingApproved: boolean;
  totalPoints: number;
  claimedPoints: number;
  totalProduction: number;
  averageProduction: number;
  userRewardMultiplier: number;
  hasExternalNFTFlag: boolean;
  unclaimedPoints?: number; // New field for computed pending points
}

// ----------- Context Interface -----------
interface UserContextType {
  activeBee: number | null;
  setActiveBee: (beeId: number | null) => void;
  bees: Hatchling[];
  stakedBees: Hatchling[];
  loadingBees: boolean;
  userRewards: UserRewards | null;
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
  pollForClaimUpdate: (oldTotalPoints: number) => Promise<void>;
  checkAndPromptApproval: () => Promise<boolean>;
  fetchServerCalculatedRewards: () => Promise<void>;
  stakeBee: (beeId: number, environmentID: string, hiveID: string) => void;
  unstakeBee: (beeId: number) => void;
  isRefreshing: boolean;
  liveUnclaimedPoints: number; // Live counter for unclaimed yield
  onChainPoints: number | null;
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
  const [userRewards, setUserRewards] = useState<UserRewards | null>(null);
  // New state to trigger recalculation after a claim
  const [claimTimestamp, setClaimTimestamp] = useState<number>(0);
  // Live counter for the unclaimed yield (updates minute-by-minute)
  const [liveUnclaimedPoints, setLiveUnclaimedPoints] = useState<number>(0);
  const [onChainPoints, setOnChainPoints] = useState<number | null>(null);
  const [pointsPerSecond, setPointsPerSecond] = useState(0);

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

  const { data: onChainUserPointsData, refetch: refetchUserPoints } =
    useReadHiveStakingGetUserPoints({
      args: [address ?? "0x0000000000000000000000000000000000000000"],
    });

  useEffect(() => {
    if (onChainUserPointsData) {
      const parsedPoints = parseFloat(onChainUserPointsData.toString());
      setOnChainPoints(parsedPoints);
    }
  }, [onChainUserPointsData]);

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
        const uniqueStakedBees = Array.from(
          new Map(stakedBeesData.map((bee) => [bee.id, bee])).values()
        );
        setStakedBees(uniqueStakedBees);
      }
    },
  });
  const {
    data: rewardsData,
    loading: loadingRewards,
    error: errorRewards,
    refetch: refetchRewardsData,
  } = useQuery(GET_USER_REWARDS_DATA, {
    variables: { userId: lowercaseAddress },
    skip: !isConnected || !lowercaseAddress,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        const rewardInfo: UserRewards = {
          id: data.users.edges[0].node.id,
          mintedCount: data.users.edges[0].node.mintedCount,
          lastMintedTime: data.users.edges[0].node.lastMintedTime,
          stakingApproved: data.users.edges[0].node.stakingApproved,
          totalPoints: data.users.edges[0].node.totalPoints,
          claimedPoints: data.users.edges[0].node.claimedPoints,
          totalProduction: data.users.edges[0].node.totalProduction,
          averageProduction: data.users.edges[0].node.averageProduction,
          userRewardMultiplier: data.users.edges[0].node.userRewardMultiplier,
          hasExternalNFTFlag: data.users.edges[0].node.hasExternalNFTFlag,
        };
        setUserRewards(rewardInfo);
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

  useEffect(() => {
    if (errorRewards) {
      logger.error("Error fetching user rewards data:", errorRewards);
    }
  }, [errorRewards]);

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

  // Refetch rewards data whenever claimTimestamp updates.
  useEffect(() => {
    if (claimTimestamp) {
      refetchRewardsData();
    }
  }, [claimTimestamp, refetchRewardsData]);

  // --------------------------------------------------------
  // SERVER-SIDE CALCULATION (Using getStakingData)
  // --------------------------------------------------------
  // 1. Fetch from your Next.js API once, store the result as the base
  // 2. Increment the result locally
  const fetchServerCalculatedRewards = useCallback(async () => {
    if (!address) return;
    try {
      const res = await fetch(
        `/api/user/rewards/getStakingData?address=${address}`
      );
      if (!res.ok) {
        logger.error("Failed to fetch server staking data.");
        return;
      }
      const data = await res.json();
      logger.log("Server unclaimed base:", data.totalUnclaimed);
      logger.log("Points per second:", data.pointsPerSecond);
      setLiveUnclaimedPoints(data.totalUnclaimed || 0);
      setPointsPerSecond(data.pointsPerSecond || 0);
    } catch (err) {
      logger.error("Error in fetchServerCalculatedRewards:", err);
    }
  }, [address]);

  // Call the fetch once on mount (or when connection changes)
  useEffect(() => {
    if (isConnected) {
      fetchServerCalculatedRewards();
    }
  }, [isConnected, fetchServerCalculatedRewards]);

  // Timer: update live yield every second using the fetched rate
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUnclaimedPoints((prev) => prev + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [pointsPerSecond]);

  // ----------------------
  // Polling for On-Chain Claim Update.
  // This function polls the smart contract until the user points (getUserPoints)
  // are updated, then updates the context state.
  // ----------------------
  const pollForOnChainPoints = async (oldPoints: number) => {
    const maxAttempts = 30;
    const intervalMs = 2000;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      try {
        const result = await refetchUserPoints();
        if (result.data) {
          const newPoints = parseFloat(result.data.toString());
          if (newPoints > oldPoints) {
            setOnChainPoints(newPoints);
            setUserRewards((prev) =>
              prev ? { ...prev, totalPoints: newPoints } : null
            );
            // Clear live counter when the claim is detected.
            setLiveUnclaimedPoints(0);
            break;
          }
        }
      } catch (err) {
        logger.error("Error polling on-chain points:", err);
      }
    }
  };

  // Modify pollForClaimUpdate to call pollForOnChainPoints, then update both the Apollo and SWR caches.
  const pollForClaimUpdate = async (oldTotalPoints: number) => {
    await pollForOnChainPoints(oldTotalPoints);
    // Refetch subgraph data (Apollo query)
    refetchRewardsData();
    // Force revalidation of the profile data in ProfileContext.
    mutate("/api/user/getProfile");
  };

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
      setIsRefreshing(true);
      setLoadingBees(true);
      const oldUnstakedCount = bees.length;
      const oldUnstakedBeeIds = bees.map((b) => b.id);
      try {
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
          return true;
        };
        const pollingResult = await pollUntilCondition(
          isBeesDataUpdated,
          1500,
          120
        );
        logger.log("Polling completed. Condition met:", pollingResult);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const [finalStakedRes, finalUnstakedRes] = await Promise.all([
          refetchStakedData({ fetchPolicy: "network-only" }),
          refetchUnstakedData({ fetchPolicy: "network-only" }),
        ]);
        if (finalStakedRes.data) {
          logger.log(`inside finalStakedRes.data`, finalStakedRes.data);
          const updatedStaked = finalStakedRes.data.stakedNFTs.edges.map(
            (edge: any) => {
              const beeID = parseInt(edge.node.tokenIdNum, 10);
              const existingBee =
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
          const uniqueFinalStaked = Array.from(
            new Map(updatedStaked.map((bee) => [bee.id, bee])).values()
          );
          setStakedBees(uniqueFinalStaked);
          stakedDataRef.current = finalStakedRes.data;
        }
        if (finalUnstakedRes.data) {
          logger.log(`inside finalUnstakedRes`, finalUnstakedRes.data);
          const updatedUnstaked = finalUnstakedRes.data.tokens.edges
            .map((edge: any) => edge.node)
            .filter((node: any) => !node.isStaked)
            .map((node: any) => {
              const beeID = parseInt(node.id, 10);
              const existingBee =
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
          const uniqueFinalUnstaked = Array.from(
            new Map(updatedUnstaked.map((bee) => [bee.id, bee])).values()
          );
          setBees(uniqueFinalUnstaked);
          unstakedDataRef.current = finalUnstakedRes.data;
          if (action === "mint") {
            logger.log(`inside action === mint`);
            const newMintedBees = uniqueFinalUnstaked.filter(
              (b) => !oldUnstakedBeeIds.includes(b.id)
            );
            for (const bee of newMintedBees) {
              let taskName = "Mint Common Hatchling";
              if (bee.rarity === "Rare") {
                taskName = "Mint Rare Hatchling";
              } else if (bee.rarity === "Ultra-Rare") {
                taskName = "Mint Ultra-Rare Hatchling";
              }
              try {
                logger.log(
                  `Attempting to award mint reward for task: ${taskName}`
                );
                const response = await fetch("/api/rewards/awardMintRewards", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ task: taskName }),
                });

                // Check the response status and log accordingly
                if (!response.ok) {
                  logger.error(
                    `Failed to award mint points. Status: ${response.status}, Message: ${response.statusText}`
                  );
                  return;
                }

                const data = await response.json();
                logger.log(
                  `Successfully awarded points for minted NFT ID ${bee.id} with rarity ${bee.rarity}`,
                  data
                );
                mutate("/api/user/getProfile");
              } catch (err) {
                logger.error("Error calling awardMintPoints:", err);
              }
            }
          }
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
      setIsRefreshing,
      setLoadingBees,
      setFetchError,
      setBees,
      setStakedBees,
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
        userRewards,
        fetchError,
        address: address ?? null,
        isConnected,
        balance: balanceData?.formatted ?? null,
        approvalForStaking,
        checkAndPromptApproval,
        fetchServerCalculatedRewards,
        refreshBeesData,
        pollForClaimUpdate,
        stakeBee,
        unstakeBee,
        isRefreshing,
        liveUnclaimedPoints,
        onChainPoints,
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
