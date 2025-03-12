"use client";

import React from "react";
import { Typography } from "@mui/material";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import StyledModal from "../StyledModal/StyledModal";

interface TransactionInProgressModalProps {
  open: boolean;
  onClose: () => void;
  title?: string; // Allows "Staking" or "Unstaking"
}

const TransactionInProgressModal: React.FC<TransactionInProgressModalProps> = ({
  open,
  onClose,
  title = "Transaction in Progress...",
}) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
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
    </StyledModal>
  );
};

export default TransactionInProgressModal;
