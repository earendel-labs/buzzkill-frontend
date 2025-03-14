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
      onClose();
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
        onClick={handleBackdropClick}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(34, 46, 80, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1.5px solid #c9a227",
            borderRadius: 4,
            maxWidth: "600px",
            width: "90%",
            padding: "30px",
            boxShadow: 24,
            ...sx,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default StyledModal;
