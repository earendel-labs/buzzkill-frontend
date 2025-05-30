"use client";

import React from "react";
import Box from "@mui/material/Box";
import VerifyPartnerNftButton from "@/components/Buttons/VerifyPartnerNFT/VerifyPartnerNFT";
const PANEL_WIDTH = 300;
const PANEL_HEIGHT = 100;

const LeftPanel: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: {
          xs: "3.3rem",
          sm: "4.4rem",
          md: "4.7rem",
          lg: "4.7rem",
          xl: "5.7rem",
          xxl: "6.0rem",
        },
        left: {
          sm: "1rem",
          md: "1rem",
          lg: "1.7rem",
          xl: "2.5rem",
          xxl: "5rem",
        },
        width: PANEL_WIDTH,
        height: PANEL_HEIGHT,
        display: "flex",
      }}
    >
      <VerifyPartnerNftButton />
    </Box>
  );
};

export default LeftPanel;
