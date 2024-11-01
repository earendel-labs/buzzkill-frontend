// src/components/Card/BeeCard/BeeCard.tsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Button,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import { Hatchling } from "@/types/Hatchling";
import HatchlingStatus from "./HatchlingStatus";
import ActionOverlay from "./ActionOverlay"; // Ensure correct relative path
import HatchlingImage from "./HatchlingImage";
import { useWriteHiveStakingUnstake } from "@/hooks/HiveStaking"; // Ensure correct relative path
import SemiTransparentCard from "../SemiTransaprentCard"; // Ensure correct relative path
import { useWaitForTransactionReceipt } from "wagmi"; // Import useWaitForTransactionReceipt
import { useEnvironment } from "@/context/EnvironmentContext"; // Import useEnvironment

export interface BeeCardProps {
  bee: Hatchling;
  onPlayClick: (beeId: number) => void | Promise<void>;
}

const StyledBeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover .overlay, &:hover .actionButtonWrapper": {
    opacity: 1,
    visibility: "visible",
  },
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.8)",
  },
}));

const BeeCard: React.FC<BeeCardProps> = ({ bee, onPlayClick }) => {
  // Destructure the correct properties from the Wagmi-generated hook
  const { writeContractAsync, isPending, isSuccess, isError, error } =
    useWriteHiveStakingUnstake();

  // State for Snackbar notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");

  // State for Confirmation Modal
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // State to capture transaction hash
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);

  // Access environment and hive data
  const { getEnvironmentById, getHiveById } = useEnvironment();

  const environment = bee.environmentID
    ? getEnvironmentById(Number(bee.environmentID))
    : null;
  const hive =
    bee.environmentID && bee.hiveID
      ? getHiveById(Number(bee.environmentID), Number(bee.hiveID))
      : null;

  // Debugging: Log environment and hive information
  useEffect(() => {
    console.log("Hatchling ID:", bee.id);
    console.log("Environment ID:", bee.environmentID);
    console.log("Hive ID:", bee.hiveID);
    console.log("Environment Object:", environment);
    console.log("Hive Object:", hive);
  }, [bee.id, bee.environmentID, bee.hiveID, environment, hive]);

  // Handler for unstaking
  const handleUnstakeClick = () => {
    if (
      bee.id !== undefined &&
      bee.environmentID !== null &&
      bee.hiveID !== null
    ) {
      setConfirmModalOpen(true);
    } else {
      console.error("Missing necessary IDs to unstake.");
      setAlertSeverity("error");
      setAlertMessage("Missing necessary IDs to unstake.");
      setSnackbarOpen(true);
    }
  };

  // Confirm Unstake
  const handleConfirmUnstake = async () => {
    setConfirmModalOpen(false);

    // Destructure bee properties for clarity
    const { id, environmentID, hiveID } = bee;

    // Type Narrowing: Ensure environmentID and hiveID are not null
    if (environmentID === null || hiveID === null) {
      console.error("Cannot unstake: environmentID or hiveID is null.");
      setAlertSeverity("error");
      setAlertMessage("Invalid environment or hive ID.");
      setSnackbarOpen(true);
      return;
    }

    // Now TypeScript knows environmentID and hiveID are not null
    try {
      const tx = await writeContractAsync({
        args: [
          BigInt(id), // Convert id to BigInt
          BigInt(environmentID), // Convert environmentID to BigInt
          BigInt(hiveID), // Convert hiveID to BigInt
        ],
      });

      // Capture the transaction hash to monitor its receipt
      if (tx) {
        setTransactionHash(tx as `0x${string}`);
        console.log("Transaction initiated with hash:", tx);
      } else {
        // If tx.hash is undefined, handle it as an error
        console.error("Transaction hash is undefined.");
        setAlertSeverity("error");
        setAlertMessage("Transaction failed to initiate.");
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Unstake failed:", err);
      // Handle error by showing an error Snackbar
      setAlertSeverity("error");
      setAlertMessage("Failed to unstake the Hatchling.");
      setSnackbarOpen(true);
    }
  };

  // Cancel Unstake
  const handleCancelUnstake = () => {
    setConfirmModalOpen(false);
  };

  // Use `useWaitForTransactionReceipt` to track the transaction
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  // Effect to handle transaction status
  useEffect(() => {
    if (isTransactionSuccess) {
      setAlertSeverity("success");
      setAlertMessage("Successfully unstaked the Hatchling!");
      setSnackbarOpen(true);
      // Optionally, refresh data or update UI
      setTransactionHash(undefined); // Reset transaction hash
    }
    if (isTransactionError) {
      setAlertSeverity("error");
      setAlertMessage(
        transactionError?.message || "Failed to unstake the Hatchling."
      );
      setSnackbarOpen(true);
      setTransactionHash(undefined); // Reset transaction hash
    }
  }, [isTransactionSuccess, isTransactionError, transactionError]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

  return (
    <StyledBeeCard>
      <Typography
        variant="body2"
        color="white"
        sx={{
          position: "absolute",
          top: "8px",
          left: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Hatchling ID: {bee.id}
      </Typography>
      <HatchlingImage
        imageAddress={bee.imageAddress}
        alt={`Hatchling ${bee.id}`}
      />
      {bee.status === "Free" ? (
        <ActionOverlay
          actionType="Play"
          onActionClick={() => onPlayClick(bee.id)}
        />
      ) : (
        <ActionOverlay
          actionType="Unstake"
          onActionClick={handleUnstakeClick}
          isLoading={isPending || isTransactionLoading} // Disable during pending or transaction
        />
      )}
      <HatchlingStatus
        status={bee.status}
        environmentID={
          bee.environmentID !== null ? Number(bee.environmentID) : null
        }
        hiveID={bee.hiveID !== null ? Number(bee.hiveID) : null}
      />

      {/* Snackbar for transaction feedback */}
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

      {/* Confirmation Modal for Unstake */}
      <Modal
        open={confirmModalOpen}
        onClose={handleCancelUnstake}
        aria-labelledby="confirm-unstake-title"
        aria-describedby="confirm-unstake-description"
      >
        <Box
          sx={{
            position: "fixed", // Ensure the modal covers the entire screen
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300, // Ensure it's above other elements
          }}
        >
          <SemiTransparentCard
            sx={{
              transparency: 1, // No transparency
              padding: "30px", // Increased padding for comfort
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px", // Increased gap for better spacing
              maxWidth: "500px",
              width: "90%", // Responsive width
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
              <strong>Hatchling ID {bee.id}</strong> from{" "}
              <strong>{hive ? hive.name : `Hive ID ${bee.hiveID}`}</strong> in{" "}
              <strong>
                {environment ? environment.name : `Unknown Environment`}
              </strong>
              ?
            </Typography>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Button
                onClick={handleCancelUnstake}
                className="goldButton" // Use goldButton for Cancel
                variant="contained" // Ensure consistent styling
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmUnstake}
                className="blueConnectWallet" // Use blueConnectWallet for Unstake
                variant="contained" // Ensure consistent styling
                disabled={isPending || isTransactionLoading} // Disable during pending or transaction
              >
                {isPending || isTransactionLoading ? "Unstaking..." : "Unstake"}
              </Button>
            </Box>
          </SemiTransparentCard>
        </Box>
      </Modal>
    </StyledBeeCard>
  );
};

export default BeeCard;
