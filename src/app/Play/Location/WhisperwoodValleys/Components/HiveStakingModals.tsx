"use client";

import React, { FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import StyledModal from "@/components/Modals/StyledModal/StyledModal";
import { ArrowCircleUp as UpgradeIcon } from "@mui/icons-material";

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
    <StyledModal open={open} onClose={onClose}>
      {/* Title */}
      <Typography
        id="modal-title"
        variant="h5"
        component="h2"
        align="center"
        sx={{ color: "#f0c850", fontWeight: "bold", px: 3, pt: 3, pb: 1 }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography
        id="modal-description"
        variant="body1"
        align="center"
        sx={{ fontSize: "1rem", px: 3, pb: 3, color: "white" }}
      >
        {description}
      </Typography>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          px: 3,
          pb: 4,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          className="goldOutlinedButton"
          sx={{
            color: "#f0c850",
            padding: "10px 20px",
            borderColor: "#c9a227",
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isLoading}
          className="goldButtonHorizontal"
          startIcon={<UpgradeIcon />}
        >
          {isLoading ? "Processing..." : confirmLabel}
        </Button>
      </Box>
    </StyledModal>
  );
};

export default ConfirmModal;
