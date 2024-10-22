"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import {
  useReadBuzzkillHatchlingsNftBalanceOfBatch,
  useReadBuzzkillHatchlingsNftTotalMinted,
  useReadBuzzkillHatchlingsNftUri,
} from "@/hooks/BuzzkillHatchlingsNFT";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import ProfileLayout from "../page";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { useUserContext } from "@/context/UserContext";

// Define the type for hatchlings
interface Hatchling {
  id: number;
  imageAddress: string;
  status: string;
  environment: string | null;
}

// Styled component for hover effect and layout
const BeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover .overlay, &:hover .playButtonWrapper": {
    opacity: 1,
    visibility: "visible",
  },
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.8)",
  },
}));

// Styled chip components for status and environment
const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  backgroundColor: status === "Free" ? "green" : theme.palette.info.main,
  color: "white",
  borderRadius: "2px",
}));

const EnvironmentChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  borderRadius: "2px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:active": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Overlay component to display the Play button on hover
const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// Wrapper for positioning the Play button
const PlayButtonWrapper = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s ease",
});

const MyBeesTab = () => {
  const { address } = useAccount();
  const [myBees, setMyBees] = useState<Hatchling[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const router = useRouter();
  const { setActiveBee } = useUserContext();

  const { data: totalMinted } = useReadBuzzkillHatchlingsNftTotalMinted();
  const { data: uri } = useReadBuzzkillHatchlingsNftUri({ args: [BigInt(1)] });

  const userAddress = address
    ? address
    : "0x0000000000000000000000000000000000000000"; // Provide a default address if not available

  const { data: batchBalances } = useReadBuzzkillHatchlingsNftBalanceOfBatch({
    args: [
      Array.from({ length: Number(totalMinted) }, () => userAddress),
      Array.from({ length: Number(totalMinted) }, (_, i) => BigInt(i + 1)),
    ],
  });

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
          status: "Free", // Default status (can be updated based on staking logic)
          environment: null, // Default environment (can be updated if staked)
        });
      }
    }

    setMyBees(hatchlings);
    setLoading(false);
  };

  useEffect(() => {
    if (uri && !imageUrl && totalMinted) {
      fetchMetadata(uri).then((image) => setImageUrl(image));
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
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
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
              <BeeCard>
                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Hatchling ID: {bee.id}
                </Typography>
                <Box
                  component="img"
                  src={bee.imageAddress}
                  alt={`Hatchling ${bee.id}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                {bee.status === "Free" && (
                  <>
                    <Overlay className="overlay" />
                    <PlayButtonWrapper className="playButtonWrapper">
                      <PrimaryButton
                        onClick={() => {
                          setActiveBee(bee.id);
                          router.push("/Play");
                        }}
                        text="Play"
                      />
                    </PlayButtonWrapper>
                  </>
                )}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <StatusChip
                    label={bee.status || "Free"}
                    status={bee.status || "Free"}
                  />

                  {bee.status === "Staked" && bee.environment && (
                    <EnvironmentChip
                      label={bee.environment}
                      onClick={() =>
                        console.log(`Navigate to ${bee.environment}`)
                      }
                    />
                  )}
                </Box>
              </BeeCard>
            </Grid>
          ))
        )}
      </Grid>

      <Box id="sentinel" sx={{ height: "20px", visibility: "hidden" }} />

      {loading && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="vh"
          flexGrow={1}
        >
          <HexagonSpinner />
          <Typography marginTop="24px">Fetching data...</Typography>
        </Box>
      )}

      {fetchError && (
        <Typography variant="h6" color="error">
          Failed to load hatchlings, please try again later.
        </Typography>
      )}
    </ProfileLayout>
  );
};

export default MyBeesTab;
