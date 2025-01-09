"use client";
import React from "react";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { useMintContext } from "@/context/MintContext";

const MintedCountDisplay: React.FC = () => {
  const theme = useTheme();
  const {
    mintedCount,
    totalSupply,
    isMintedCountLoading,
    isTotalSupplyLoading,
    isMintedCountError,
    isTotalSupplyError,
  } = useMintContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "480px",
        width: "100%",
        marginTop: "0.5rem",
        flexDirection: {
          xs: "row",
          sm: "row",
        },
        alignItems: { xs: "center", sm: "unset" },
      }}
    >
      <Typography
        variant="h5"
        sx={{
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
        Total Minted
      </Typography>

      {isMintedCountLoading || isTotalSupplyLoading ? (
        <Skeleton
          variant="rectangular"
          width={180}
          height={40}
          sx={{
            borderRadius: 1,
            backgroundColor: theme.palette.DarkBlue.main,
          }}
        />
      ) : isMintedCountError || isTotalSupplyError ? (
        <Typography
          color="error"
          sx={{ fontSize: "0.875rem", color: "#FF6347" }}
        >
          Error loading data
        </Typography>
      ) : (
        <Typography
          variant="h5"
          sx={{
            color: "#FFD700",
            fontSize: {
              xs: "0.75rem",
              sm: "0.875rem",
              md: "0.95rem",
              lg: "0.95rem",
              xl: "1.4rem",
              xxl: "1.7rem",
            },
          }}
        >
          {mintedCount}/{totalSupply}
        </Typography>
      )}
    </Box>
  );
};

export default MintedCountDisplay;
