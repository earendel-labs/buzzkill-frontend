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
          sm: "6rem",
          md: "6.5rem",
          xl: "7.3rem",
          xxl: "8rem",
        },
        left: {
          xs: "0rem",
          sm: "1.3rem",
          md: "1.4rem",
          lg: "3.9rem",
          xl: "6.4rem",
          xxl: "7.5rem",
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
