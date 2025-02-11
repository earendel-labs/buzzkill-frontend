"use client";
import React from "react";
import { Box } from "@mui/material";
import MintedCountDisplay from "./MintedCountDisplay";
import MintPriceDisplay from "./MintPriceDisplay";
import SelectQuantityPanel from "./SelectQuantityPanel";
import MintActions from "./MintActions";

const MintInfoCard: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        padding: {
          xs: "1rem",
          md: "2rem",
          lg: "1rem",
          xxl: "1.7rem",
        },
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          backdropFilter: "blur(2px)",
          borderRadius: "3px",
          boxSizing: "border-box",
        }}
      >
        {/* Mint Title & Description */}
        <MintPriceDisplay />

        {/* Minted Count */}
        <MintedCountDisplay />

        {/* Quantity Panel */}
        {/* <SelectQuantityPanel /> */}

        {/* Mint / Error / Success Handling */}
        <MintActions />
      </Box>
    </Box>
  );
};

export default MintInfoCard;
