"use client";

import React from "react";
import { Modal, Box, Paper, SxProps, Theme } from "@mui/material";

interface StyledModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const StyledModal: React.FC<StyledModalProps> = ({
  open,
  onClose,
  children,
  sx,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
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
        <Paper
          sx={{
            bgcolor: "#0a1929",
            border: "1.5px solid #c9a227",
            borderRadius: 4,
            maxWidth: "600px",
            width: "90%",
            padding: "30px",
            boxShadow: 24,
            ...sx,
          }}
        >
          {children}
        </Paper>
      </Box>
    </Modal>
  );
};

export default StyledModal;
