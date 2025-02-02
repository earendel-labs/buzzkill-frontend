// src/app/Play/Location/WhisperwoodValleys/BlackForestHive/hooks/useFetchStakedBees.ts

"use client";

import { useEffect, useState } from "react";
import { useHives } from "@/context/HivesContext";
import { Hatchling } from "@/types/Hatchling";
import { fetchMetadata } from "@/utils/fetchMetaData";
import useDebounce from "@/hooks/useDebounce";

interface UseFetchStakedBeesProps {
  hiveIdNumber: number;
}

export default function useFetchStakedBees({
  hiveIdNumber,
}: UseFetchStakedBeesProps) {
  const {
    stakedNFTs,
    getStakedNFTsByHiveId,
    loading: hivesLoading,
    error: hivesError,
  } = useHives();

  const [stakedBees, setStakedBees] = useState<Hatchling[]>([]);
  const [isBeesLoading, setIsBeesLoading] = useState<boolean>(true);
  const [beesError, setBeesError] = useState<string | null>(null);
  const [loadingBees, setLoadingBees] = useState<boolean>(false);

  const debouncedLoadingBees = useDebounce(loadingBees, 300);

  // Helper to create a Hatchling
  const createHatchling = (
    id: number,
    rarity: string,
    imageAddress: string,
    status: "Free" | "Staked",
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
    const fetchBeesWithMetadata = async () => {
      setLoadingBees(true);
      try {
        const filteredStakedNFTs = getStakedNFTsByHiveId(hiveIdNumber);
        const fetchedStakedBees: Hatchling[] = await Promise.all(
          filteredStakedNFTs.map(async (nft) => {
            const metadata = await fetchMetadata(nft.tokenId?.tokenURI);
            return createHatchling(
              parseInt(nft.tokenIdNum, 10),
              nft.tokenId.rarity,
              metadata,
              "Staked",
              nft.environmentId?.environmentId || null,
              nft.hiveId?.hiveId || null,
              nft.ownerId?.id || ""
            );
          })
        );
        setStakedBees(fetchedStakedBees);
        setBeesError(null);
      } catch (error) {
        console.error("Failed to load bee metadata:", error);
        setBeesError("Failed to load bee metadata.");
      } finally {
        setLoadingBees(false);
      }
    };

    if (!hivesLoading && !hivesError) {
      fetchBeesWithMetadata();
    } else if (hivesError) {
      setBeesError(hivesError.message);
      setLoadingBees(false);
    }
  }, [
    stakedNFTs,
    hiveIdNumber,
    hivesLoading,
    hivesError,
    getStakedNFTsByHiveId,
  ]);

  return {
    stakedBees,
    isBeesLoading,
    beesError,
    loadingBees: debouncedLoadingBees,
    setIsBeesLoading,
    setBeesError,
  };
}
