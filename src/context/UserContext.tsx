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
            stakedData.stakedNFTs.nodes.map(async (nft: any) => ({
              id: parseInt(nft.tokenIdNum, 10),
              imageAddress: await fetchMetadata(nft.token.tokenURI),
              status: "Staked" as HatchlingStatus,
              environmentID: nft.environment?.environmentId || null,
              hiveID: nft.hive?.hiveId || null,
              ownerAddress: address || "",
            }))
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
            tokensData.tokens.nodes
              .filter((token: any) => !token.isStaked)
              .map(async (token: any) => ({
                id: parseInt(token.tokenIdNum || token.id, 10), // Adjust based on your schema
                imageAddress: await fetchMetadata(token.tokenURI),
                status: "Free" as HatchlingStatus,
                environmentID: null,
                hiveID: null,
                ownerAddress: address || "",
              }))
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

  /*
   * Stake a Bee
   */
  const stakeBee = async (
    beeId: number,
    environmentID: string,
    hiveID: string
  ) => {
    console.log(`Attempting to stake Bee ID ${beeId}`);
    // setBees((prevBees) => {
    //   const beeToStake = prevBees.find((bee) => bee.id === beeId);
    //   if (beeToStake) {
    //     console.log(`Staking Bee ID ${beeId}:`, beeToStake);
    //     setStakedBees((prevStakedBees) => {
    //       const hatchling = createHatchling(
    //         beeToStake.id,
    //         beeToStake.imageAddress,
    //         "Staked",
    //         environmentID,
    //         hiveID,
    //         beeToStake.ownerAddress
    //       );
    //       const updatedStakedBees = [...prevStakedBees, hatchling];
    //       console.log(
    //         `Added Bee ID ${beeId} to stakedBees:`,
    //         updatedStakedBees
    //       );
    //       return updatedStakedBees;
    //     });
    //     const updatedBees = prevBees.filter((bee) => bee.id !== beeId);
    //     console.log(
    //       `Removed Bee ID ${beeId} from bees. Updated bees:`,
    //       updatedBees
    //     );

    //     return updatedBees;
    //   } else {
    //     console.warn(`Bee ID ${beeId} not found in unstaked bees.`);
    //     return prevBees;
    //   }
    // });
    await refreshBeesData();
  };

  /**
   * Unstake a Bee
   */
  const unstakeBee = async (beeId: number) => {
    console.log(`Attempting to unstake Bee ID ${beeId}`);
    setStakedBees((prevStakedBees) => {
      const beeToUnstake = prevStakedBees.find((bee) => bee.id === beeId);
      if (beeToUnstake) {
        console.log(`Unstaking Bee ID ${beeId}:`, beeToUnstake);
        setBees((prevBees) => {
          const hatchling = createHatchling(
            beeToUnstake.id,
            beeToUnstake.rarity,
            beeToUnstake.imageAddress,
            "Free",
            null,
            null,
            beeToUnstake.ownerAddress
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
    await refreshBeesData();
  };

  // Function to refresh all bees data
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
