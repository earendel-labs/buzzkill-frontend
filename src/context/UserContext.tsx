// src/context/UserContext.tsx

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  useAccount,
  useBalance,
  useReadContracts,
  useTransaction,
} from "wagmi";
import {
  buzzkillHatchlingsNftAbi,
  useReadBuzzkillHatchlingsNftBalanceOf,
  useReadBuzzkillHatchlingsNftMaxSupply,
  useReadBuzzkillHatchlingsNftTokenUri,
  useReadBuzzkillHatchlingsNftOwnerOf,
  useWriteBuzzkillHatchlingsNftSetApprovalForAll,
  useReadBuzzkillHatchlingsNftIsApprovedForAll,
} from "@/hooks/BuzzkillHatchlingsNFT";
import {
  useReadHiveStakingUserInfo,
  useReadHiveStakingGetAllStakedNfTsForUser,
  useReadHiveStakingTotalBeesStaked,
  useReadHiveStakingGetStakedNfTsInHive,
} from "@/hooks/HiveStaking";
import hiveStakingAbi from "@/app/libs/abi/HiveStaking.json"; // Import your ABI
import { Hatchling, HatchlingStatus } from "@/types/Hatchling";

import { useQuery } from "@apollo/client";
// import getUserStakedTokensQuery from "@/subquery/getUserStakedTokens.gql";
// import getUserUnstakedTokensQuery from "@/subquery/getUserUnstakedTokens.gql";

//src/pages/api/subquery/getUserStakedTokens.gql
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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

  // Fetch all staked NFTs for the user with correct typing
  const {
    data: allStakedNFTsData,
    isError: isStakedNFTsError,
    error: stakedNFTsError,
  } = useReadHiveStakingGetAllStakedNfTsForUser({
    args: [address ?? "0x0000000000000000000000000000000000000000"],
  });

  // const {
  //   data: stakedData,
  //   loading: loadingStaked,
  //   error: errorStaked,
  // } = useQuery(getUserStakedTokensQuery, {
  //   variables: { userId: address },
  //   skip: !isConnected || !address,
  // });

  // const {
  //   data: tokensData,
  //   loading: loadingTokens,
  //   error: errorTokens,
  // } = useQuery(getUserUnstakedTokensQuery, {
  //   variables: { userId: address },
  //   skip: !isConnected || !address,
  // });

  useEffect(() => {
    if (isStakedNFTsError) {
      console.error("Error fetching staked NFTs:", stakedNFTsError);
    } else {
      console.log("Fetched staked NFTs:", allStakedNFTsData);
    }
  }, [isStakedNFTsError, stakedNFTsError, allStakedNFTsData]);

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

  const fetchMetadata = async (metadataUri: string): Promise<string> => {
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

  const ipfsToHttp = (ipfsUri: string): string => {
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
    hiveID: string | null,
    ownerAddress: string
  ): Hatchling => ({
    id,
    imageAddress,
    status,
    environmentID,
    hiveID,
    ownerAddress,
  });

  /**
   * Fetch Unstaked Bees (Bees Owned by the User)
   */
  const fetchUnstakedBees = async (
    totalSupply: number,
    address: string,
    imageUrl: string | null
  ) => {
    if (!address || !totalSupply || !imageUrl) {
      setLoadingBees(false);
      return;
    }

    try {
      // Prepare contract read configurations for ownerOf
      const contractReads = Array.from({ length: totalSupply }, (_, index) => ({
        abi: buzzkillHatchlingsNftAbi,
        address: buzzkillHatchlingsNftAddress,
        functionName: "ownerOf",
        args: [BigInt(index + 1)],
      }));

      // Use useContractReads to fetch all owners in a single hook without 'select'
      const {
        data: ownersData,
        isError: isOwnersError,
        error: ownersError,
      } = useReadContracts({
        contracts: contractReads,
      });

      if (isOwnersError) {
        console.error("Error fetching owners:", ownersError);
        setFetchError(true);
        setLoadingBees(false);
        return;
      }

      // Assert ownersData as string[] safely
      let owners: string[] = [];
      if (ownersData && Array.isArray(ownersData)) {
        owners = ownersData
          .map((result) => {
            if (
              result.status === "success" &&
              typeof result.result === "string"
            ) {
              return result.result;
            } else {
              console.error("Failed to fetch owner:", result.error);
              setFetchError(true);
              setLoadingBees(false);
              return "";
            }
          })
          .filter((owner): owner is string => owner !== "");
      }

      // Filter tokens owned by the user
      const ownedTokenIds =
        owners
          ?.map((owner, idx) =>
            owner.toLowerCase() === address.toLowerCase() ? idx + 1 : null
          )
          .filter((tokenId): tokenId is number => tokenId !== null) || [];

      // Fetch token URIs for owned tokens
      const tokenUriReads = ownedTokenIds.map((tokenId) => ({
        abi: buzzkillHatchlingsNftAbi,
        address: buzzkillHatchlingsNftAddress,
        functionName: "tokenURI",
        args: [BigInt(tokenId)],
      }));
      var isValidNFT = ownedTokenIds.length > 0;
      // Use useReadContracts to fetch all token URIs without 'select'
      const {
        data: tokenUrisData,
        isError: isTokenUriError,
        error: tokenUriError,
      } = useReadContracts({
        contracts: tokenUriReads,
      });

      if (isTokenUriError) {
        console.error("Error fetching token URIs:", tokenUriError);
        setFetchError(true);
        setLoadingBees(false);
        return;
      }

      // Assert tokenUrisData as string[] safely
      let tokenUris: string[] = [];
      if (tokenUrisData && Array.isArray(tokenUrisData)) {
        tokenUris = tokenUrisData
          .map((result) => {
            if (
              result.status === "success" &&
              typeof result.result === "string"
            ) {
              return result.result;
            } else {
              console.error("Failed to fetch token URI:", result.error);
              setFetchError(true);
              setLoadingBees(false);
              return "";
            }
          })
          .filter((uri): uri is string => uri !== "");
      }

      // Fetch metadata for each token URI
      const metadataPromises = tokenUris.map((uri: string) =>
        fetchMetadata(uri)
      );
      const images = await Promise.all(metadataPromises);

      // Create Hatchling objects
      const unstakedHatchlings: Hatchling[] = ownedTokenIds.map(
        (tokenId, idx) =>
          createHatchling(
            tokenId,
            images[idx] || "/default-image.png",
            "Free",
            null,
            null,
            address
          )
      );

      console.log("Unstaked Hatchlings:", unstakedHatchlings);
      setBees(unstakedHatchlings);
    } catch (err) {
      console.error("Error in fetchUnstakedBees:", err);
      setFetchError(true);
    } finally {
      setLoadingBees(false);
    }
  };

  /**
   * Fetch Staked Bees
   */
  interface StakedNFT {
    tokenId: bigint;
    stakedAt: bigint;
    environmentId: bigint;
    hiveId: bigint;
    lastClaimedAt: bigint;
  }

  const fetchStakedBees = (
    allStakedNFTsData: ReadonlyArray<StakedNFT>,
    imageUrl: string | null,
    address: string
  ) => {
    if (!allStakedNFTsData || !imageUrl || !address) {
      return;
    }

    const stakedBeeArray: Hatchling[] = allStakedNFTsData.map((nft) => {
      const tokenId = Number(nft.tokenId);
      const environmentID = nft.environmentId?.toString() || null;
      const hiveID = nft.hiveId?.toString() || null;

      return createHatchling(
        tokenId,
        imageUrl || "/default-image.png",
        "Staked",
        environmentID,
        hiveID,
        address
      );
    });

    console.log("Fetched Staked Bees:", stakedBeeArray);
    setStakedBees(stakedBeeArray);
  };

  /**
   * Function to refresh all bees data
   */
  const refreshBeesData = async () => {
    console.log("Refreshing bees data due to event...");
    setLoadingBees(true);
    setFetchError(false);

    try {
      if (totalSupply && address && imageUrl && buzzkillHatchlingsNftAddress) {
        await fetchUnstakedBees(Number(totalSupply), address, imageUrl);
      }

      if (allStakedNFTsData && imageUrl && address) {
        fetchStakedBees(allStakedNFTsData, imageUrl, address);
      }
    } catch (error) {
      console.error("Failed to refresh bees data:", error);
      setFetchError(true);
    } finally {
      setLoadingBees(false);
    }
  };

  /**
   * Initial Data Fetching
   */
  useEffect(() => {
    const initializeData = async () => {
      setLoadingBees(true);
      setFetchError(false);

      try {
        if (
          isConnected &&
          address &&
          totalSupply &&
          balanceOf &&
          buzzkillHatchlingsNftAddress
        ) {
          await fetchUnstakedBees(
            Number(totalSupply),
            address,
            imageUrl || "/default-image.png"
          );
          if (allStakedNFTsData) {
            fetchStakedBees(allStakedNFTsData, imageUrl, address);
          }
        } else {
          // Reset state when not connected
          setBees([]);
          setStakedBees([]);
          setActiveBeeState(null);
          setImageUrl(null);
          setLoadingBees(false);
          setFetchError(false);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        setFetchError(true);
      } finally {
        setLoadingBees(false);
      }
    };

    initializeData();
  }, [
    isConnected,
    address,
    totalSupply,
    balanceOf,
    allStakedNFTsData,
    imageUrl,
    buzzkillHatchlingsNftAddress,
  ]);

  /**
   * Stake a Bee
   */
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
            hiveID,
            address as string
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

  /**
   * Unstake a Bee
   */
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
            null,
            address as string
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
