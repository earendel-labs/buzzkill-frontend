"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
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
import SemiTransaprentCard from "@/components/Card/SemiTransaprentCard";
import { formatEther } from "ethers"; // Use formatEther for native token balances
import { LoginButton } from "@/components/Buttons/LoginButton/Login";

import {
  useReadBuzzkillHatchlingsNftTotalMinted,
  useReadBuzzkillHatchlingsNftMaxSupply,
  useWriteBuzzkillHatchlingsNftPublicMint,
} from "@/hooks/BuzzkillHatchlingsNFT";

// Placeholder data for total collection and minted count
const MintPage: React.FC = () => {
  const { address, isConnected } = useAccount(); // Get account info from RainbowKit and wagmi
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 3;

  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const [mintedCount, setMintedCount] = useState<string>("0");
  const [totalSupply, setTotalSupply] = useState<string>("0");

  const [formattedBalance, setFormattedBalance] = useState<string>("0");

  const theme = useTheme(); // Access MUI theme
  // Fetch native token balance (VIC as native gas token)
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  // Fetch the total minted and max supply values from contract
  const {
    data: mintedData,
    isLoading: isMintedCountLoading,
    isError: isMintedCountError,
    refetch: refetchMintedCount,
    error: mintedCountError,
  } = useReadBuzzkillHatchlingsNftTotalMinted();

  const {
    data: totalSupplyData,
    isLoading: isTotalSupplyLoading,
    isError: isTotalSupplyError,
    error: totalSupplyError,
  } = useReadBuzzkillHatchlingsNftMaxSupply();
  // Utilize the generated properties from the hook
  const {
    writeContractAsync: mintBatch,
    isPending,
    isSuccess,
    isError,
  } = useWriteBuzzkillHatchlingsNftPublicMint();

  // Update mintedCount when mintedData changes
  useEffect(() => {
    if (mintedData !== undefined) {
      setMintedCount(Intl.NumberFormat().format(Number(mintedData)));
      console.log("Updating mintedCount:", mintedData);
    }
  }, [mintedData]);

  // Update mintedCount and totalSupply when data is fetched
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

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Mint function with error handling
  const handleMint = async () => {
    setErrorMessage(null); // Reset error message
    setIsMintLoading(true); // Set loading state
    setIsMinted(false); // Reset mint success state
    if (mintBatch && address) {
      try {
        const { data: latestMintedData } = await refetchMintedCount();
        console.log("mintedData check before mint:", mintedData);
        // Perform the check with the freshly fetched data
        if (latestMintedData !== undefined && totalSupplyData !== undefined) {
          if (latestMintedData + BigInt(quantity) > totalSupplyData) {
            setErrorMessage("Requested quantity exceeds available supply.");
            setSnackbarOpen(true);
            return;
          }
        } else {
          setErrorMessage("Unable to fetch supply data. Please try again.");
          setSnackbarOpen(true);
          return;
        }
        const txResponse = await mintBatch({
          args: [BigInt(quantity)],
        });
        const { data: updatedMintedData } = await refetchMintedCount();
        console.log("mintedData", mintedData);
        console.log("updatedMintedData", updatedMintedData);
        console.log("message output");
        setTransactionHash(txResponse);
        setErrorMessage(null);
      } catch (error) {
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

        setErrorMessage(userFriendlyMessage);
        setTransactionHash(undefined);
        setSnackbarOpen(true);
      }
    } else {
      console.error("No address found or minting function not available");
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
    if (isTransactionSuccess) {
      setIsMinted(true); // Minting success
      setSnackbarOpen(true);
      refetchMintedCount(); // Refetch minted data after success
      setIsMintLoading(false); // Reset loading state
    }
    if (transactionError) {
      setErrorMessage("Transaction error: " + transactionError.message); // Set transaction error message
      setIsMintLoading(false); // Reset loading state
    }
  }, [isTransactionSuccess, transactionError, refetchMintedCount]);

  // Close Snackbar function
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setTransactionHash(undefined); // Reset txHash when snackbar closes
    setErrorMessage(null); // Reset error message when snackbar closes
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
      </Box>
      {/* Grid Layout with two columns */}
      <Grid container spacing={4} sx={{ margin: "0 auto" }}>
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
          <Box
            component="img"
            src="/Mint/NFT-Cards.png"
            sx={{
              maxWidth: "100%",
              height: "auto",
            }}
            alt="NFT Cards"
          />
        </Grid>

        {/* Second column - SemiTransparentCard with maxWidth set to 600px */}
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
              maxWidth: "800px", // Set maxWidth to 600px
              padding: {
                xs: "1rem", // Small screen size
                md: "2rem", // Medium screen size
                lg: "1rem", // Larger screens
                xxl: "1.7rem",
              },
              width: "100%", // Ensure it takes full width until maxWidth
            }}
          >
            <SemiTransaprentCard>
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
                      Select Quantity. Max {maxQuantity}
                    </Typography>

                    {/* Quantity Control Buttons */}
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
                        onClick={decrementQuantity} // Adjust to use decrement function
                        disabled={quantity === 1} // Disable when quantity is 1
                        disableRipple
                        disableElevation
                        variant="text"
                        sx={{
                          fontSize: "1.5rem",
                          color: quantity === 1 ? "#b8ab67" : "#FFD700", // Gray out the color when disabled
                          opacity: 1, // Keep the opacity constant
                          cursor: quantity === 1 ? "not-allowed" : "pointer", // Disable cursor when at min
                          minWidth: "20px", // Consistent button size
                          height: "30px", // Consistent button size
                          padding: 0,
                          backgroundColor: "transparent", // No background color
                          border: "none", // No border
                          marginRight: 0,
                          "&:disabled": {
                            color: "#b8ab67", // Gray out when disabled
                            opacity: 0.6, // Slightly reduce opacity when disabled
                          },
                        }}
                      >
                        -
                      </Button>

                      {/* Display Quantity */}
                      <Typography
                        sx={{
                          color: "#FFD700",
                          fontSize: "1.5rem",
                          width: "30px",
                          textAlign: "center",
                          lineHeight: "30px", // Ensure text is vertically centered
                        }}
                      >
                        {quantity}
                      </Typography>

                      {/* Increment Button */}
                      <Button
                        onClick={incrementQuantity} // Adjust to use increment function
                        disabled={quantity === maxQuantity} // Disable when at max quantity
                        disableRipple
                        disableElevation
                        variant="text"
                        sx={{
                          fontSize: "1.5rem",
                          color:
                            quantity === maxQuantity ? "#b8ab67" : "#FFD700", // Gray out the color when disabled
                          opacity: 1, // Keep the opacity constant
                          cursor:
                            quantity === maxQuantity
                              ? "not-allowed"
                              : "pointer", // Disable cursor when at max
                          minWidth: "20px", // Consistent button size
                          height: "30px", // Consistent button size
                          padding: 0,
                          backgroundColor: "transparent", // No background color
                          border: "none", // No border
                          marginRight: 0,
                          "&:disabled": {
                            color: "#b8ab67", // Gray out when disabled
                            opacity: 0.6, // Slightly reduce opacity when disabled
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
                  mt: 2,
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Display success message if minted successfully */}
                {isMinted && (
                  <Typography
                    variant="body1"
                    sx={{ mb: 4, color: theme.palette.LightBlue.main }}
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
                    sx={{ mb: 4, color: theme.palette.LightBlue.main }}
                  >
                    {isMintLoading
                      ? "Minting..."
                      : isTransactionLoading
                      ? "Minting..."
                      : "Mint Tokens"}
                  </Typography>
                ) : !isConnected ? (
                  /* Display Connect Wallet Button if not connected */
                  <Box sx={{ mt: 2, mb: 4 }}>
                    <LoginButton loginButtonText="Connect Your Wallet" />
                  </Box>
                ) : (
                  /* Display Mint Button if connected and ready to mint */
                  <PrimaryButton text="Mint" onClick={handleMint} scale={1.4} />
                )}
              </Box>
            </SemiTransaprentCard>
          </Box>
        </Grid>
      </Grid>
      {/* Snackbar for successful minting */}

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
