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

const MintPage: React.FC = () => {
  const { address, isConnected } = useAccount(); // Get account info from RainbowKit and wagmi
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 3;

  // Fetch native token balance (VIC as native gas token)
  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  // Format balance using ethers utility
  const formattedBalance = balanceData ? formatEther(balanceData.value) : "0";

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleMint = async () => {
    // Placeholder logic for minting
    console.log("Minting...");
    setMintedNFT("/NFTs/WorkerBee.png"); // Replace with actual NFT image URL
    setIsMinting(false);
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
                  Total Available
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
                  {mintedCount}/{totalSupply}
                </Typography>
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

              {/* Connect Wallet Button or Mint Button */}
              {!isConnected ? (
                <Box sx={{ mt: 2, mb: 4 }}>
                  {/* Display RainbowKit Connect Button when wallet isn't connected */}
                  <LoginButton loginButtonText="Connect Your Wallet" />
                </Box>
              ) : isMinting ? (
                <CircularProgress color="inherit" sx={{ mb: 4 }} />
              ) : (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <PrimaryButton text="Mint" onClick={handleMint} scale={1.4} />
                </Box>
              )}
            </SemiTransaprentCard>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MintPage;
