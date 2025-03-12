"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import StyledModal from "@/components/Modals/StyledModal/StyledModal";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isConfirmLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  isConfirmLoading = false,
}) => {
  return (
    <StyledModal
      open={open}
      onClose={onCancel}
      sx={{
        padding: "30px",
        maxWidth: "500px",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Typography
        id="confirmation-modal-title"
        variant="h5"
        component="h2"
        align="center"
        sx={{ fontWeight: "bold", color: "#f0c850" }}
      >
        {title}
      </Typography>
      <Typography
        id="confirmation-modal-description"
        variant="body1"
        align="center"
        sx={{ fontSize: "1rem", color: "white" }}
      >
        {description}
      </Typography>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          className="goldOutlinedButton"
          sx={{
            padding: "10px 20px",
            fontWeight: "bold",
            borderColor: "#c9a227",
            color: "#f0c850",
          }}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isConfirmLoading}
          className="redButton"
          sx={{ fontWeight: "bold" }}
        >
          {isConfirmLoading ? "Processing..." : confirmButtonText}
        </Button>
      </Box>
    </StyledModal>
  );
};

export default ConfirmationModal;
