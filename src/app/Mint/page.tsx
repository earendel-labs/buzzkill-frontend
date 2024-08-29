"use client";
import React, { useState } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";

// Placeholder data for total collection and minted count
const totalSupply = 10000;
const mintedCount = 3521;

const MintPage: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState<string | null>(null);

  const handleConnectWallet = () => {
    // Placeholder logic for connecting wallet
    console.log("Connecting wallet...");
    setIsWalletConnected(true);
  };

  const handleMint = async () => {
    setIsMinting(true);

    // Placeholder logic for minting
    console.log("Minting...");
    setTimeout(() => {
      setMintedNFT("/NFTs/WorkerBee.png"); // Replace with actual NFT image URL
      setIsMinting(false);
    }, 3000); // Simulate minting delay
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h1" sx={{ mb: 2 }}>
          Mint Buzzkill
        </Typography>

        {/* Display Minted Count */}
        <Typography variant="h3" sx={{ mb: 4 }}>
          {mintedCount}/{totalSupply} Minted
        </Typography>

        {/* Mint Button or Connect Wallet Button */}
        {!isWalletConnected ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleConnectWallet}
            sx={{ mb: 4 }}
          >
            Connect Wallet
          </Button>
        ) : isMinting ? (
          <CircularProgress color="inherit" sx={{ mb: 4 }} />
        ) : (
          <Button variant="contained" color="primary" onClick={handleMint}>
            Mint
          </Button>
        )}

        {/* Display Minted NFT */}
        {mintedNFT && (
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={mintedNFT}
              alt="Minted NFT"
              style={{
                maxWidth: "300px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            />
            <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
              You have successfully minted your NFT!
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default MintPage;
