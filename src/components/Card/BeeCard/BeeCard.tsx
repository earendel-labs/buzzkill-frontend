// src/components/Card/BeeCard.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";
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

export interface BeeCardProps {
  bee: Hatchling;
  onPlayClick: (beeId: number) => void | Promise<void>;
  isOwnedByUser: boolean; // Determines if "Unstake" button should be shown
  variant?: "default" | "hive" | "myBees"; // Context variants
  additionalInfo?: Record<string, any>; // Any extra data required by specific views
}

const StyledBeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  width: "350px",
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.8)",
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

  // Handle Unstake button click
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
      console.log(`BigInt(id): ${BigInt(id)}
       BigInt(environmentID ${BigInt(environmentID)}):
      BigInt(hiveID: ${BigInt(hiveID)})`);
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
      setAlertMessage("Successfully unstaked the Hatchling!");
      setSnackbarOpen(true);
      setTransactionHash(undefined);
      refreshBeesData();

      console.log("Called refreshBeesData() after successful transaction.");
    }
    if (isTransactionError) {
      setAlertSeverity("error");
      setAlertMessage(
        transactionError?.message || "Failed to unstake the Hatchling."
      );
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

  // Prepare links based on variant
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

  // Determine ownerAddress based on variant
  const ownerAddressToShow =
    variant !== "myBees" ? (isOwnedByUser ? "You" : "Other") : undefined;

  return (
    <StyledBeeCard>
      <SemiTransparentCard>
        <HatchlingImage
          imageAddress={bee.imageAddress}
          alt={`Hatchling ${bee.id}`}
          sx={{ width: "100%", height: "250px", objectFit: "cover" }} // Set height for square image
        />
        <StatusChip isFree={bee.status === "Free"}>{bee.status}</StatusChip>
        <Box sx={{ padding: "16px" }}>
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
            environmentLink={environmentLink}
            hiveLink={hiveLink}
            ownerAddress={ownerAddressToShow} // Conditionally pass ownerAddress
          />
          <ActionButtons
            onPlayClick={
              bee.status === "Free" ? () => onPlayClick(bee.id) : undefined
            } // Zero-arg function
            onUnstakeClick={
              bee.status === "Staked" && isOwnedByUser
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
      </SemiTransparentCard>
    </StyledBeeCard>
  );
};

export default BeeCard;
