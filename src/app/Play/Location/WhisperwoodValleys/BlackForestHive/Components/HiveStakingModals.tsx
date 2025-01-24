// src/app/Play/Location/WhisperwoodValleys/BlackForestHive/components/HiveStakingModals.tsx

"use client";

import React, { FC } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard"; // Adjust import if needed

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  isLoading: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  isLoading,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`${title}-title`}
      aria-describedby={`${title}-description`}
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
          transparency={1}
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
            id={`${title}-title`}
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            id={`${title}-description`}
            variant="body1"
            align="center"
            sx={{ fontSize: "1rem" }}
          >
            {description}
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button onClick={onClose} variant="contained">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : confirmLabel}
            </Button>
          </Box>
        </SemiTransparentCard>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
