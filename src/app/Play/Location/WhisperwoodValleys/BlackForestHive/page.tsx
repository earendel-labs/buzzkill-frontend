// src/app/Play/Location/WhisperwoodValleys/BlackForestHive/page.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Snackbar, Alert, Button, Modal } from "@mui/material";
import { useSound } from "@/context/SoundContext";
import HiveTopBar from "@/components/Layouts/GameLayout/HiveTopBar/HiveTopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HiveHatchlingsPanel from "@/components/ControlPanels/Hive/HiveStatsPanel/HiveHatchlingsPanel/HiveHatchlingsPanel";
import BeeGrid from "@/components/ControlPanels/Hive/Bees/BeeGrid";
import {
  useWriteHiveStakingStake,
  useWriteHiveStakingUnstake,
} from "@/hooks/HiveStaking";
import Image from "next/image";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useUserContext } from "@/context/UserContext";
import { useWaitForTransactionReceipt } from "wagmi";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { Hatchling } from "@/types/Hatchling";
import { fetchMetadata } from "@/app/utils/fetchMetaData";
import { useHives } from "@/context/HivesContext";

// Define specific result types (if needed)
type HatchlingStatus = "Free" | "Staked";

interface HiveHatchlingInfo {
  productivityValue: number;
  CommonBees: number;
  RareBees: number;
  UltraRareBees: number;
  TotalBees: number;
  status: string;
  location: string;
  environment: string;
}

const BlackForestHive: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // From UserContext - includes staking and unstaking functions
  const {
    activeBee,
    checkAndPromptApproval,
    setActiveBee,
    stakeBee,
    unstakeBee,
    refreshBeesData,
  } = useUserContext();

  // From HivesContext - includes refreshHiveData
  const {
    environments,
    hivesMap,
    stakedNFTs,
    maxBeesMap,
    getHiveById,
    getStakedNFTsByHiveId,
    getMaxBeesByHiveId,
    loading: hivesLoading,
    error: hivesError,
    refreshHiveData,
  } = useHives();

  // Staking hooks
  const { writeContractAsync: stakeNFT, isPending: isStakingPending } =
    useWriteHiveStakingStake();
  const { writeContractAsync: unstakeNFT, isPending: isUnstakingPending } =
    useWriteHiveStakingUnstake();

  // Transaction state and feedback UI states
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmUnstakeModalOpen, setConfirmUnstakeModalOpen] = useState(false);

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  // Hard-coded environment and hive IDs for this example
  const environmentId = "2";
  const hiveId = "2";
  const environmentIdNumber = Number(environmentId);
  const hiveIdNumber = Number(hiveId);

  // Local state for staked bees with metadata
  const [stakedBees, setStakedBees] = useState<Hatchling[]>([]);
  const [isBeesLoading, setIsBeesLoading] = useState<boolean>(true);
  const [beesError, setBeesError] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio("/Audio/Soundtrack/Forest/Forest.wav");
    audio.loop = true;
    audio.volume = 0.8;
    setMusic(audio);

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (music) {
      if (isMusicMuted || isMuted) {
        music.pause();
      } else {
        music.play();
      }
    }
  }, [isMusicMuted, isMuted, music]);

  const navigate = (link: string) => {
    router.push(link);
  };

  // Fetch metadata for staked bees whenever stakedNFTs or hive data changes
  useEffect(() => {
    if (hivesLoading) {
      setIsBeesLoading(true);
      return;
    }

    if (hivesError) {
      console.error("Error fetching hives data:", hivesError);
      setBeesError(hivesError.message);
      setIsBeesLoading(false);
      return;
    }

    const fetchBeesWithMetadata = async () => {
      setIsBeesLoading(true);
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
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setBeesError("Failed to load bee metadata.");
      } finally {
        setIsBeesLoading(false);
      }
    };

    fetchBeesWithMetadata();
  }, [
    stakedNFTs,
    hiveIdNumber,
    hivesLoading,
    hivesError,
    getStakedNFTsByHiveId,
  ]);

  const handleConfirmStake = async () => {
    setConfirmModalOpen(false);
    try {
      if (activeBee === null) {
        setAlertSeverity("error");
        setAlertMessage("No active bee selected for staking.");
        setSnackbarOpen(true);
        return;
      }

      // Check if user has approved staking
      const isApproved = await checkAndPromptApproval();
      if (!isApproved) {
        setAlertSeverity("error");
        setAlertMessage("You need to approve the staking contract.");
        setSnackbarOpen(true);
        return;
      }

      // Proceed with staking transaction on-chain
      const tokenId = activeBee;
      const tx = await stakeNFT({
        args: [BigInt(tokenId), BigInt(environmentId), BigInt(hiveId)],
      });
      console.log("Staking transaction initiated:", tx);
      setTransactionHash(tx as `0x${string}`);
      setAlertSeverity("success");
      setAlertMessage("Staking transaction initiated!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to stake NFT:", error);
      setAlertSeverity("error");
      setAlertMessage("Failed to initiate staking.");
      setSnackbarOpen(true);
    }
  };

  const handleStake = () => {
    if (activeBee === null) {
      setAlertSeverity("error");
      setAlertMessage("Please select a bee to stake.");
      setSnackbarOpen(true);
      return;
    }
    setConfirmModalOpen(true);
  };

  const handleRaid = () => {
    console.log("Raid button clicked");
  };

  const handleConfirmUnstake = async () => {
    setConfirmUnstakeModalOpen(false);
    const targetBee = stakedBees.find((bee) => bee.id === activeBee);
    if (!targetBee || !targetBee.environmentID || !targetBee.hiveID) {
      setAlertSeverity("error");
      setAlertMessage("Invalid bee selected for unstaking.");
      setSnackbarOpen(true);
      return;
    }

    const { id, environmentID, hiveID } = targetBee;

    try {
      // Proceed with unstaking transaction on-chain
      const tx = await unstakeNFT({
        args: [BigInt(id), BigInt(environmentID), BigInt(hiveID)],
      });

      if (tx) {
        setTransactionHash(tx as `0x${string}`);
        console.log("Unstaking transaction initiated:", tx);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Transaction failed to initiate.");
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Failed to unstake the Hatchling:", err);
      setAlertSeverity("error");
      setAlertMessage("Failed to unstake the Hatchling.");
      setSnackbarOpen(true);
    }
  };

  const handleUnstake = () => {
    if (activeBee === null) {
      setAlertSeverity("error");
      setAlertMessage("Please select a bee to unstake.");
      setSnackbarOpen(true);
      return;
    }
    setConfirmUnstakeModalOpen(true);
  };

  // Watch for transaction success/failure to refresh data
  useEffect(() => {
    if (isTransactionSuccess && transactionHash) {
      setAlertSeverity("success");
      setAlertMessage("Transaction successful!");
      setSnackbarOpen(true);
      setTransactionHash(undefined);

      // Refresh both user and hive data to show updated bees and production stats
      refreshBeesData();
      refreshHiveData();
      setActiveBee(null);
    }
    if (isTransactionError) {
      setAlertSeverity("error");
      setAlertMessage(transactionError?.message || "Transaction failed.");
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      console.error("Transaction Error:", transactionError);
    }
  }, [
    isTransactionSuccess,
    isTransactionError,
    transactionError,
    isTransactionLoading,
    setActiveBee,
    activeBee,
    stakeBee,
    unstakeBee,
    transactionHash,
    refreshBeesData,
    refreshHiveData,
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  const handleCancelStake = () => {
    setConfirmModalOpen(false);
  };

  const handleCancelUnstake = () => {
    setConfirmUnstakeModalOpen(false);
  };

  // Compute bee counts for the hive
  const beeCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      Common: 0,
      Rare: 0,
      UltraRare: 0,
      Total: 0,
    };

    stakedBees.forEach((bee) => {
      const rarity = bee.rarity;
      counts[rarity] = (counts[rarity] || 0) + 1;
    });
    counts["Total"] = stakedBees.length;
    return counts;
  }, [stakedBees]);

  const hive = getHiveById(hiveIdNumber);

  if (!hive) {
    return (
      <GameLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Typography variant="h6" color="error">
            Hive data not found.
          </Typography>
        </Box>
      </GameLayout>
    );
  }

  const hiveHatchlingInfo: HiveHatchlingInfo = {
    productivityValue: hive.productivityValue,
    CommonBees: beeCounts.Common,
    RareBees: beeCounts.Rare,
    UltraRareBees: beeCounts.UltraRare,
    TotalBees: beeCounts.Total,
    status: "Active",
    location: "Whisperwood Valleys",
    environment: "Forest",
  };

  return (
    <>
      <GameLayout>
        {/* Background Layer */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            overflow: "hidden",
            background:
              "radial-gradient(73.87% 73.87% at 50% 50%, rgba(52, 119, 142, 0.2) 0%, rgba(36, 46, 78, 0.2) 100%), radial-gradient(130.26% 136.63% at 50.05% 47.94%, rgba(36, 46, 78, 0.85) 30%, rgba(18, 23, 39, 0.85) 57.5%, rgba(32, 41, 70, 0.85) 76.5%, rgba(33, 42, 72, 0.85) 85.81%)",
            opacity: 0.2,
            border: "1px solid #000000",
          }}
        >
          <Image
            src={
              environments.find((env) => env.id === environmentIdNumber)
                ?.backgroundImage || "/Maps/ForestMap.jpg"
            }
            alt="Forest map background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            onLoad={() => setIsImageLoaded(true)}
            priority
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            padding: "20px",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <HiveTopBar mapHeaderLabel={hive.name} />
          <Grid
            container
            spacing={1}
            sx={{ marginTop: "0.4rem", marginLeft: "2.5rem", gap: "0px 0px" }}
          >
            {/* Left Column - Hive Stats Panel */}
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              xl={3}
              xxl={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <HiveHatchlingsPanel
                  hiveHatchlingInfo={hiveHatchlingInfo}
                  onStake={handleStake}
                  onRaid={handleRaid}
                />
              </Box>
            </Grid>

            {/* Right Column - Staked Bees Grid */}
            <Grid
              item
              xs={12}
              sm={8}
              md={9}
              lg={9}
              xl={9}
              xxl={9}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: "5px",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              {hivesLoading || isBeesLoading ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="80%"
                >
                  <HexagonSpinner />
                  <Typography className="body1" padding="24px 0px">
                    Loading Bees...
                  </Typography>
                </Box>
              ) : beesError ? (
                <Box textAlign="center" mt={4}>
                  <Typography color="error" variant="h6">
                    {beesError}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      router.refresh();
                    }}
                    sx={{ mt: 2 }}
                  >
                    Retry
                  </Button>
                </Box>
              ) : (
                <BeeGrid bees={stakedBees} variant="default" />
              )}
            </Grid>
          </Grid>
          <BottomBar isAudioPanelVisible={false} />
        </Box>

        {/* Staking Confirmation Modal */}
        <Modal
          open={confirmModalOpen}
          onClose={handleCancelStake}
          aria-labelledby="confirm-stake-title"
          aria-describedby="confirm-stake-description"
        >
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1300,
            }}
          >
            <SemiTransparentCard
              transparency={0.8}
              sx={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
                maxWidth: "500px",
                width: "90%",
                boxShadow: 24,
              }}
            >
              <Typography
                id="confirm-stake-title"
                variant="h5"
                component="h2"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Confirm Stake
              </Typography>
              <Typography
                id="confirm-stake-description"
                variant="body1"
                align="center"
                sx={{ fontSize: "1rem" }}
              >
                Are you sure you want to stake{" "}
                <strong>Bee ID {activeBee}</strong> to{" "}
                <strong>{hive.name}</strong>?
              </Typography>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Button onClick={handleCancelStake} variant="contained">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmStake}
                  variant="contained"
                  disabled={isStakingPending || isTransactionLoading}
                >
                  {isStakingPending || isTransactionLoading
                    ? "Staking..."
                    : "Stake"}
                </Button>
              </Box>
            </SemiTransparentCard>
          </Box>
        </Modal>

        {/* Unstaking Confirmation Modal */}
        <Modal
          open={confirmUnstakeModalOpen}
          onClose={handleCancelUnstake}
          aria-labelledby="confirm-unstake-title"
          aria-describedby="confirm-unstake-description"
        >
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1300,
            }}
          >
            <SemiTransparentCard
              transparency={0.95}
              sx={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
                maxWidth: "500px",
                width: "90%",
                boxShadow: 24,
              }}
            >
              <Typography
                id="confirm-unstake-title"
                variant="h5"
                component="h2"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Confirm Unstake
              </Typography>
              <Typography
                id="confirm-unstake-description"
                variant="body1"
                align="center"
                sx={{ fontSize: "1rem" }}
              >
                Are you sure you want to unstake{" "}
                <strong>Bee ID {activeBee}</strong> from{" "}
                <strong>{hive.name}</strong>?
              </Typography>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Button onClick={handleCancelUnstake} variant="contained">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmUnstake}
                  variant="contained"
                  disabled={isUnstakingPending || isTransactionLoading}
                >
                  {isUnstakingPending || isTransactionLoading
                    ? "Unstaking..."
                    : "Unstake"}
                </Button>
              </Box>
            </SemiTransparentCard>
          </Box>
        </Modal>

        {/* Snackbar for success/error messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </GameLayout>
    </>
  );
};

// Helper function to create a Hatchling object
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

export default BlackForestHive;
