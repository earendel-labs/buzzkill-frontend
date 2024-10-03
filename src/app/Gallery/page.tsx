"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import SemiTransaprentCard from "@/components/Card/SemiTransaprentCard";
import { formatEther } from "ethers"; // Use formatEther for native token balances
import { LoginButton } from "@/components/Buttons/LoginButton/Login";

// Placeholder data for total collection and minted count
const totalSupply = 10000;
const mintedCount = 3521;

const GalleryPage: React.FC = () => {
  return (
    <Layout>
      {/* Background */}
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
          src="/Mint/Background.png"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Layout>
  );
};

export default GalleryPage;
