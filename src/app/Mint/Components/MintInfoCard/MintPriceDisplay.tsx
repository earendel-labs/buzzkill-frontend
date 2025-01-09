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
          mt: 2,
          mb: 2,
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
        Awaken a Buzzkill Hatchling from its two-million-year slumber!
        Mint now to embark on an epic journey to rejuvenate your hive
        in the thawing world of Nectera.
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
