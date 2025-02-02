"use client";
import React from "react";
import { Typography } from "@mui/material";

const MintPriceDisplay: React.FC = () => {
  return (
    <>
      {/* Heading */}
      <Typography
        variant="h1"
        sx={{
          mt: 1,
          mb: 1,
          textAlign: "center",
          fontSize: {
            xs: "1rem",
            md: "2rem",
            lg: "2.5rem",
            xxl: "3.5rem",
          },
          maxWidth: {
            xs: "90%",
            xxl: "500px",
          },
        }}
      >
        Mint Buzzkill Hatchlings
      </Typography>

      {/* Paragraph */}
      <Typography
        sx={{
          mb: 3,
          textAlign: "justify",
          maxWidth: "480px",
          fontSize: {
            xs: "0.9rem",
            sm: "1rem",
            xxl: "1.2rem",
          },
        }}
      >
        In the thawing world of Nectera, the Buzzkill Hatchlings are awakening
        after millennia of dormancy. Now’s your chance to explore the planet and
        earn Honey Drop Points. Mint up to 2 free Hatchlings, stake them in
        hives, and earn points based on their rarity. <br></br>
        <br></br>
        NOTE: There is a 1 minute cooldown between mints.
      </Typography>

      {/* Free Mint Price */}
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "480px",
          width: "100%",
          color: "#D4AF37",
          fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            md: "0.95rem",
            lg: "0.95rem",
            xl: "1.2rem",
            xxl: "1.5rem",
          },
        }}
      >
        <span>Total Price</span>
        <span style={{ color: "#FFD700" }}>FREE</span>
      </Typography>
    </>
  );
};

export default MintPriceDisplay;
