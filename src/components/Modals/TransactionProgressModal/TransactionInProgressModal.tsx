// src/app/Play/Location/WhisperwoodValleys/BlackForestHive/Components/TransactionInProgressModal.tsx
"use client";

import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";

interface TransactionInProgressModalProps {
  open: boolean;
  onClose: () => void;
  title?: string; // <-- Allows "Staking" or "Unstaking"
}

const TransactionInProgressModal: React.FC<TransactionInProgressModalProps> = ({
  open,
  onClose,
  title = "Transaction in Progress...",
}) => {
  return (
    <Modal open={open} onClose={onClose}>
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
          transparency={1}
          sx={{
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            maxWidth: "500px",
            width: "90%",
            boxShadow: 24,
          }}
        >
          <HexagonSpinner />
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">
            Please check your wallet to confirm the transaction
          </Typography>
        </SemiTransparentCard>
      </Box>
    </Modal>
  );
};

export default TransactionInProgressModal;
