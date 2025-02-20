"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Snackbar, Alert, Stack } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { Hatchling } from "@/types/Hatchling";
import HatchlingImage from "../BeeCard/HatchlingImage";
import { useWriteHiveStakingUnstake } from "@/hooks/HiveStaking";
import { useWaitForTransactionReceipt } from "wagmi";
import { useEnvironment } from "@/context/EnvironmentContext";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import ActionButtonsHive from "../BeeCard/ActionButtonsHive";
import ConfirmationModal from "../BeeCard/ConfirmationModal";
import BeeCardBackground from "../BeeCard/BeeCardBackground";
import { useHives } from "@/context/HivesContext";
import { logger } from "@/utils/logger";
import TransactionInProgressModal from "@/components/Modals/TransactionProgressModal/TransactionInProgressModal";
import RarityChip from "../BeeCard/RarityChip";
import { useTheme } from "@mui/material/styles";
import Person from "@mui/icons-material/Person";
import { useSound } from "@/context/SoundContext";
import { RARITY_VALUES } from "@/constants/rarity";

export interface BeeCardHiveProps {
  bee: Hatchling;
  onPlayClick?: () => void;
  isOwnedByUser: boolean;
  variant?: "default" | "myBees";
  additionalInfo?: Record<string, any>;
  onUnstakeLoadingChange?: (loading: boolean) => void;
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
  width: "100%",
  maxWidth: "320px",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    animation: `${breathShadow} 2s ease-in-out infinite`,
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "280px",
  },
}));

const ImageContainer = styled(Box)({
  width: "100%",
  aspectRatio: "1 / 1",
  position: "relative",
});

const BeeCardHive: React.FC<BeeCardHiveProps> = ({
  bee,
  onPlayClick,
  isOwnedByUser,
  variant = "default",
  additionalInfo = {},
  onUnstakeLoadingChange,
}) => {
  const { refreshBeesData, fetchServerCalculatedRewards } = useUserContext();
  const { refreshHiveData } = useHives();
  const { writeContractAsync, isPending } = useWriteHiveStakingUnstake();
  const theme = useTheme();
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "error" | "warning"
  >("success");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [showTxModal, setShowTxModal] = useState(false);

  const { getEnvironmentById, getHiveById } = useEnvironment();
  const environment = bee.environmentID
    ? getEnvironmentById(Number(bee.environmentID))
    : null;
  const hive = bee.hiveID
    ? getHiveById(Number(bee.environmentID), Number(bee.hiveID))
    : null;

  const router = useRouter();
  const rarityValue = RARITY_VALUES[bee.rarity ?? "Commonn"];
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [buttonClickSound, setButtonClickSound] =
    useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setButtonClickSound(
      new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3")
    );
  }, []);

  const handleHover = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleUnstakeClick = () => {
    if (!isMuted && buttonClickSound) {
      buttonClickSound.currentTime = 0;
      buttonClickSound.play();
    }
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
    if (!bee.environmentID || !bee.hiveID) {
      setAlertSeverity("error");
      setAlertMessage("Invalid environment or hive ID.");
      setSnackbarOpen(true);
      return;
    }
    try {
      logger.log("Initiating unstake transaction...");
      setShowTxModal(true);

      const tx = await writeContractAsync({
        args: [BigInt(bee.id), BigInt(bee.environmentID), BigInt(bee.hiveID)],
      });
      logger.log("Transaction initiated:", tx);
      if (tx) {
        setTransactionHash(tx as `0x${string}`);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Transaction failed to initiate.");
        setSnackbarOpen(true);
        logger.error("Transaction failed to initiate.");
        setShowTxModal(false);
      }
    } catch (err: any) {
      if (
        err?.message.includes("User rejected the request.") ||
        err?.message.includes("User denied")
      ) {
        setAlertSeverity("warning");
        setAlertMessage("User rejected transaction");
      } else {
        setAlertSeverity("error");
        setAlertMessage("Failed to unstake the Hatchling.");
        logger.error("Error during unstake transaction:", err);
      }
      setSnackbarOpen(true);
      setShowTxModal(false);
    }
  };

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({ hash: transactionHash });

  useEffect(() => {
    logger.log(
      "Transaction status - Loading:",
      isTransactionLoading,
      "Success:",
      isTransactionSuccess,
      "Error:",
      isTransactionError
    );

    if (isTransactionSuccess) {
      setAlertSeverity("success");
      setAlertMessage("Transaction completed successfully!");
      setSnackbarOpen(true);
      setTransactionHash(undefined);

      (async () => {
        try {
          const res = await fetch("/api/user/rewards/claimUnstakingYield", {
            method: "POST",
          });
          const data = await res.json();
          if (data.success) {
            logger.log("Unstaking yield claimed successfully", data);
          } else {
            logger.error("Failed to claim unstaking yield", data);
          }
        } catch (err) {
          logger.error("Error claiming unstaking yield", err);
        }
      })();
      fetchServerCalculatedRewards();
      if (bee.id && variant === "default") {
        logger.log(`Refreshing hive data for bee #${bee.id}, unstake action.`);
        refreshHiveData(bee.id, "unstake")
          .then(() => {
            logger.log("Hive data refreshed successfully.");
          })
          .catch((error) => {
            logger.error("Error refreshing hive data:", error);
            setAlertSeverity("error");
            setAlertMessage("Failed to refresh hive data.");
            setSnackbarOpen(true);
          });

        onUnstakeLoadingChange?.(true);

        refreshBeesData(bee.id, "unstake")
          .then(() => {
            logger.log("Bees data refreshed successfully.");
          })
          .catch((error) => {
            logger.error("Error refreshing bees data:", error);
            setAlertSeverity("error");
            setAlertMessage("Failed to refresh bees data.");
            setSnackbarOpen(true);
          })
          .finally(() => {
            onUnstakeLoadingChange?.(false);
          });
      }

      // Update user points and unclaimed rewards after unstake
      fetchServerCalculatedRewards();

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
        setAlertMessage(transactionError?.message || "Transaction failed.");
      }
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      logger.error("Transaction Error:", transactionError);
      setShowTxModal(false);
    }
  }, [
    isTransactionLoading,
    isTransactionSuccess,
    isTransactionError,
    transactionError,
    bee.id,
    variant,
    refreshHiveData,
    refreshBeesData,
    onUnstakeLoadingChange,
    fetchServerCalculatedRewards,
  ]);

  const handleCancelUnstake = () => {
    setConfirmModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

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
        <ImageContainer>
          <HatchlingImage
            imageAddress={
              bee.imageAddress !== ""
                ? bee.imageAddress
                : "/NFTs/Hatchlings.JPEG"
            }
            alt={`Hatchling ${bee.id}`}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </ImageContainer>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 1,
              marginLeft: 1,
            }}
          >
            <Stack alignItems="center" direction="row" gap={0.5}>
              <Typography
                variant="h6"
                fontSize="24px"
                sx={{
                  color: theme.palette.Gold.main,
                }}
              >
                {rarityValue}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              fontSize="20px"
              sx={{
                color: theme.palette.Gold.main,
                marginLeft: 1,
              }}
            >
              Honey Drops / Day
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="white"
            sx={{
              fontSize: "1.1rem",
              marginTop: "8px",
              marginLeft: 1,
              display: "inline-flex",
              gap: "6px",
              lineHeight: "1.2",
            }}
          >
            <Person
              sx={{
                fontSize: "1.1rem",
                display: "inline-flex",
                verticalAlign: "bottom",
                color: theme.palette.LightBlue.main,
              }}
            />
            <Box
              component="strong"
              sx={{
                color: isOwnedByUser ? theme.palette.LightBlue.main : "inherit",
                fontWeight: isOwnedByUser ? "bold" : "normal",
                lineHeight: "1.2",
                display: "inline-block",
              }}
            >
              {isOwnedByUser
                ? "You"
                : `${bee.ownerAddress.slice(0, 6)}...${bee.ownerAddress.slice(
                    -4
                  )}`}
            </Box>
          </Typography>
          <ActionButtonsHive
            onPlayClick={variant === "myBees" ? onPlayClick : undefined}
            onUnstakeClick={
              variant === "default" && isOwnedByUser
                ? handleUnstakeClick
                : undefined
            }
            isPending={isPending}
            isTransactionLoading={isTransactionLoading}
          />
        </Box>
        <TransactionInProgressModal
          open={showTxModal}
          onClose={() => setShowTxModal(false)}
          title="Unstaking in Progress..."
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{ zIndex: 2400 }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        {variant === "default" && (
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
        )}
      </BeeCardBackground>
    </StyledBeeCard>
  );
};

export default BeeCardHive;
