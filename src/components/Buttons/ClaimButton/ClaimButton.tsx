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
    if (isClaiming || isPending || isTxnLoading) {
      return;
    }
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
    if (isSuccess) {
      logger.log("Claim transaction completed successfully.");
      setAlertSeverity("success");
      setAlertMessage("Claim successful!");
      setSnackbarOpen(true);
      setTransactionHash(undefined);

      const oldTotalPoints = userRewards?.totalPoints || 0;
      pollForClaimUpdate(oldTotalPoints).finally(() => {
        setIsClaiming(false);
      });
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
        variant="contained"
        color="warning"
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
