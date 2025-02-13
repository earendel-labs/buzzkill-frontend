"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { LoginButton } from "@/components/Buttons/LoginButton/Login";
import { useMintContext } from "@/context/MintContext";
import { useTheme } from "@mui/material/styles";
import { useUserContext } from "@/context/UserContext";

const MintActions: React.FC = () => {
  const theme = useTheme();
  const {
    mintedCount,
    totalSupply,
    isConnected,
    maxQuantity,
    errorMessage,
    isMinted,
    isMintLoading,
    isTransactionLoading,
    isCooldown,
    cooldownRemaining,
    handleMint,
  } = useMintContext();
  const { refreshBeesData } = useUserContext();

  const hasRemainingMint = maxQuantity > 0;

  if (!isConnected) {
    return (
      <Box sx={{ mt: 2, mb: 4 }}>
        <LoginButton loginButtonText="Connect Your Wallet" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 0,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* If user reached limit */}
      {!hasRemainingMint && (
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ mb: 2, color: theme.palette.Orange.light }}
        >
          You have reached the maximum minting limit.
        </Typography>
      )}

      {/* If minted successfully */}
      {isMinted && (
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ mb: 2, color: theme.palette.LightBlue.main }}
        >
          Minting successful!
        </Typography>
      )}

      {/* If error */}
      {errorMessage && !isMinted && (
        <Typography sx={{ mb: 4, color: theme.palette.Orange.light }}>
          {errorMessage}
        </Typography>
      )}

      {/* Loading states */}
      {isMintLoading || isTransactionLoading ? (
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ mb: 4, color: theme.palette.LightBlue.main }}
        >
          {isMintLoading
            ? "Minting..."
            : isTransactionLoading
            ? "Processing transaction..."
            : ""}
        </Typography>
      ) : (
        <>
          {hasRemainingMint && isCooldown && cooldownRemaining > 0 && (
            <Typography
              variant="body1"
              fontSize="20px"
              fontWeight="900"
              sx={{ mb: 2, color: theme.palette.Orange.main }}
            >
              Please wait {cooldownRemaining} seconds before minting again.
            </Typography>
          )}
          <PrimaryButton
            text={mintedCount === totalSupply ? "Fully Minted" : "Mint"}
            onClick={handleMint}
            scale={1.4}
            disabled={
              mintedCount === totalSupply ||
              !hasRemainingMint ||
              isMintLoading ||
              (isCooldown && cooldownRemaining > 0)
            }
          />
        </>
      )}
    </Box>
  );
};

export default MintActions;
