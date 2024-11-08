// src/components/Card/BeeCard.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Snackbar, Alert, Button, Modal } from "@mui/material";
import { styled } from "@mui/system";
import { Hatchling } from "@/types/Hatchling";
import HatchlingImage from "./HatchlingImage";
import { useWriteHiveStakingUnstake } from "@/hooks/HiveStaking";
import SemiTransparentCard from "../SemiTransaprentCard";
import { useWaitForTransactionReceipt } from "wagmi";
import { useEnvironment } from "@/context/EnvironmentContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HiveIcon from "@mui/icons-material/Hive";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

export interface BeeCardProps {
  bee: Hatchling;
  onPlayClick: (beeId: number) => void | Promise<void>;
}

const StyledBeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  width: "350px", // Adjusted width for better layout
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.8)",
  },
}));

const StatusChip = styled(Box)<{ isFree: boolean }>(({ theme, isFree }) => ({
  backgroundColor: isFree
    ? theme.palette.success.main
    : theme.palette.info.main,
  color: "white",
  padding: "4px 20px",
  borderRadius: "24px",
  position: "absolute",
  top: "16px",
  right: "16px",
  fontWeight: "bold",
  fontSize: "16px",
  zIndex: 1,
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "95%", // Set width to 95% of the container
  margin: "16px auto 0", // Center button with margin at the top
  padding: "6px 12px",
  fontSize: "1.1rem",
}));

const BeeCard: React.FC<BeeCardProps> = ({ bee, onPlayClick }) => {
  const { refreshBeesData } = useUserContext(); // Access refreshBeesData from context
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
  const hive =
    bee.environmentID && bee.hiveID
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
      refreshBeesData(); // Trigger data refresh
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
  ]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setAlertMessage("");
  };

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
          {bee.status === "Free" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 1,
                paddingTop: 1,
              }}
            >
              <ActionButton
                variant="contained"
                color="primary"
                onClick={() => onPlayClick(bee.id)}
                disabled={isPending || isTransactionLoading}
              >
                Play
              </ActionButton>
            </Box>
          ) : (
            <>
              {environment && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 1,
                    marginLeft: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontSize="16px"
                    color="lightgreen"
                    onClick={() =>
                      router.push(
                        `/Play/Location/${encodeURIComponent(
                          environment.name.replace(/\s+/g, "")
                        )}`
                      )
                    }
                    sx={{
                      cursor: "pointer",
                      marginRight: 1,
                      display: "flex", // Use flex display
                      alignItems: "center", // Center vertically
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <LocationOnIcon sx={{ marginRight: 0.5 }} />
                    {environment.name}
                  </Typography>
                </Box>
              )}
              {hive && (
                <Box sx={{ marginBottom: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 1.5,
                      marginLeft: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontSize="16px"
                      color="lightblue"
                      onClick={() => {
                        if (environment?.name && hive.name) {
                          router.push(
                            `/Play/Location/${encodeURIComponent(
                              environment.name.replace(/\s+/g, "")
                            )}/${encodeURIComponent(
                              hive.name.replace(/\s+/g, "")
                            )}`
                          );
                        } else {
                          console.error("Environment or hive name is missing");
                          // Optionally, provide alternative behavior here if values are undefined
                        }
                      }}
                      sx={{
                        cursor: "pointer",
                        marginLeft: 0.25,
                        display: "flex", // Use flex display
                        alignItems: "center", // Center vertically
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <HiveIcon sx={{ marginRight: 0.5 }} />
                      {hive.name}
                    </Typography>
                  </Box>
                  <ActionButton
                    variant="contained"
                    color="primary"
                    onClick={handleUnstakeClick}
                    disabled={isPending || isTransactionLoading}
                    sx={{ marginLeft: "auto" }}
                  >
                    {isPending || isTransactionLoading
                      ? "Unstaking..."
                      : "Unstake"}
                  </ActionButton>
                </Box>
              )}
            </>
          )}
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
        <Modal
          open={confirmModalOpen}
          onClose={handleCancelUnstake}
          aria-labelledby="confirm-unstake-title"
          aria-describedby="confirm-unstake-description"
        >
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1300,
            }}
          >
            <SemiTransparentCard
              transparency={0.8}
              sx={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
                maxWidth: "500px",
                width: "90%",
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
                <strong>{hive ? hive.name : `Unknown Hive`}</strong>?
              </Typography>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Button onClick={handleCancelUnstake} variant="contained">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmUnstake}
                  variant="contained"
                  disabled={isPending || isTransactionLoading}
                >
                  {isPending || isTransactionLoading
                    ? "Unstaking..."
                    : "Unstake"}
                </Button>
              </Box>
            </SemiTransparentCard>
          </Box>
        </Modal>
      </SemiTransparentCard>
    </StyledBeeCard>
  );
};

export default BeeCard;
