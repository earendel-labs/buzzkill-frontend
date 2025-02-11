"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useMintContext } from "@/context/MintContext";

const SelectQuantityPanel: React.FC = () => {
  const {
    isConnected,
    formattedBalance,
    isBalanceLoading,
    quantity,
    maxQuantity,
    incrementQuantity,
    decrementQuantity,
  } = useMintContext();

  // The max # user can still mint (from context)
  const remainingMint = maxQuantity;

  // For now, we want to restrict the user to only mint 1 at a time.
  // We keep the remaining logic intact but force disable the increment button.
  const disableIncrement = true;

  if (!isConnected) {
    return null;
  }

  return (
    <>
      {/* Your Balance */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "480px",
          width: "100%",
          flexDirection: { xs: "column", sm: "row" },
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
          Your Balance
        </Typography>
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
          {isBalanceLoading ? "Loading..." : `${formattedBalance} VIC`}
        </Typography>
      </Box>

      {/* Select Quantity */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "480px",
          width: "100%",
          alignItems: "center",
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
            lineHeight: "1.5rem",
          }}
        >
          Select Quantity. Max {remainingMint > 0 ? remainingMint : 0}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Decrement Button */}
          <Button
            onClick={decrementQuantity}
            disabled={quantity === 1 || remainingMint <= 0}
            disableRipple
            disableElevation
            variant="text"
            sx={{
              fontSize: "1.5rem",
              color:
                quantity === 1 || remainingMint <= 0 ? "#b8ab67" : "#FFD700",
              opacity: 1,
              cursor:
                quantity === 1 || remainingMint <= 0
                  ? "not-allowed"
                  : "pointer",
              minWidth: "20px",
              height: "30px",
              padding: 0,
              backgroundColor: "transparent",
              border: "none",
              marginRight: 0,
              "&:disabled": {
                color: "#b8ab67",
                opacity: 0.6,
              },
            }}
          >
            -
          </Button>

          {/* Display Quantity */}
          <Typography
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
              width: "30px",
              textAlign: "center",
              lineHeight: "30px",
            }}
          >
            {quantity}
          </Typography>

          {/* Increment Button */}
          <Button
            onClick={incrementQuantity}
            disabled={
              disableIncrement ||
              quantity === remainingMint ||
              remainingMint <= 0
            }
            disableRipple
            disableElevation
            variant="text"
            sx={{
              fontSize: "1.5rem",
              color:
                disableIncrement ||
                quantity === remainingMint ||
                remainingMint <= 0
                  ? "#b8ab67"
                  : "#FFD700",
              opacity: 1,
              cursor:
                disableIncrement ||
                quantity === remainingMint ||
                remainingMint <= 0
                  ? "not-allowed"
                  : "pointer",
              minWidth: "20px",
              height: "30px",
              padding: 0,
              backgroundColor: "transparent",
              border: "none",
              marginRight: 0,
              "&:disabled": {
                color: "#b8ab67",
                opacity: 0.6,
              },
            }}
          >
            +
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SelectQuantityPanel;
