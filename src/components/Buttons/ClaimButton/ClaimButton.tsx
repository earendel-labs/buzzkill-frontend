// src/components/Buttons/ClaimButton/ClaimButton.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useSound } from "@/context/SoundContext";
import { useWriteHiveStakingClaimPoints } from "@/hooks/HiveStaking";
import { useWaitForTransactionReceipt } from "wagmi";
import { logger } from "@/utils/logger";
import { useUserContext } from "@/context/UserContext";

interface ClaimButtonProps {
  liveUnclaimedPoints: number;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ liveUnclaimedPoints }) => {
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [isClaiming, setIsClaiming] = useState(false);

  const { isMuted } = useSound();
  const { userRewards, pollForClaimUpdate } = useUserContext();
  const { writeContractAsync, isPending } = useWriteHiveStakingClaimPoints();
  const {
    isLoading: isTxnLoading,
    isSuccess,
    isError,
    error,
  } = useWaitForTransactionReceipt({ hash: transactionHash });

  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/MapResources/ResourceHover.mp3"));
    setClickSound(new Audio("/Audio/MapResources/ResourcePressed.mp3"));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound && !isClaiming && !isPending && !isTxnLoading) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound && !isClaiming && !isPending && !isTxnLoading) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const handleClaimClick = async () => {
    if (isClaiming || isPending || isTxnLoading) return;
    try {
      setIsClaiming(true);
      logger.log("Initiating claim transaction...");

      const tx = await writeContractAsync({ args: [] });
      if (tx) {
        setTransactionHash(tx as `0x${string}`);
      } else {
        setAlertSeverity("error");
        setAlertMessage("No transaction response received.");
        setSnackbarOpen(true);
        logger.error("No transaction response received.");
        setIsClaiming(false);
      }
    } catch (err: any) {
      if (
        err?.message.includes("User rejected") ||
        err?.message.includes("User denied")
      ) {
        setAlertSeverity("warning");
        setAlertMessage("User rejected transaction.");
      } else {
        setAlertSeverity("error");
        setAlertMessage("Failed to initiate claim.");
        logger.error("Claim transaction error:", err);
      }
      setSnackbarOpen(true);
      setIsClaiming(false);
    }
  };

  useEffect(() => {
    // When the on-chain claim transaction succeeds, call our API endpoint to update yield.
    if (isSuccess) {
      (async () => {
        logger.log("Claim transaction completed successfully.");
        setAlertSeverity("success");
        setAlertMessage("Claim successful on-chain!");
        setSnackbarOpen(true);
        setTransactionHash(undefined);

        try {
          // Call the backend API endpoint which re-calculates yield using trusted subgraph data.
          const response = await fetch("/api/user/claimYield", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          const apiData = await response.json();
          if (apiData.success) {
            logger.log("Yield claimed via API:", apiData.totalYield);
          } else {
            logger.error("Yield claim API error:", apiData.error);
            setAlertSeverity("error");
            setAlertMessage(apiData.error);
            setSnackbarOpen(true);
          }
        } catch (apiErr) {
          logger.error("Error calling claimYield API:", apiErr);
          setAlertSeverity("error");
          setAlertMessage("Failed to claim yield via API.");
          setSnackbarOpen(true);
        }

        // Optionally, poll for updated rewards data to update the UI
        const oldTotalPoints = userRewards?.totalPoints || 0;
        await pollForClaimUpdate(oldTotalPoints);
        setIsClaiming(false);
      })();
    }

    if (isError) {
      logger.error("Claim transaction error:", error);
      setAlertSeverity("error");
      setAlertMessage(error?.message || "Transaction failed.");
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      setIsClaiming(false);
    }
  }, [isSuccess, isError, error, userRewards?.totalPoints, pollForClaimUpdate]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  return (
    <>
      <Button
        className="orangeButton"
        startIcon={<EmojiEventsIcon />}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onClick={handleClaimClick}
        disabled={
          isClaiming || isPending || isTxnLoading || liveUnclaimedPoints === 0
        }
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          lineHeight: "1.5",
        }}
      >
        Claim Yield
      </Button>

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
    </>
  );
};

export default ClaimButton;
