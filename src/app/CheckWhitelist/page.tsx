"use client";
import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "@/components/Layouts/Layout/Layout";
import SemiTransparentCard from "@/components/Card/SemiTransaprentCard";
import axios from "axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DefaultButton from "@/components/Buttons/DefaultButton/DefaultButton";

function isValidEVMAddress(address: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

const CheckWhitelistPage: React.FC = () => {
  const theme = useTheme();
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleCheckWhitelist = async () => {
    setError("");
    setSuccessMessage("");

    if (!isValidEVMAddress(walletAddress)) {
      setError("Invalid EVM address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/nft-mint/checkWhitelist", {
        address: walletAddress,
      });
      const { whitelisted } = response.data;

      if (whitelisted) {
        setSuccessMessage("Address is whitelisted!");
      } else {
        setError("Address is not whitelisted.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      // Disable further submits for 5 seconds
      setSubmitDisabled(true);
      setTimeout(() => {
        setSubmitDisabled(false);
      }, 5000);
    }
  };

  return (
    <Layout>
      {/* Full-Screen Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/Mint/Background.jpg"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      </Box>

      {/* Centered Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          px: 2,
        }}
      >
        <SemiTransparentCard
          sx={{
            // Fills width up to 1600px
            width: "100%",
            maxWidth: "1600px",
            // Minimum 600px after small screens
            // (Allows shrink below 600px for xs devices)
            [theme.breakpoints.up("sm")]: {
              minWidth: "600px",
            },
            p: 8, // More padding inside
            mx: "auto",
            textAlign: "left", // Left-justify text
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
            Wallet Checker
          </Typography>

          {/* Label */}
          <Box sx={{ mb: 2 }}>
            <Typography
              component="div"
              sx={{
                fontWeight: "bold",
                color: "white",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start", // left-aligned
                gap: 1,
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: "white", fontSize: 24 }} />
              <Typography variant="h6" component="span" sx={{ color: "white" }}>
                Wallet Address
              </Typography>
            </Typography>
          </Box>

          {/* TextField with Filled Variant & Custom Styles */}
          <TextField
            variant="filled"
            fullWidth
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address"
            InputProps={{ disableUnderline: true }}
            sx={{
              mb: 4,
              input: {
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderRadius: "6px",
                backgroundColor: theme.palette.DarkBlueFaded.light,
                "&:-webkit-autofill": {
                  WebkitBoxShadow: `0 0 0 100px ${theme.palette.DarkBlueFaded.light} inset`,
                  WebkitTextFillColor: "white",
                },
                "&.Mui-disabled": {
                  WebkitTextFillColor: "white",
                  color: "white",
                },
              },
              "& .MuiFilledInput-root": {
                borderRadius: "6px",
                border: `1px solid ${theme.palette.DarkBlueFaded.light}`,
                backgroundColor: theme.palette.DarkBlueFaded.light,
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                  borderColor: "#609de6",
                },
                "&.Mui-focused": {
                  borderColor: "#568cdb",
                  outline: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: theme.palette.DarkBlueFaded.dark,
                  borderColor: "transparent",
                },
              },
            }}
          />

          <DefaultButton
            className="blueButton"
            onClick={handleCheckWhitelist}
            disabled={loading || submitDisabled}
            sx={{ mb: 3 }}
          >
            {loading ? "Checking..." : "Check Wallet"}
          </DefaultButton>

          {/* Display the result below the button instead of a toast */}
          {(error || successMessage) && (
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                color: error ? theme.palette.DarkOrange.main : "limegreen",
                whiteSpace: "pre-line",
              }}
            >
              {error || successMessage}
            </Typography>
          )}
        </SemiTransparentCard>
      </Box>
    </Layout>
  );
};

export default CheckWhitelistPage;
