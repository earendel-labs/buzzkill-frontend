"use client";
import React from "react";
import { Grid, Box, Snackbar, Alert, Link } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import NFTCard from "@/app/Mint/Components/MintCard/MintCard";
import { MintProvider, useMintContext } from "@/context/MintContext";
import MintInfoCard from "./Components/MintInfoCard/MintInfoCard";

const MintPageContent: React.FC = () => {
  // We can consume just what we need from the context to display the first column or handle snackbars
  const {
    transactionHash,
    snackbarOpen,
    setSnackbarOpen,
    errorMessage,
    isMinted,
  } = useMintContext();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Some dummy data for NFTCard
  const nftData = {
    id: "17",
    energy: "75/95",
    health: "55/60",
    productivity: "35/85",
    attack: 35,
    defense: 95,
    forage: 25,
  };

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

      <Grid
        container
        columnSpacing={2}
        rowSpacing={0}
        sx={{ margin: "0 auto" }}
      >
        {/* First Column */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            maxWidth: "550px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NFTCard
            isMinted={isMinted}
            // you could also consume e.g. isTransactionSuccess from the context if needed
            flipped={false}
            frontImage="/Mint/NFT-Cards.png"
            backImage="/NFTs/Buzzkill-Hatchlings.png"
            nftData={nftData}
            mintedNFTs={[]} // or any relevant data
            quantityMinted={1}
            transactionHash={transactionHash}
          />
        </Grid>

        {/* Second Column */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MintInfoCard />
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage ? (
            <>Transaction failed: {errorMessage}</>
          ) : (
            <>
              Successfully Minted! Check Transaction Here:{" "}
              <Link
                href={`https://testnet.vicscan.xyz/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                View Transaction
              </Link>
            </>
          )}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

const MintPage: React.FC = () => {
  return (
    <MintProvider>
      <MintPageContent />
    </MintProvider>
  );
};

export default MintPage;
