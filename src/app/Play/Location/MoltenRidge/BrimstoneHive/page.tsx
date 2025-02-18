// src/app/Play/Location/WhisperwoodValleys/EmberglowHive/page.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Snackbar, Alert } from "@mui/material";
import { useSound } from "@/context/SoundContext";
import HiveTopBar from "@/components/Layouts/GameLayout/HiveTopBar/HiveTopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HiveHatchlingsPanel from "@/components/ControlPanels/Hive/HiveStatsPanel/HiveHatchlingsPanel/HiveHatchlingsPanel";
import BeeGrid from "@/components/ControlPanels/Hive/Bees/BeeGrid";
import {
  useWriteHiveStakingStake,
  useWriteHiveStakingUnstake,
} from "@/hooks/HiveStaking";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useUserContext } from "@/context/UserContext";
import { useWaitForTransactionReceipt } from "wagmi";
import { Hatchling } from "@/types/Hatchling";
import { useHives } from "@/context/HivesContext";
import EnvironmentBackground from "../../WhisperwoodValleys/Components/EnvironmentBackground";
import ConfirmModal from "../../WhisperwoodValleys/Components/HiveStakingModals";

import useFetchStakedBees from "@/hooks/useFetchStakedBees";
import TransactionInProgressModal from "../../../../../components/Modals/TransactionProgressModal/TransactionInProgressModal";

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

const BrimstoneHive: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();

  // Track the last action taken by the user (stake or unstake)
  const [lastAction, setLastAction] = useState<"stake" | "unstake" | null>(
    null
  );

  // We'll use this to prevent multiple refresh calls if the user re-renders
  const [didRefresh, setDidRefresh] = useState(false);

  // This determines if we show the "Staking in progress" modal
  const [showTxModal, setShowTxModal] = useState(false);

  const { activeBee, checkAndPromptApproval, setActiveBee, refreshBeesData } =
    useUserContext();

  const {
    environments,
    getHiveById,
    loading: hivesLoading,
    error: hivesError,
    refreshHiveData,
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

  // Wait for the transaction receipt
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({ hash: transactionHash });

  const environmentId = "6";
  const hiveId = "6";
  const environmentIdNumber = Number(environmentId);
  const hiveIdNumber = Number(hiveId);

  // Use our new custom hook to fetch staked bees
  const { stakedBees, loadingBees, beesError } = useFetchStakedBees({
    hiveIdNumber,
  });

  // -------------------------------------------------------------
  // MUSIC SETUP
  // -------------------------------------------------------------
  useEffect(() => {
    const audio = new Audio("/Audio/Soundtrack/MoltenRidge/Volcanic.mp3");
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

  // -------------------------------------------------------------
  // STAKE / UNSTAKE LOGIC
  // -------------------------------------------------------------
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
    setShowTxModal(true); // show the "staking in progress" modal

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
      setShowTxModal(false); // close the modal if there's an error
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
    setShowTxModal(true);

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
        setShowTxModal(false);
      }
    } catch (err) {
      console.error("Failed to unstake the Hatchling:", err);
      setAlertSeverity("error");
      setAlertMessage("Failed to unstake the Hatchling.");
      setSnackbarOpen(true);
      setShowTxModal(false);
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

  // -------------------------------------------------------------
  // TRANSACTION SUCCESS/ERROR EFFECTS
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isTransactionSuccess || didRefresh) return;
    if (!transactionHash || !lastAction || activeBee === null) return;

    // Only run once
    setDidRefresh(true);

    const doRefresh = async () => {
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
      } finally {
        setActiveBee(null);
        setLastAction(null);
        setTransactionHash(undefined);

        // Now that we've loaded new data from the subquery, we can close the modal
        setShowTxModal(false);
      }
    };

    doRefresh();
  }, [
    isTransactionSuccess,
    didRefresh,
    transactionHash,
    lastAction,
    activeBee,
    refreshHiveData,
    refreshBeesData,
    setActiveBee,
  ]);

  useEffect(() => {
    if (!isTransactionError || didRefresh) return;
    if (!transactionHash) return;

    setDidRefresh(true);

    setAlertSeverity("error");
    setAlertMessage(transactionError?.message || "Transaction failed.");
    setSnackbarOpen(true);

    // Close the modal on error
    setShowTxModal(false);

    setTransactionHash(undefined);
    setLastAction(null);
  }, [isTransactionError, transactionError, transactionHash, didRefresh]);

  // -------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------
  const beeCounts = useMemo(() => {
    const counts: { [key: string]: number } = {
      Common: 0,
      Rare: 0,
      UltraRare: 0,
      Total: 0,
    };

    // A mapping to normalize bee rarities
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
      location: "Emberglow Hive",
      environment: "Volcanic",
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
        >
          <HexagonSpinner />
          <Typography className="body1" padding="24px 0px">
            Loading Hive Data...
          </Typography>
        </Box>
      </GameLayout>
    );
  }

  return (
    <GameLayout>
      {/* 1) The environment background */}
      <EnvironmentBackground
        backgroundImage={
          environments.find((env) => env.id === environmentIdNumber)
            ?.backgroundImage || "/Maps/Environment/Forest.jpg"
        }
      />

      {/* 2) The "Staking in progress" modal */}
      <TransactionInProgressModal
        open={showTxModal}
        onClose={() => setShowTxModal(false)}
      />

      {/* 3) Main layout */}
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
            {loadingBees ? (
              <HexagonSpinner />
            ) : (
              <BeeGrid
                bees={stakedBees}
                variant="default"
                loading={loadingBees}
              />
            )}
          </Grid>
        </Grid>

        <BottomBar isAudioPanelVisible={false} />
      </Box>

      {/* Staking Confirmation Modal */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={handleCancelStake}
        onConfirm={handleConfirmStake}
        title="Confirm Stake"
        description={`Are you sure you want to stake Bee ID ${activeBee} to ${hive.name}?`}
        confirmLabel="Stake"
        isLoading={isStakingPending || isTransactionLoading}
      />

      {/* Unstaking Confirmation Modal */}
      <ConfirmModal
        open={confirmUnstakeModalOpen}
        onClose={handleCancelUnstake}
        onConfirm={handleConfirmUnstake}
        title="Confirm Unstake"
        description={`Are you sure you want to unstake Bee ID ${activeBee} from ${hive.name}?`}
        confirmLabel="Unstake"
        isLoading={isUnstakingPending || isTransactionLoading}
      />

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
  );
};

export default BrimstoneHive;
