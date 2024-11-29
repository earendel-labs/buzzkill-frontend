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
import BeeInfo from "../BeeCard/BeeInfo";
import BeeCardBackground from "../BeeCard/BeeCardBackground";
export interface BeeCardHiveProps {
  bee: Hatchling;
  onPlayClick?: () => void;
  isOwnedByUser: boolean;
  variant?: "default" | "myBees";
  additionalInfo?: Record<string, any>;
}

const StyledBeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  width: "100%", // Make width 100% of its container
  maxWidth: "320px", // Set a maximum width to scale down
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.8)",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "280px", // Further reduce width on small screens
  },
}));

const ImageContainer = styled(Box)({
  width: "100%",
  aspectRatio: "1 / 1", // Maintains a square aspect ratio
  position: "relative",
});

const BeeCardHive: React.FC<BeeCardHiveProps> = ({
  bee,
  onPlayClick,
  isOwnedByUser,
  variant = "default",
  additionalInfo = {},
}) => {
  const { refreshBeesData } = useUserContext();
  const { writeContractAsync, isPending } = useWriteHiveStakingUnstake();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const { getEnvironmentById, getHiveById } = useEnvironment();
  const environment = bee.environmentID
    ? getEnvironmentById(Number(bee.environmentID))
    : null;
  const hive = bee.hiveID
    ? getHiveById(Number(bee.environmentID), Number(bee.hiveID))
    : null;
  const router = useRouter();

  // Handle Unstake button click (only in default variant)
  const handleUnstakeClick = () => {
    if (bee.id !== undefined && environment && hive) {
      setConfirmModalOpen(true);
    } else {
      setAlertSeverity("error");
      setAlertMessage("Missing necessary IDs to unstake.");
      setSnackbarOpen(true);
    }
  };

  // Confirm Unstake
  const handleConfirmUnstake = async () => {
    setConfirmModalOpen(false);
    const { id, environmentID, hiveID } = bee;
    if (environmentID === null || hiveID === null) {
      setAlertSeverity("error");
      setAlertMessage("Invalid environment or hive ID.");
      setSnackbarOpen(true);
      return;
    }
    try {
      console.log("Initiating unstake transaction...");
      const tx = await writeContractAsync({
        args: [BigInt(id), BigInt(environmentID), BigInt(hiveID)],
      });
      console.log("Transaction initiated:", tx);
      if (tx) {
        setTransactionHash(tx as `0x${string}`);
        console.log("Transaction hash set:", tx);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Transaction failed to initiate.");
        setSnackbarOpen(true);
        console.error("Transaction failed to initiate.");
      }
    } catch (err) {
      setAlertSeverity("error");
      setAlertMessage("Failed to unstake the Hatchling.");
      setSnackbarOpen(true);
      console.error("Error during unstake transaction:", err);
    }
  };

  // Cancel Unstake
  const handleCancelUnstake = () => {
    setConfirmModalOpen(false);
  };

  // Wait for transaction receipt
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  // Handle transaction success or error
  useEffect(() => {
    console.log(
      "Transaction Receipt Status - Loading:",
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
      refreshBeesData();
      console.log("Called refreshBeesData() after successful transaction.");
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
    refreshBeesData,
    isTransactionLoading,
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  // Determine ownerAddress based on variant
  const ownerAddressToShow =
    variant === "default"
      ? isOwnedByUser
        ? "You"
        : bee.ownerAddress
      : undefined;
  /**   bee.rarity === "Common" ||
          bee.rarity === "Rare" ||
          bee.rarity === "Ultra Rare"
            ? bee.rarity
            : "Common" // Fallback to "common" if the value doesn't match */
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
            imageAddress={bee.imageAddress}
            alt={`Hatchling ${bee.id}`}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }} // Ensure image covers the container
          />
        </ImageContainer>
        {/* StatusChip is no longer needed as all bees are staked in default variant */}
        <Box sx={{ padding: "16px" }}>
          <Typography
            variant="h6"
            color="white"
            sx={{ fontWeight: "bold", fontSize: "1.3rem", marginLeft: 1 }}
          >
            Hatchling ID: {bee.id}
          </Typography>

          {/* Display Rarity */}
          <Typography
            variant="body1"
            color="white"
            sx={{ fontSize: "1.1rem", marginTop: "8px", marginLeft: 1 }}
          >
            <strong>{bee.rarity}</strong>
          </Typography>

          <ActionButtonsHive
            onPlayClick={variant === "myBees" ? onPlayClick : undefined} // Pass onPlayClick only for myBees
            onUnstakeClick={
              variant === "default" && isOwnedByUser
                ? handleUnstakeClick
                : undefined
            }
            isPending={isPending}
            isTransactionLoading={isTransactionLoading}
          />
        </Box>

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

        {/* Confirmation Modal for Unstaking */}
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
