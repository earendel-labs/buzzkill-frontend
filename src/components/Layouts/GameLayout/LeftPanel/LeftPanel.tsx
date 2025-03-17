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
          sm: "4rem",
          md: "5rem",
          xl: "9.3rem",
          xxl: "6.4rem",
        },  
        left: {
          xs: "0rem",  
          sm: "0rem",
          md: "2.6rem",
          xl: "3.7rem",
          xxl: "6.5rem",
        },
        width: PANEL_WIDTH,
        height: PANEL_HEIGHT,
        padding: { xs: "4px", sm: "2px" }, // Reduced padding for mobile
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
