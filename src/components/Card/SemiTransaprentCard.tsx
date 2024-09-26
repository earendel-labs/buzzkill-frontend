import React from "react";
import { Box } from "@mui/material";

interface SemiTransaprentCardProps {
  children: React.ReactNode;
}

const SemiTransaprentCard: React.FC<SemiTransaprentCardProps> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "24px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        border: "2px solid rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(2px)",
        borderRadius: "3px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default SemiTransaprentCard;
