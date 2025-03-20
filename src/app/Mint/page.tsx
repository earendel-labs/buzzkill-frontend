"use client";
import React from "react";
import { Grid, Box, Snackbar, Alert, Link } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import NFTCard from "@/app/Mint/Components/MintCard/MintCard";
import { MintProvider, useMintContext } from "@/context/MintContext";
import MintInfoCard from "./Components/MintInfoCard/MintInfoCard";
import TransactionInProgressModal from "@/components/Modals/TransactionProgressModal/TransactionInProgressModal";

const MintPageContent: React.FC = () => {
  const {
    transactionHash,
    snackbarOpen,
    quantity,
    setSnackbarOpen,
    errorMessage,
    isMinted,
    isTransactionLoading,
  } = useMintContext();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Dummy data for NFTCard
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

      <Grid
        container
        columnSpacing={2}
        rowSpacing={0}
        sx={{ margin: "0 auto" }}
      >
        {/* NFTCard Column */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            order: { xs: 2, md: 1 },
            display: "flex",
            maxWidth: "550px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NFTCard
            isMinted={isMinted}
            flipped={isMinted}
            frontImage="/Mint/NFT-Cards.png"
            backImage="/NFTs/Hatchlings.JPEG"
            nftData={nftData}
            mintedNFTs={[]} // any relevant data
            quantityMinted={quantity}
            transactionHash={transactionHash}
          />
        </Grid>

        {/* MintInfoCard Column */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            order: { xs: 1, md: 2 },
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
            <>Transaction failed: {errorMessage} Try minting again</>
          ) : (
            <>
              Successfully Minted! Check Transaction Here:{" "}
              <Link
                href={`https://vicscan.xyz/tx/${transactionHash}`}
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

      {/* Transaction In Progress Modal */}
      <TransactionInProgressModal
        open={isTransactionLoading}
        onClose={() => {}}
        title="Processing Mint Transaction..."
      />
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
