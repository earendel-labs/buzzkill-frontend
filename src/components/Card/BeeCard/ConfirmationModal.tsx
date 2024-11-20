// src/components/Card/ConfirmationModal.tsx

import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import SemiTransparentCard from "../SemiTransaprentCard";

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
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
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
          sx={{
            maxWidth: "500px",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "30px",
          }}
        >
          <Typography
            id="confirmation-modal-title"
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <Typography
            id="confirmation-modal-description"
            variant="body1"
            align="center"
            sx={{ fontSize: "1rem" }}
          >
            {description}
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button onClick={onCancel} variant="contained">
              {cancelButtonText}
            </Button>
            <Button
              onClick={onConfirm}
              variant="contained"
              color="primary"
              disabled={isConfirmLoading}
            >
              {isConfirmLoading ? "Processing..." : confirmButtonText}
            </Button>
          </Box>
        </SemiTransparentCard>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
