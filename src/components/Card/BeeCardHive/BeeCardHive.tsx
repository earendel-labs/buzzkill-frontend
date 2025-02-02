// src/components/Card/BeeCardHive/BeeCardHive.tsx

import React, { useEffect, useState } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";
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
import TransactionInProgressModal from "@/app/Play/Location/WhisperwoodValleys/BlackForestHive/Components/TransactionInProgressModal";

export interface BeeCardHiveProps {
  bee: Hatchling;
  onPlayClick?: () => void;
  isOwnedByUser: boolean;
  variant?: "default" | "myBees";
  additionalInfo?: Record<string, any>;
  /**
   * Callback from BeeGrid to set "unstakingLoading"
   */
  onUnstakeLoadingChange?: (loading: boolean) => void;
}

const StyledBeeCard = styled(Box)(({ theme }) => ({
  // ...style...
}));

const ImageContainer = styled(Box)({
  // ...style...
});

const BeeCardHive: React.FC<BeeCardHiveProps> = ({
  bee,
  onPlayClick,
  isOwnedByUser,
  variant = "default",
  additionalInfo = {},
  onUnstakeLoadingChange,
}) => {
  const { refreshBeesData } = useUserContext();
  const { refreshHiveData } = useHives();
  const { writeContractAsync, isPending } = useWriteHiveStakingUnstake();

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
        // Do not log error to console if the user rejected the transaction.
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
  ]);

  const handleCancelUnstake = () => {
    setConfirmModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  return (
    <StyledBeeCard>
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

        <Box sx={{ padding: "16px", marginBottom: "12px" }}>
          <Typography
            variant="h6"
            color="white"
            sx={{ fontWeight: "bold", fontSize: "1.3rem", marginLeft: 1 }}
          >
            Hatchling ID: {bee.id}
          </Typography>

          <Typography
            variant="body1"
            color="white"
            sx={{ fontSize: "1.1rem", marginTop: "8px", marginLeft: 1 }}
          >
            <strong>{bee.rarity}</strong>
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
