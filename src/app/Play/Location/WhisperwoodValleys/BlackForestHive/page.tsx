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
import { useUserContext } from "@/context/UserContext"; // Import UserContext
import { useWaitForTransactionReceipt } from "wagmi";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import { Hatchling } from "@/types/Hatchling";
import { fetchMetadata } from "@/app/utils/fetchMetaData";
import { useHives } from "@/context/HivesContext";
import useDebounce from "@/hooks/useDebounce";

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

  // Track the last action taken by the user (stake or unstake)
  const [lastAction, setLastAction] = useState<"stake" | "unstake" | null>(
    null
  );

  const { activeBee, checkAndPromptApproval, setActiveBee, refreshBeesData } =
    useUserContext(); // Destructure refreshBeesData

  const {
    environments,
    stakedNFTs,
    getHiveById,
    getStakedNFTsByHiveId,
    loading: hivesLoading,
    error: hivesError,
    refreshHiveData,
    isRefreshing,
  } = useHives();

  const { writeContractAsync: stakeNFT, isPending: isStakingPending } =
    useWriteHiveStakingStake();
  const { writeContractAsync: unstakeNFT, isPending: isUnstakingPending } =
    useWriteHiveStakingUnstake();

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
  } = useWaitForTransactionReceipt({ hash: transactionHash });

  const environmentId = "2";
  const hiveId = "2";
  const environmentIdNumber = Number(environmentId);
  const hiveIdNumber = Number(hiveId);

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

  // Consolidated loading state
  const [loadingBees, setLoadingBees] = useState<boolean>(false);
  const debouncedLoadingBees = useDebounce(loadingBees, 300); // 300ms debounce

  // Fetch metadata for staked bees whenever stakedNFTs or hive data changes
  useEffect(() => {
    const fetchBeesWithMetadata = async () => {
      setLoadingBees(true);
      try {
        if (hivesLoading) {
          // Optionally, wait for hives to finish loading
          // await waitForHivesToLoad(); // Implement if necessary
        }

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

  const handleConfirmStake = async () => {
    setConfirmModalOpen(false);

    if (activeBee === null) {
      setAlertSeverity("error");
      setAlertMessage("No active bee selected for staking.");
      setSnackbarOpen(true);
      return;
    }

    const isApproved = await checkAndPromptApproval();
    if (!isApproved) {
      setAlertSeverity("error");
      setAlertMessage("You need to approve the staking contract.");
      setSnackbarOpen(true);
      return;
    }

    setLastAction("stake");
    const tokenId = activeBee;
    try {
      const tx = await stakeNFT({
        args: [BigInt(tokenId), BigInt(environmentId), BigInt(hiveId)],
      });
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
    if (isStakingPending || isTransactionLoading) return; // Prevent multiple transactions
    setLastAction("stake");
    setConfirmModalOpen(true);
  };

  const handleRaid = () => {
    // Placeholder for raid logic
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

    setLastAction("unstake");
    const { id, environmentID, hiveID } = targetBee;
    try {
      const tx = await unstakeNFT({
        args: [BigInt(id), BigInt(environmentID), BigInt(hiveID)],
      });
      if (tx && typeof tx === "string") {
        setTransactionHash(tx as `0x${string}`);
        setAlertSeverity("success");
        setAlertMessage("Unstaking transaction initiated!");
        setSnackbarOpen(true);
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
    if (isUnstakingPending || isTransactionLoading) return; // Prevent multiple transactions
    setLastAction("unstake");
    setConfirmUnstakeModalOpen(true);
  };

  // Handle transaction success/failure to refresh data
  useEffect(() => {
    const handleTransactionSuccess = async () => {
      if (!transactionHash || !lastAction || activeBee === null) return;

      try {
        await refreshHiveData(activeBee, lastAction);
        await refreshBeesData(activeBee, lastAction);

        setAlertSeverity("success");
        setAlertMessage("Transaction successful!");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error refreshing data:", error);
        setAlertSeverity("error");
        setAlertMessage("Failed to refresh data after transaction.");
        setSnackbarOpen(true);
      }

      setActiveBee(null);
      setLastAction(null);
      setTransactionHash(undefined);
    };

    if (isTransactionSuccess) {
      handleTransactionSuccess();
    }

    if (isTransactionError) {
      setAlertSeverity("error");
      setAlertMessage(transactionError?.message || "Transaction failed.");
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      setLastAction(null);
    }
  }, [
    isTransactionSuccess,
    isTransactionError,
    transactionError,
    transactionHash,
    refreshHiveData,
    refreshBeesData, // Ensure refreshBeesData is included in dependencies
    activeBee,
    lastAction,
    setActiveBee,
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  const handleCancelStake = () => {
    setConfirmModalOpen(false);
    setLastAction(null);
  };

  const handleCancelUnstake = () => {
    setConfirmUnstakeModalOpen(false);
    setLastAction(null);
  };

  const beeCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      Common: 0,
      Rare: 0,
      UltraRare: 0,
      Total: 0,
    };

    // A mapping to normalize bee rarities to match counts keys
    const rarityMap: { [key: string]: string } = {
      Common: "Common",
      Rare: "Rare",
      "Ultra-Rare": "UltraRare",
    };

    for (const bee of stakedBees) {
      const normalizedRarity = rarityMap[bee.rarity] || "Unknown";
      if (counts[normalizedRarity] !== undefined) {
        counts[normalizedRarity]++;
      }
    }
    counts["Total"] = stakedBees.length;
    return counts;
  }, [stakedBees]);

  const hive = getHiveById(hiveIdNumber);

  const hiveHatchlingInfo = useMemo<HiveHatchlingInfo>(() => {
    return {
      productivityValue: hive?.productivityValue || 0,
      CommonBees: beeCounts.Common,
      RareBees: beeCounts.Rare,
      UltraRareBees: beeCounts.UltraRare,
      TotalBees: beeCounts.Total,
      status: "Active",
      location: "Whisperwood Valleys",
      environment: "Forest",
    };
  }, [hive, beeCounts]);

  if (!hive) {
    return (
      <GameLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        ></Box>
      </GameLayout>
    );
  }

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
            style={{ objectFit: "cover", objectPosition: "center" }}
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
              <BeeGrid
                bees={stakedBees}
                variant="default"
                loading={debouncedLoadingBees}
              />
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
              transparency={1}
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
              transparency={1}
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
