"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { Hatchling } from "@/types/Hatchling";
import { BeeCard } from "@/components/Card/BeeCard";
import ProfileLayout from "@/components/Layouts/ProfileLayout/ProfileLayout";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { useUserContext } from "@/context/UserContext";
import {
  useReadBuzzkillHatchlingsNftBalanceOfBatch,
  useReadBuzzkillHatchlingsNftTotalMinted,
  useReadBuzzkillHatchlingsNftUri,
} from "@/hooks/BuzzkillHatchlingsNFT";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

const MyBeesTab = () => {
  const { address } = useAccount();
  const [myBees, setMyBees] = useState<Hatchling[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const router = useRouter();
  const { setActiveBee, checkAndPromptApproval } = useUserContext();

  const { data: totalMinted } = useReadBuzzkillHatchlingsNftTotalMinted();
  const { data: uri } = useReadBuzzkillHatchlingsNftUri({ args: [BigInt(1)] });

  const userAddress = address || "0x0000000000000000000000000000000000000000";
  const addressesArray = Array.from(
    { length: Number(totalMinted) },
    () => userAddress
  );

  const { data: batchBalances } = useReadBuzzkillHatchlingsNftBalanceOfBatch({
    args: [
      addressesArray as `0x${string}`[],
      Array.from({ length: Number(totalMinted) }, (_, i) => BigInt(i + 1)),
    ],
  });

  const handlePlayClick = async (beeId: number): Promise<void> => {
    try {
      const isApproved = await checkAndPromptApproval();
      if (isApproved) {
        setActiveBee(beeId);
        router.push("/Play");
      }
    } catch (error) {
      console.error("Error during approval check:", error);
    }
  };

  const ipfsToHttp = (ipfsUri: string) => {
    if (ipfsUri.startsWith("ipfs://")) {
      return ipfsUri.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    }
    return ipfsUri;
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

  const fetchHatchlings = async () => {
    if (!batchBalances || !address || !imageUrl || !totalMinted) {
      setLoading(false);
      return;
    }

    const hatchlings: Hatchling[] = [];
    for (let i = 0; i < totalMinted; i++) {
      const balance = batchBalances[i];
      if (balance && Number(balance) > 0) {
        hatchlings.push({
          id: i + 1,
          imageAddress: imageUrl || "/default-image.png",
          status: "Free",
          environment: null,
        });
      }
    }

    setMyBees(hatchlings);
    setLoading(false);
  };

  useEffect(() => {
    if (uri && !imageUrl && totalMinted) {
      fetchMetadata(uri).then((image: string) => setImageUrl(image));
    }
  }, [uri, totalMinted]);

  useEffect(() => {
    if (batchBalances && address && imageUrl) {
      setLoading(true);
      fetchHatchlings();
    }
  }, [batchBalances, address, imageUrl]);

  return (
    <ProfileLayout loading={loading}>
      <Typography variant="h5" color="white" sx={{ mb: 4 }}>
        Hatchlings
      </Typography>
      <Grid container spacing={3}>
        {!loading && myBees.length === 0 && !fetchError ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="60vh"
          >
            <Typography marginTop="24px" marginBottom="24px">
              No Bees Found. Mint yours here
            </Typography>
            <PrimaryButton text="Mint" onClick={() => router.push("/Mint")} />
          </Box>
        ) : (
          myBees.map((bee) => (
            <Grid item xs={6} sm={4} md={3} key={`bee-${bee.id}`}>
              <BeeCard bee={bee} onPlayClick={handlePlayClick} />
            </Grid>
          ))
        )}
      </Grid>
      {loading && <HexagonSpinner />}
      {fetchError && (
        <Typography variant="h6" color="error">
          Failed to load hatchlings, please try again later.
        </Typography>
      )}
    </ProfileLayout>
  );
};

export default MyBeesTab;
