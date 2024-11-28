"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Snackbar,
  Alert,
  Link,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Layout from "@/components/Layouts/Layout/Layout";

import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import NFTCard from "@/components/Card/MintCard/MintCard";
import {
  useReadBuzzkillHatchlingsNftTotalSupply,
  useReadBuzzkillHatchlingsNftCurrentBatchSize,
  useWriteBuzzkillHatchlingsNftMint,
} from "@/hooks/BuzzkillHatchlingsNFT";

import { useUserContext } from "@/context/UserContext"; // Import UserContext

// Adjust the import based on your ethers version
import { formatEther } from "ethers"; // For ethers v6

import { LoginButton } from "@/components/Buttons/LoginButton/Login";

const MintPage: React.FC = () => {
  const { address, isConnected } = useAccount(); // Get account info from RainbowKit and wagmi
  const { bees, stakedBees, refreshBeesData } = useUserContext(); // Access from context
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentMinted = bees.length + stakedBees.length;
  const maxPerAddress = 2;
  const remainingMint = maxPerAddress - currentMinted;

  const initialMaxQuantity = remainingMint > 0 ? remainingMint : 0;
  const [quantity, setQuantity] = useState(remainingMint > 0 ? 1 : 0);
  const [maxQuantity, setMaxQuantity] = useState(initialMaxQuantity);

  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const [mintedCount, setMintedCount] = useState<string>("0");
  const [totalSupply, setTotalSupply] = useState<string>("0");

  const [formattedBalance, setFormattedBalance] = useState<string>("0");

  const theme = useTheme(); // Access MUI theme

  const [flipped, setFlipped] = useState(false);

  // Fetch native token balance (VIC as native gas token)
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });
  const [mintedNFTs, setMintedNFTs] = useState<number[]>([]);

  // Fetch the total minted and max supply values from contract
  const {
    data: mintedData,
    isLoading: isMintedCountLoading,
    isError: isMintedCountError,
    refetch: refetchMintedCount,
    error: mintedCountError,
  } = useReadBuzzkillHatchlingsNftTotalSupply();

  const {
    data: totalSupplyData,
    isLoading: isTotalSupplyLoading,
    isError: isTotalSupplyError,
    error: totalSupplyError,
  } = useReadBuzzkillHatchlingsNftCurrentBatchSize();

  // Utilize the generated properties from the hook
  const {
    writeContractAsync: mintBatch,
    isPending,
    isSuccess,
    isError,
  } = useWriteBuzzkillHatchlingsNftMint();

  // Update mintedCount when mintedData changes
  useEffect(() => {
    if (mintedData !== undefined) {
      setMintedCount(Intl.NumberFormat().format(Number(mintedData)));
      console.log("Updating mintedCount:", mintedData);
    }
  }, [mintedData]);

  // Update totalSupply when data is fetched
  useEffect(() => {
    if (totalSupplyData) {
      const formattedTotalSupply = new Intl.NumberFormat().format(
        Number(totalSupplyData)
      );
      console.log("Updating totalSupply:", formattedTotalSupply);
      setTotalSupply(formattedTotalSupply);
    }
  }, [totalSupplyData]);

  // Update formatted balance in useEffect when balanceData changes
  useEffect(() => {
    if (balanceData) {
      const balance = parseFloat(formatEther(balanceData.value)).toFixed(4);
      setFormattedBalance(balance);
      console.log("Balance updated:", balance);
    }
  }, [balanceData]);

  // Update maxQuantity and quantity based on remainingMint
  useEffect(() => {
    setMaxQuantity(remainingMint > 0 ? remainingMint : 0);
    if (remainingMint > 0 && quantity > remainingMint) {
      setQuantity(remainingMint);
    } else if (remainingMint <= 0) {
      setQuantity(0);
    } else if (quantity === 0 && remainingMint > 0) {
      setQuantity(1);
    }
  }, [remainingMint]);

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Mint function with error handling
  const handleMint = async () => {
    if (quantity > remainingMint) {
      setErrorMessage("You cannot mint more than the allowed limit.");
      setSnackbarOpen(true);
      return;
    }

    setIsMinted(false); // Reset minting success
    setFlipped(false);
    setErrorMessage(null); // Reset error message
    setIsMintLoading(true); // Set loading state

    if (mintBatch && address) {
      try {
        const { data: latestMintedData } = await refetchMintedCount();
        console.log("mintedData check before mint:", mintedData);
        // Perform the check with the freshly fetched data
        if (latestMintedData !== undefined && totalSupplyData !== undefined) {
          if (latestMintedData + BigInt(quantity) > totalSupplyData) {
            setErrorMessage("Requested quantity exceeds available supply.");
            setSnackbarOpen(true);
            setIsMintLoading(false);
            return;
          }
        } else {
          setErrorMessage("Unable to fetch supply data. Please try again.");
          setSnackbarOpen(true);
          setIsMintLoading(false);
          return;
        }
        const txResponse = await mintBatch({
          args: [BigInt(quantity)],
        });
        setTransactionHash(txResponse);
        setErrorMessage(null);
      } catch (error: any) {
        let userFriendlyMessage = "An unknown error occurred during minting";

        if (error instanceof Error) {
          if (error.message.includes("User denied transaction")) {
            userFriendlyMessage = "Transaction rejected by user.";
          } else if (error.message.includes("insufficient funds")) {
            userFriendlyMessage = "Insufficient funds for transaction.";
          } else if (error.message.includes("gas estimation failed")) {
            userFriendlyMessage = "Transaction failed due to gas estimation.";
          } else if (error.message.includes("network")) {
            userFriendlyMessage = "Network error. Please try again.";
          } else if (error.message.includes("invalid parameters")) {
            userFriendlyMessage =
              "Transaction failed due to invalid parameters.";
          } else if (error.message.includes("revert")) {
            userFriendlyMessage = "Transaction reverted by the contract.";
          } else {
            userFriendlyMessage = error.message; // Fall back to the original error message
          }
        }
        setIsMintLoading(false); // Set loading state

        setErrorMessage(userFriendlyMessage);
        setTransactionHash(undefined);
        setSnackbarOpen(true);
      }
    } else {
      console.error("No address found or minting function not available");
      setErrorMessage("Wallet not connected or minting unavailable.");
      setSnackbarOpen(true);
      setIsMintLoading(false);
    }
  };

  // Use `useWaitForTransactionReceipt` to track the transaction
  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  // Effect to handle transaction state change
  useEffect(() => {
    const handleTransaction = async () => {
      if (isTransactionSuccess) {
        setIsMinted(true); // Minting success
        setSnackbarOpen(true);
        setFlipped(true);
        await refetchMintedCount(); // Refetch minted data after success
        await refreshBeesData(); // Refresh UserContext data
        setIsMintLoading(false); // Reset loading state
      }
      if (transactionError) {
        setErrorMessage("Transaction error: " + transactionError.message); // Set transaction error message
        setIsMintLoading(false); // Reset loading state
      }
    };
    handleTransaction();
  }, [
    isTransactionSuccess,
    transactionError,
    refetchMintedCount,
    refreshBeesData,
  ]);

  // Close Snackbar function
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setTransactionHash(undefined); // Reset txHash when snackbar closes
    setErrorMessage(null); // Reset error message when snackbar closes
  };

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
        {/* Background Image */}
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

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity and color here
          }}
        />
      </Box>
      {/* Grid Layout with two columns */}
      <Grid
        container
        columnSpacing={2}
        rowSpacing={0}
        sx={{ margin: "0 auto" }}
      >
        {/* First column - Centered NFT Cards Image */}
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
            isMinted={isTransactionSuccess}
            flipped={flipped}
            frontImage="/Mint/NFT-Cards.png"
            backImage="/NFTs/Buzzkill-Hatchlings.png"
            nftData={nftData}
            mintedNFTs={mintedNFTs}
            quantityMinted={quantity}
            transactionHash={transactionHash}
          />
        </Grid>

        {/* Second column - SemiTransparentCard with maxWidth set to 800px */}
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
          <Box
            sx={{
              maxWidth: "800px", // Set maxWidth to 800px
              padding: {
                xs: "1rem", // Small screen size
                md: "2rem", // Medium screen size
                lg: "1rem", // Larger screens
                xxl: "1.7rem",
              },
              width: "100%", // Ensure it takes full width until maxWidth
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",

                backdropFilter: "blur(2px)",
                borderRadius: "3px",
                boxSizing: "border-box",
              }}
            >
              {/* Responsive Heading */}
              <Typography
                variant="h1"
                sx={{
                  mt: 2,
                  mb: 2,
                  textAlign: "center",
                  fontSize: {
                    xs: "1rem", // Small screen size
                    md: "2rem", // Medium screen size
                    lg: "2.5rem", // Larger screens
                    xxl: "3.5rem",
                  },
                  maxWidth: {
                    xs: "90%", // Full width on smaller screens
                    xxl: "500px", // Limit width on xxl screens
                  },
                }}
              >
                Mint Buzzkill Hatchlings
              </Typography>

              {/* Responsive, Justified Paragraph */}
              <Typography
                sx={{
                  mb: 3,
                  textAlign: "justify",
                  maxWidth: "480px", // Set maxWidth for the paragraph
                  fontSize: {
                    xs: "0.9rem", // Smaller font for smaller screens
                    sm: "1rem", // Default font size for small-medium screens
                    xxl: "1.2rem", // Default font size for small-medium screens
                  },
                }}
              >
                Awaken a Buzzkill Hatchling from its two-million-year slumber!
                Mint now to embark on an epic journey to rejuvenate your hive in
                the thawing world of Nectera.
              </Typography>

              {/* Display Minted Count in the same line with spacing */}
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
                {/* Display either the loading spinner, error message, or minted count */}
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
                    Error loading data:{" "}
                    {mintedCountError?.message || totalSupplyError?.message}
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

              {/* Mint Price */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  maxWidth: "480px",
                  width: "100%",
                  flexDirection: {
                    xs: "column",
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
                  Total Price
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
                  FREE
                </Typography>
              </Box>

              {/* Balance and Quantity Selection */}
              {isConnected && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "480px",
                      width: "100%",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                      alignItems: { xs: "center", sm: "unset" },
                    }}
                  >
                    {/* Your Balance */}
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
                      {isBalanceLoading
                        ? "Loading..."
                        : `${formattedBalance} VIC`}
                    </Typography>
                  </Box>

                  {/* Select Quantity */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "480px",
                      width: "100%",
                      alignItems: "center", // Ensures vertical alignment
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
                        lineHeight: "1.5rem", // Ensures consistent vertical height
                      }}
                    >
                      Select Quantity. Max{" "}
                      {remainingMint > 0 ? remainingMint : 0}
                    </Typography>

                    {/* Quantity Control Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end", // Pushes content to the right
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
                            quantity === 1 || remainingMint <= 0
                              ? "#b8ab67"
                              : "#FFD700", // Gray out the color when disabled
                          opacity: 1, // Keep the opacity constant
                          cursor:
                            quantity === 1 || remainingMint <= 0
                              ? "not-allowed"
                              : "pointer", // Disable cursor when at min
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
                          quantity === maxQuantity || remainingMint <= 0
                        }
                        disableRipple
                        disableElevation
                        variant="text"
                        sx={{
                          fontSize: "1.5rem",
                          color:
                            quantity === maxQuantity || remainingMint <= 0
                              ? "#b8ab67"
                              : "#FFD700",
                          opacity: 1,
                          cursor:
                            quantity === maxQuantity || remainingMint <= 0
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
              )}
              {/* Minting State Messages and Actions */}
              <Box
                sx={{
                  mt: 0,
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Inform user if they've reached the mint limit */}
                {remainingMint <= 0 && isConnected && (
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ mb: 2, color: theme.palette.Orange.light }}
                  >
                    You have reached the maximum minting limit of{" "}
                    {maxPerAddress} NFTs.
                  </Typography>
                )}

                {/* Display success message if minted successfully */}
                {isMinted && (
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ mb: 2, color: theme.palette.LightBlue.main }}
                  >
                    Minting successful!
                  </Typography>
                )}

                {/* Display error message if there is an error */}
                {errorMessage && !isMinted && (
                  <Typography sx={{ mb: 4, color: theme.palette.Orange.light }}>
                    {errorMessage}
                  </Typography>
                )}

                {/* Display loading message during mint or transaction processing */}
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
                      : "Mint Tokens"}
                  </Typography>
                ) : !isConnected ? (
                  /* Display Connect Wallet Button if not connected */
                  <Box sx={{ mt: 2, mb: 4 }}>
                    <LoginButton loginButtonText="Connect Your Wallet" />
                  </Box>
                ) : (
                  /* Display Mint Button if connected and ready to mint */
                  <PrimaryButton
                    text="Mint"
                    onClick={handleMint}
                    scale={1.4}
                    disabled={remainingMint <= 0 || isMintLoading}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* Snackbar for successful minting or errors */}

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

export default MintPage;
