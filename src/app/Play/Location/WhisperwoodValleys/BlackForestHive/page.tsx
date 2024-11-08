// src/components/Forest.tsx
"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Snackbar, Alert, Button, Modal } from "@mui/material"; // Added imports
import { useSound } from "@/context/SoundContext";
import HiveTopBar from "@/components/Layouts/GameLayout/HiveTopBar/HiveTopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HiveStatsPanel from "@/components/ControlPanels/Hive/HiveStatsPanel/HiveStatsPanel";
import BeeGrid from "@/components/ControlPanels/Hive/Bees/BeeGrid";
import { useWriteHiveStakingStake } from "@/hooks/HiveStaking";
import Image from "next/image";
import { HiveInfo } from "@/types/HiveInfo";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useUserContext } from "@/context/UserContext";
import { useWaitForTransactionReceipt } from "wagmi"; // Import useWaitForTransactionReceipt
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";

const hiveInfo: HiveInfo = {
  queenBees: 1,
  workerBees: 24,
  healthValue: 100,
  productivityValue: 80,
  attackValue: 50,
  defenceValue: 21,
  status: "Active",
  location: "Black Forest Hive",
  environment: "Whisperwood Valleys",
};

const Forest: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [environmentData, setEnvironmentData] = useState<any>(null);
  const {
    activeBee,
    address,
    checkAndPromptApproval,
    refreshBeesData,
    setActiveBee,
    stakeBee, // Destructure stakeBee from context
  } = useUserContext();
  // Added setActiveBee
  // Staking Hook (fix: using writeContractAsync)
  const { writeContractAsync: stakeNFT, isPending: isStakingPending } =
    useWriteHiveStakingStake();

  // State variables for transaction tracking and user feedback
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Track transaction receipt
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

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

  useEffect(() => {
    // Fetch environment data for Whisperwood Valleys
    fetch("/Data/Maps/Forest/whisperwood-valleys.json")
      .then((response) => response.json())
      .then((data) => setEnvironmentData(data))
      .catch((error) =>
        console.error("Failed to load environment data:", error)
      );
  }, []);

  // Handle staking confirmation
  const handleConfirmStake = async () => {
    setConfirmModalOpen(false);
    try {
      // Ensure the user has selected an activeBee
      if (activeBee === null) {
        console.log("No active bee selected for staking");
        setAlertSeverity("error");
        setAlertMessage("No active bee selected for staking.");
        setSnackbarOpen(true);
        return;
      }

      // Ensure the user has approved the staking contract
      const isApproved = await checkAndPromptApproval();
      if (!isApproved) {
        console.log("User did not approve the staking contract.");
        setAlertSeverity("error");
        setAlertMessage("You need to approve the staking contract.");
        setSnackbarOpen(true);
        return;
      }

      // Example hiveId and environmentId - you will get these from the environment or UI
      const hiveId = "2"; // Replace with actual hive ID if dynamic
      const environmentId = "2"; // Replace with actual environment ID if dynamic
      const tokenId = activeBee; // beeId is a number

      console.log(
        `Staking tokenId: ${tokenId}, environmentId: ${environmentId}, hiveId: ${hiveId}`
      );

      // Call the staking contract function
      const tx = await stakeNFT({
        args: [BigInt(tokenId), BigInt(environmentId), BigInt(hiveId)], // Pass tokenId, environmentId, and hiveId as BigInts
      });

      console.log("Staking transaction initiated:", tx);
      setTransactionHash(tx as `0x${string}`);
      setAlertSeverity("success");
      setAlertMessage("Staking transaction initiated!");
      setSnackbarOpen(true);

      // **Manual State Update will occur after transaction confirmation**
    } catch (error) {
      console.error("Failed to stake NFT:", error);
      setAlertSeverity("error");
      setAlertMessage("Failed to initiate staking.");
      setSnackbarOpen(true);
    }
  };

  // Handle Stake button click - open confirmation modal
  const handleStake = () => {
    if (activeBee === null) {
      console.log("No active bee selected to stake.");
      setAlertSeverity("error");
      setAlertMessage("Please select a bee to stake.");
      setSnackbarOpen(true);
      return;
    }
    setConfirmModalOpen(true);
  };

  // Handle Raid (unchanged)
  const handleRaid = () => {
    console.log("Raid button clicked");
  };

  // Handle transaction status changes
  useEffect(() => {
    console.log(
      "Transaction Receipt Status - Loading:",
      isTransactionLoading,
      "Success:",
      isTransactionSuccess,
      "Error:",
      isTransactionError
    );
    if (isTransactionSuccess && transactionHash) {
      setAlertSeverity("success");
      setAlertMessage("Staking successful!");
      setSnackbarOpen(true);
      setTransactionHash(undefined);

      // **Manual State Update After Successful Transaction**
      if (activeBee !== null) {
        console.log(`Confirmed staking of Bee ID ${activeBee}`);
        const hiveId = "2"; // Replace with actual value if dynamic
        const environmentId = "2"; // Replace with actual value if dynamic
        stakeBee(activeBee, environmentId, hiveId); // Pass environmentID and hiveID
        setActiveBee(null); // Reset activeBee
        console.log(
          "Called stakeBee() with environmentID and hiveID, and reset activeBee after successful transaction."
        );
      } 
      refreshBeesData();
    }
    if (isTransactionError) {
      setAlertSeverity("error");
      setAlertMessage(transactionError?.message || "Failed to stake the NFT.");
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      console.error("Transaction Error:", transactionError);
    }
  }, [
    isTransactionSuccess,
    isTransactionError,
    transactionError,
    isTransactionLoading,
    refreshBeesData,
    setActiveBee,
    activeBee,
    stakeBee,
    transactionHash,
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  const handleCancelStake = () => {
    setConfirmModalOpen(false);
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
          {!isImageLoaded && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
              flexDirection="column"
              position="fixed"
              width="100vw"
              bgcolor="background.default"
              zIndex={1300}
            >
              <HexagonSpinner />
              <Typography className="body1" padding="24px 0px">
                Loading World...
              </Typography>
            </Box>
          )}
          <Image
            src={
              environmentData?.environment?.backgroundImage ||
              "/Maps/ForestMap.jpg"
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

        {/* Content Layer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            padding: "20px",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <HiveTopBar mapHeaderLabel={hiveInfo.location} />

          <Grid
            container
            spacing={1}
            sx={{ marginTop: "0.4rem", marginLeft: "2.5rem", gap: "0px 0px" }}
          >
            {/* Left Column - Hive Stats */}
            <Grid
              item
              xs={3}
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
                  borderRadius: "2px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <HiveStatsPanel
                  hiveInfo={hiveInfo}
                  onStake={handleStake} // Updated to open confirmation modal
                  onRaid={handleRaid}
                />
              </Box>
            </Grid>

            {/* Second Column - Bee Grid */}
            <Grid
              item
              xs={12}
              sm={9}
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
              <BeeGrid />
            </Grid>
          </Grid>

          <BottomBar isAudioPanelVisible={false} />
        </Box>

        {/* Confirmation Modal for Staking */}
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
                <strong>{hiveInfo.location}</strong>?
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

        {/* Success/Error Snackbar */}
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

const App: React.FC = () => {
  return <Forest />;
};

export default App;
