"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import StyledModal from "@/components/Modals/StyledModal/StyledModal";
import GoldOutlinedButton from "@/components/Buttons/GoldOutlinedButton/GoldOutlinedButton";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";

interface DisconnectDialogProps {
  open: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

const DisconnectDialog: React.FC<DisconnectDialogProps> = ({
  open,
  onClose,
  onDisconnect,
}) => {
  return (
    <StyledModal open={open} onClose={onClose} sx={{ maxWidth: "500px" }}>
      {/* Dialog Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#D4AF37",
          letterSpacing: "1px",
        }}
      >
        Disconnect Wallet
      </Typography>

      {/* Dialog Description */}
      <Typography
        variant="body1"
        sx={{
          opacity: 0.85,
          fontSize: "1rem",
          mb: 5,
        }}
      >
        Do you want to disconnect your wallet?
      </Typography>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 3, // More balanced spacing
          width: "100%",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        {/* Cancel Button - Matches GoldOutlinedButton */}
        <GoldOutlinedButton
          text="Cancel"
          onClick={onClose}
          sx={{
            width: "140px",
            padding: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        />

        {/* Disconnect Button - Matches PrimaryButton without glow */}
        <DefaultButton
          className="oneIDRedButton"
          onClick={onDisconnect}
          sx={{
            width: "140px",
            padding: "10px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Disconnect
        </DefaultButton>
      </Box>
    </StyledModal>
  );
};

export default DisconnectDialog;
