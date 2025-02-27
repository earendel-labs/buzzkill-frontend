"use client";

import React from "react";
import Box from "@mui/material/Box";
import VerifyPartnerNftButton from "@/components/Buttons/VerifyPartnerNFT/VerifyPartnerNFT";
const PANEL_WIDTH = 300; // Adjusted width for top-left placement
const PANEL_HEIGHT = 100; // Adjusted height to fit the space

const LeftPanel: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: {
          xs: "100%",
          md: "7rem",
          xl: "9.3rem",
          xxl: "10rem",
        }, // Positioned right below the Resource Bar
        left: {
          xs: "100%",
          md: "3rem",
          xl: "5.7rem",
          xxl: "7rem",
        },
        // Adjusted to align with the red bo
        padding: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <VerifyPartnerNftButton />
    </Box>
  );
};

export default LeftPanel;
