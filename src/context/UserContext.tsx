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
import { pollUntilCondition } from "@/app/utils/polling";

import { fetchMetadata } from "@/app/utils/fetchMetaData";
import { useApolloClient } from "@apollo/client"; // Import hook to access Apollo client

import { useQuery } from "@apollo/client";
import { GET_USER_STAKED_TOKENS } from "@/subquery/getUserStakedTokens";
import { GET_USER_UNSTAKED_TOKENS } from "@/subquery/getUserUnstakedTokens";

// Define interfaces for GraphQL query results
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
    action?: "stake" | "unstake"
  ) => Promise<void>;
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
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  } = useQuery<StakedNFTsData>(GET_USER_STAKED_TOKENS, {
    variables: { userId: lowercaseAddress },
    skip: !isConnected || !lowercaseAddress,
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        const stakedBeesData = data.stakedNFTs.edges.map((edge) => ({
          id: parseInt(edge.node.tokenIdNum, 10),
          rarity: edge.node.tokenId.rarity,
          imageAddress: "", // Fetch metadata later if needed
          status: "Staked" as HatchlingStatus,
          environmentID: edge.node.environmentId?.environmentId || null,
          hiveID: edge.node.hiveId?.hiveId || null,
          ownerAddress: address || "",
        }));
        setStakedBees(stakedBeesData);
        console.log("Updated stakedBees in onCompleted:", stakedBeesData);
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
        const unstakedBeesData = data.tokens.edges
          .map((edge) => edge.node)
          .filter((node) => !node.isStaked)
          .map((node) => ({
            id: parseInt(node.id, 10),
            rarity: node.rarity,
            imageAddress: "", // Fetch metadata later if needed
            status: "Free" as HatchlingStatus,
            environmentID: null,
            hiveID: null,
            ownerAddress: node.owner || address || "",
          }));
        setBees(unstakedBeesData);
        console.log("Updated unstakedBees in onCompleted:", unstakedBeesData);
      }
    },
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

  const stakedDataRef = useRef(stakedData);
  const unstakedDataRef = useRef(tokensData);
  const client = useApolloClient(); // Get Apollo client from ApolloProvider

  // Function to fetch staked bees
  const fetchStakedBees = useCallback(async () => {
    if (stakedData) {
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
        setStakedBees(fetchedStakedBees);
      } catch (error) {
        console.error("Error fetching staked bees metadata:", error);
        setFetchError(true);
      }
    }
  }, [stakedData, address]);

  // Function to fetch unstaked bees
  const fetchUnstakedBees = useCallback(async () => {
    if (tokensData) {
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
        setBees(fetchedUnstakedBees);
      } catch (error) {
        console.error("Error fetching unstaked bees metadata:", error);
        setFetchError(true);
      }
    }
  }, [tokensData, address]);

  useEffect(() => {
    stakedDataRef.current = stakedData;
  }, [stakedData]);

  // Keep unstakedDataRef updated
  useEffect(() => {
    unstakedDataRef.current = tokensData;
  }, [tokensData]);
  console.log("stakedNFTs", stakedData);
  // Initial data fetching
  useEffect(() => {
    if (errorStaked) {
      console.error("Error fetching staked tokens:", errorStaked);
    }
    if (errorTokens) {
      console.error("Error fetching tokens:", errorTokens);
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
    fetchStakedBees,
    fetchUnstakedBees,
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

  useEffect(() => {
    if (stakedData) {
      const stakedBeesData: Hatchling[] = stakedData.stakedNFTs.edges.map(
        (edge) => ({
          id: parseInt(edge.node.tokenIdNum, 10),
          rarity: edge.node.tokenId.rarity,
          imageAddress: "", // Assume you want to fetch metadata here later
          status: "Staked" as HatchlingStatus,
          environmentID: edge.node.environmentId?.environmentId || null,
          hiveID: edge.node.hiveId?.hiveId || null,
          ownerAddress: address || "",
        })
      );
      setStakedBees(stakedBeesData);
      console.log("Staked Bees updated from stakedData:", stakedBeesData);
    }
  }, [stakedData, address]);

  // Updated: Function to refresh all bees data with polling
  const refreshBeesData = useCallback(
    async (beeId?: number, action?: "stake" | "unstake" | "mint") => {
      if (!isConnected || !lowercaseAddress) {
        console.log("User not connected or address missing. Skipping refresh.");
        return;
      }
      setIsRefreshing(true); // Start refreshing
      setLoadingBees(true); // Set loading state to true

      try {
        console.log("Refreshing staked and unstaked tokens in UserContext...");

        // Fetch both staked and unstaked data
        const [stakedResult, unstakedResult] = await Promise.all([
          refetchStakedData(),
          refetchUnstakedData(),
        ]);

        // Update React state with the latest data
        if (stakedResult.data) {
          const updatedStakedBees = stakedResult.data.stakedNFTs.edges.map(
            (edge: any) => ({
              id: parseInt(edge.node.tokenIdNum, 10),
              rarity: edge.node.tokenId.rarity,
              imageAddress: "", // Metadata fetching if necessary
              status: "Staked" as HatchlingStatus,
              environmentID: edge.node.environmentId?.environmentId || null,
              hiveID: edge.node.hiveId?.hiveId || null,
              ownerAddress: address || "",
            })
          );
          setStakedBees(updatedStakedBees);
          stakedDataRef.current = stakedResult.data; // Update ref
          console.log("Staked bees updated:", updatedStakedBees);
        }

        if (unstakedResult.data) {
          const updatedUnstakedBees = unstakedResult.data.tokens.edges
            .map((edge: any) => edge.node)
            .filter((node: any) => !node.isStaked)
            .map((node: any) => ({
              id: parseInt(node.id, 10),
              rarity: node.rarity,
              imageAddress: "", // Metadata fetching if necessary
              status: "Free" as HatchlingStatus,
              environmentID: null,
              hiveID: null,
              ownerAddress: node.owner || address || "",
            }));
          setBees(updatedUnstakedBees);
          unstakedDataRef.current = unstakedResult.data; // Update ref
          console.log("Unstaked bees updated:", updatedUnstakedBees);
        }

        // Handle specific actions like "stake", "unstake", or "mint"
        switch (action) {
          case "unstake":
            if (beeId) {
              client.cache.modify({
                fields: {
                  stakedNFTs(
                    existingStakedNFTs = { edges: [] },
                    { readField }
                  ) {
                    return {
                      ...existingStakedNFTs,
                      edges: existingStakedNFTs.edges.filter(
                        (edge: any) =>
                          Number(readField("tokenIdNum", edge.node)) !== beeId
                      ),
                    };
                  },
                  tokens(existingTokens = { edges: [] }, { readField }) {
                    return {
                      ...existingTokens,
                      edges: [
                        ...existingTokens.edges,
                        {
                          __typename: "UnstakedNFTNode",
                          id: beeId.toString(),
                          rarity: "Common", // Replace with actual rarity
                          tokenURI: "ipfs://example", // Replace with actual URI
                          isStaked: false,
                          owner: address,
                        },
                      ],
                    };
                  },
                },
              });
            }
            break;
          case "stake":
            if (beeId) {
              client.cache.modify({
                fields: {
                  stakedNFTs(existingStakedNFTs = { edges: [] }) {
                    return {
                      ...existingStakedNFTs,
                      edges: [
                        ...existingStakedNFTs.edges,
                        {
                          __typename: "StakedNFTNode",
                          tokenIdNum: beeId.toString(),
                          rarity: "Rare", // Replace with actual rarity
                          environmentId: null, // Replace with actual environment
                          hiveId: null, // Replace with actual hive
                          owner: address,
                        },
                      ],
                    };
                  },
                  tokens(existingTokens = { edges: [] }, { readField }) {
                    return {
                      ...existingTokens,
                      edges: existingTokens.edges.filter(
                        (edge: any) =>
                          Number(readField("id", edge.node)) !== beeId
                      ),
                    };
                  },
                },
              });
            }
            break;
          case "mint":
            if (beeId) {
              client.cache.modify({
                fields: {
                  tokens(existingTokens = { edges: [] }) {
                    return {
                      ...existingTokens,
                      edges: [
                        ...existingTokens.edges,
                        {
                          __typename: "UnstakedNFTNode",
                          id: beeId.toString(),
                          rarity: "Legendary", // Replace with actual rarity
                          tokenURI: "ipfs://newBeeURI", // Replace with actual URI
                          isStaked: false,
                          owner: address,
                        },
                      ],
                    };
                  },
                },
              });
            }
            break;
          default:
            console.log("General refresh without specific action.");
        }
      } catch (error) {
        console.error("Error refreshing bees data:", error);
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
    ]
  );

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

  // Log current bees for debugging
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
