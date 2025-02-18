"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { Hatchling } from "@/types/Hatchling";
import HatchlingImage from "./HatchlingImage";
import { useWriteHiveStakingUnstake } from "@/hooks/HiveStaking";
import SemiTransparentCard from "../SemiTransaprentCard";
import { useWaitForTransactionReceipt } from "wagmi";
import { useEnvironment } from "@/context/EnvironmentContext";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import StatusChip from "./StatusChip";
import ActionButtons from "./ActionButtons";
import ConfirmationModal from "./ConfirmationModal";
import BeeInfo from "./BeeInfo";
import BeeCardBackground from "./BeeCardBackground";
import RarityChip from "./RarityChip";
import { logger } from "@/utils/logger";
import TransactionInProgressModal from "@/components/Modals/TransactionProgressModal/TransactionInProgressModal";
import { useSound } from "@/context/SoundContext"; // Import useSound context

export interface BeeCardProps {
  bee: Hatchling;
  onPlayClick: (beeId: number) => void | Promise<void>;
  isOwnedByUser: boolean;
  variant?: "default" | "hive" | "myBees";
  additionalInfo?: Record<string, any>;
}

const breathShadow = keyframes`
  0% {
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.8);
  }
  50% {
    box-shadow: 0px 0px 15px 7px rgba(255, 255, 255, 1);
  }
  100% {
    box-shadow: 0px 0px 10px 5px rgba(255, 255, 255, 0.8);
  }
`;

const StyledBeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  width: "350px",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    animation: `${breathShadow} 2s ease-in-out infinite`,
  },
}));

const BeeCard: React.FC<BeeCardProps> = ({
  bee,
  onPlayClick,
  isOwnedByUser,
  variant = "default",
  additionalInfo = {},
}) => {
  const { refreshBeesData } = useUserContext();
  const { writeContractAsync, isPending } = useWriteHiveStakingUnstake();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [showTxModal, setShowTxModal] = useState(false);

  const { getEnvironmentById, getHiveById } = useEnvironment();
  const environment = bee.environmentID
    ? getEnvironmentById(Number(bee.environmentID))
    : null;
  const hive = bee.hiveID
    ? getHiveById(Number(bee.environmentID), Number(bee.hiveID))
    : null;
  const router = useRouter();

  // Sound management
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [buttonClickSound, setButtonClickSound] =
    useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
  }, []);

  const handleHover = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0; // Ensure the sound starts fresh each time
      hoverSound.play();
    }
  };

  const handleUnstakeClick = () => {
    if (bee.id !== undefined && environment && hive) {
      setConfirmModalOpen(true);
    } else {
      setAlertSeverity("error");
      setAlertMessage("Missing necessary IDs to unstake.");
      setSnackbarOpen(true);
    }
  };

  const handleConfirmUnstake = async () => {
    setConfirmModalOpen(false);
    const { id, environmentID, hiveID } = bee;
    if (environmentID === null || hiveID === null) {
      setAlertSeverity("error");
      +setAlertMessage("Invalid environment or hive ID.");
      setSnackbarOpen(true);
      return;
    }
    try {
      logger.log("Initiating unstake transaction...");
      setShowTxModal(true);
      logger.log(
        `BigInt(id): ${BigInt(id)}; BigInt(environmentID): ${BigInt(
          environmentID
        )}; BigInt(hiveID): ${BigInt(hiveID)}`
      );
      const tx = await writeContractAsync({
        args: [BigInt(id), BigInt(environmentID), BigInt(hiveID)],
      });
      logger.log("Transaction initiated:", tx);
      if (tx) {
        setTransactionHash(tx as `0x${string}`);
        logger.log("Transaction hash set:", tx);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Transaction failed to initiate.");
        setSnackbarOpen(true);
        logger.error("Transaction failed to initiate.");
        setShowTxModal(false);
      }
    } catch (err: any) {
      if (
        err?.message.includes("User rejected") ||
        err?.message.includes("User denied")
      ) {
        setAlertSeverity("warning");
        setAlertMessage("User rejected transaction");
        // Do not log rejection error
      } else {
        setAlertSeverity("error");
        setAlertMessage("Failed to unstake the Hatchling.");
        logger.error("Error during unstake transaction:", err);
      }
      setSnackbarOpen(true);
      setShowTxModal(false);
    }
  };

  const handleCancelUnstake = () => {
    setConfirmModalOpen(false);
  };

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    logger.log(
      "Transaction Receipt Status - Loading:",
      isTransactionLoading,
      "Success:",
      isTransactionSuccess,
      "Error:",
      isTransactionError
    );
    if (isTransactionSuccess) {
      setAlertSeverity("success");
      setAlertMessage("Successfully unstaked the Hatchling!");
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      logger.log("Called refreshBeesData() after successful transaction.");
      if (bee.id && variant === "myBees") {
        refreshBeesData(bee.id, "unstake");
      }
      setShowTxModal(false);
    }
    if (isTransactionError) {
      if (
        transactionError?.message.includes("User rejected") ||
        transactionError?.message.includes("User denied")
      ) {
        setAlertSeverity("warning");
        setAlertMessage("User rejected transaction");
      } else {
        setAlertSeverity("error");
        setAlertMessage(
          transactionError?.message || "Failed to unstake the Hatchling."
        );
      }
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      logger.error("Transaction Error:", transactionError);
      setShowTxModal(false);
    }
  }, [
    isTransactionSuccess,
    isTransactionError,
    transactionError,
    refreshBeesData,
    isTransactionLoading,
    bee.id,
    variant,
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  const environmentLink = environment
    ? `/Play/Location/${encodeURIComponent(
        environment.name.replace(/\s+/g, "")
      )}`
    : undefined;

  const hiveLink = hive
    ? `/Play/Location/${encodeURIComponent(
        environment!.name.replace(/\s+/g, "")
      )}/${encodeURIComponent(hive.name.replace(/\s+/g, ""))}`
    : undefined;

  const ownerAddressToShow =
    variant !== "myBees" ? (isOwnedByUser ? "You" : "Other") : undefined;

  return (
    <StyledBeeCard onMouseEnter={handleHover}>
      <BeeCardBackground
        rarity={
          bee.rarity === "Common" ||
          bee.rarity === "Rare" ||
          bee.rarity === "Ultra-Rare"
            ? bee.rarity
            : "Common"
        }
      >
        <HatchlingImage
          imageAddress={
            bee.imageAddress !== "" ? bee.imageAddress : "/NFTs/Hatchlings.JPEG"
          }
          alt={`Hatchling ${bee.id}`}
          sx={{ width: "100%", height: "250px", objectFit: "cover" }}
        />
        <StatusChip isFree={bee.status === "Free"}>{bee.status}</StatusChip>
        <RarityChip
          rarity={
            bee.rarity === "Common" ||
            bee.rarity === "Rare" ||
            bee.rarity === "Ultra-Rare"
              ? bee.rarity
              : "Common"
          }
        />
        <Box sx={{ padding: "16px", marginBottom: "12px" }}>
          <Typography
            variant="h6"
            color="white"
            sx={{ fontWeight: "bold", fontSize: "1.3rem", marginLeft: 1 }}
          >
            Hatchling ID: {bee.id}
          </Typography>
          <BeeInfo
            environmentName={environment ? environment.name : undefined}
            hiveName={hive ? hive.name : undefined}
            rarity={bee.rarity}
            environmentLink={environmentLink}
            hiveLink={hiveLink}
            ownerAddress={ownerAddressToShow}
          />
          <ActionButtons
            onPlayClick={
              bee.status === "Free" ? () => onPlayClick(bee.id) : undefined
            }
            onUnstakeClick={
              bee.status === "Staked" && isOwnedByUser
                ? handleUnstakeClick
                : undefined
            }
            isPending={isPending}
            isTransactionLoading={isTransactionLoading}
          />
        </Box>

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
          open={showTxModal}
          onClose={() => setShowTxModal(false)}
          title="Unstaking & Claiming NFT points in Progress..."
        />

        <ConfirmationModal
          open={confirmModalOpen}
          title="Confirm Unstake"
          description={`Are you sure you want to unstake Hatchling ID ${
            bee.id
          } from ${hive ? hive.name : "Unknown Hive"}?`}
          onConfirm={handleConfirmUnstake}
          onCancel={handleCancelUnstake}
          confirmButtonText="Unstake"
          cancelButtonText="Cancel"
          isConfirmLoading={isPending || isTransactionLoading}
        />
      </BeeCardBackground>
    </StyledBeeCard>
  );
};

export default BeeCard;
