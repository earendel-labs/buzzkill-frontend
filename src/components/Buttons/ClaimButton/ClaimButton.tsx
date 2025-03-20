"use client";

import React, { useState, useEffect } from "react";
import { Button, Snackbar, Alert, Tooltip } from "@mui/material";
import Image from "next/image";
import { useSound } from "@/context/SoundContext";
import { useWriteHiveStakingClaimPoints } from "@/hooks/HiveStaking";
import { useWaitForTransactionReceipt } from "wagmi";
import { logger } from "@/utils/logger";
import { useUserContext } from "@/context/UserContext";
import TransactionInProgressModal from "@/components/Modals/TransactionProgressModal/TransactionInProgressModal";

interface ClaimButtonProps {
  liveUnclaimedPoints: number;
  isUserResource?: boolean;
  sx?: object;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({
  liveUnclaimedPoints,
  isUserResource = false,
  sx = {},
}) => {
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStep, setClaimStep] = useState("Awaiting Claim Transaction...");
  const [showClaimModal, setShowClaimModal] = useState(false);

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
    if (Math.floor(liveUnclaimedPoints) < 10) {
      setAlertSeverity("warning");
      setAlertMessage("Minimum 10 points required to claim yield.");
      setSnackbarOpen(true);
      return;
    }
    if (isClaiming || isPending || isTxnLoading) return;

    try {
      // Step 1: Call setPendingYield to store current yield
      setIsClaiming(true);
      setShowClaimModal(true);
      setClaimStep("Calculating Pending Yield...");
      logger.log("Calling setPendingYield...");

      const pendingRes = await fetch("/api/user/rewards/setPendingYield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!pendingRes.ok) {
        const msg = await pendingRes.text();
        logger.error("Failed to set pending yield:", msg);
        setAlertSeverity("error");
        setAlertMessage("Error calculating pending yield.");
        setSnackbarOpen(true);
        setIsClaiming(false);
        setShowClaimModal(false);
        return;
      }

      const pendingData = await pendingRes.json();
      if (!pendingData.success) {
        logger.error("setPendingYield error:", pendingData.error);
        setAlertSeverity("error");
        setAlertMessage(pendingData.error || "Error setting pending yield.");
        setSnackbarOpen(true);
        setIsClaiming(false);
        setShowClaimModal(false);
        return;
      }

      logger.log("Pending yield set. Proceeding with on-chain claim...");

      // Step 2: Execute on-chain transaction
      setClaimStep("Creating On-Chain Transaction...");
      const tx = await writeContractAsync({ args: [] });
      if (tx) {
        setTransactionHash(tx as `0x${string}`);
        setClaimStep(`Yield claiming: ${liveUnclaimedPoints} Honey Drops`);
      } else {
        setAlertSeverity("error");
        setAlertMessage("No transaction response received.");
        setSnackbarOpen(true);
        logger.error("No transaction response received.");
        setShowClaimModal(false);
        setIsClaiming(false);
      }
    } catch (err: any) {
      if (
        err?.message?.includes("User rejected") ||
        err?.message?.includes("User denied")
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
      setShowClaimModal(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      (async () => {
        logger.log("On-chain claim succeeded.");
        setClaimStep("Transaction Confirmed! Finalizing Off-Chain...");

        // Step 3: Finalize claim in DB
        try {
          const response = await fetch("/api/user/rewards/claimYield", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          const apiData = await response.json();
          if (apiData.success) {
            logger.log("Yield claimed off-chain:", apiData.finalizedAmount);
            setAlertSeverity("success");
            setAlertMessage(`Yield claimed: ${apiData.finalizedAmount}`);
          } else {
            logger.error("Off-chain claim error:", apiData.error);
            setAlertSeverity("error");
            setAlertMessage(apiData.error || "Error finalizing claim.");
          }
        } catch (apiErr) {
          logger.error("Error calling claimYield API:", apiErr);
          setAlertSeverity("error");
          setAlertMessage("Failed to finalize yield claim.");
        }

        setSnackbarOpen(true);
        setTransactionHash(undefined);
        await pollForClaimUpdate(userRewards?.totalPoints || 0);
        setIsClaiming(false);
        setShowClaimModal(false);
      })();
    }

    if (isError) {
      logger.error("Transaction failed or was rejected:", error);
      setAlertSeverity("error");
      setAlertMessage(error?.message || "Transaction failed.");
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      setIsClaiming(false);
      setShowClaimModal(false);
    }
  }, [isSuccess, isError, error, userRewards?.totalPoints, pollForClaimUpdate]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  return (
    <>
      <Tooltip
        title={
          Math.floor(liveUnclaimedPoints) < 10
            ? "Minimum claim is 10 points"
            : ""
        }
        disableHoverListener={Math.floor(liveUnclaimedPoints) >= 10}
      >
        <span>
          <Button
            className="orangeButton"
            startIcon={
              !isUserResource && (
                <Image
                  src="/Icons/Resources/HoneyToken.png"
                  alt="HoneyToken"
                  width={20}
                  height={20}
                />
              )
            }
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onClick={handleClaimClick}
            disabled={
              isClaiming ||
              isPending ||
              isTxnLoading ||
              Math.floor(liveUnclaimedPoints) < 10
            }
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              lineHeight: "1.2",
              padding: isUserResource
                ? {
                    xs: "8px 8px",
                    sm: "8px 8px",
                    md: "8px 12px",
                    lg: "10px 16px",
                  }
                : "12px 24px",
              ...sx,
            }}
          >
            Claim Yield
          </Button>
        </span>
      </Tooltip>

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

      <TransactionInProgressModal
        open={showClaimModal}
        title={claimStep}
        onClose={() => setShowClaimModal(false)}
      />
    </>
  );
};

export default ClaimButton;
