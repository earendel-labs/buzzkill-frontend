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
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); // Close the modal if the backdrop is clicked
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        onClick={handleBackdropClick} // Capture clicks outside modal content
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
            bgcolor: "rgba(15, 28, 48, 0.85)", // Updated background to match MenuModal
            backdropFilter: "blur(10px)", // Background blur effect
            border: "1.5px solid #c9a227", // Previous outline remains
            borderRadius: 4,
            maxWidth: "600px",
            width: "90%",
            padding: "30px",
            boxShadow: 24,
            ...sx,
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        >
          {children}
        </Paper>
      </Box>
    </Modal>
  );
};

export default StyledModal;
