"use client";
import React, { useState } from "react";
import { Box, Typography, CircularProgress, Grid, Button } from "@mui/material";
import Layout from "@/components/Layouts/Layout/Layout";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead } from "wagmi";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import SemiTransaprentCard from "@/components/Card/SemiTransaprentCard";
import { ethers } from "ethers";

// ERC20 ABI for reading the token balance
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

// VIC token contract address (replace with actual token address)
const VIC_TOKEN_ADDRESS = "0xYourVicTokenAddressHere"; // Replace with actual VIC token contract address

// Placeholder data for total collection and minted count
const totalSupply = 10000;
const mintedCount = 3521;

const MintPage: React.FC = () => {
  const { address, isConnected } = useAccount(); // Get account info from RainbowKit and wagmi
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState<string | null>(null);

  // Fetch the user's VIC balance
  const { data: balance, isLoading: isBalanceLoading } = useContractRead({
    address: VIC_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
    enabled: isConnected, // Fetch balance only when connected
  });

  // Fetch the decimals of the token
  const { data: decimals } = useContractRead({
    address: VIC_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
    enabled: isConnected, // Fetch decimals only when connected
  });

  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 3;

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
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

  // Convert balance from wei to VIC token units using the decimals
  const formattedBalance =
    balance && decimals ? ethers.utils.formatUnits(balance, decimals) : "0"; // Default to "0" if balance is not available

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
            maxWidth: "600px",
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
              maxWidth: "600px", // Set maxWidth to 600px
              width: "100%", // Ensure it takes full width until maxWidth
              marginBottom: {
                xs: 0, // Remove any bottom margin for smaller screens
                sm: 0,
              },
            }}
          >
            <SemiTransaprentCard>
              {/* Responsive Heading */}
              <Typography
                variant="h1"
                sx={{
                  mb: 2,
                  textAlign: "center",
                  fontSize: {
                    xs: "1.5rem", // Small screen size
                    md: "2rem", // Medium screen size
                    lg: "2.5rem", // Larger screens
                    xxl: "3.5rem",
                  },
                }}
              >
                Mint Buzzkill <br /> Hatchlings
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
                      lg: "1rem",
                      xl: "1.5rem",
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
                      xs: "0.875rem",
                      sm: "0.975rem",
                      md: "1rem",
                      lg: "1.5rem",
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
                  marginTop: "0.5rem",
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
                      lg: "1rem",
                      xl: "1.5rem",
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
                      xs: "0.875rem",
                      sm: "0.975rem",
                      md: "1rem",
                      lg: "1.5rem",
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
                      marginTop: "1rem",
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
                          lg: "1rem",
                          xl: "1.5rem",
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
                          xs: "0.875rem",
                          sm: "0.975rem",
                          md: "1rem",
                          lg: "1.5rem",
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
                      marginTop: "1rem",
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
                          lg: "1rem",
                          xl: "1.5rem",
                        },
                        lineHeight: "1.5rem", // Ensures consistent vertical height
                      }}
                    >
                      Select Quantity. Max {maxQuantity}
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
                        disabled={quantity === 1} // Disable at minimum quantity
                        disableRipple
                        disableElevation
                        variant="text"
                        sx={{
                          fontSize: "1.5rem",
                          color: quantity === 1 ? "#A9A9A9" : "#FFD700", // Gray out the color when disabled
                          opacity: quantity === 1 ? 0.5 : 1, // Slightly reduce opacity when disabled
                          cursor: quantity === 1 ? "not-allowed" : "pointer",
                          minWidth: "40px", // Consistent button size
                          height: "30px", // Consistent button size
                          padding: 0,
                          backgroundColor: "transparent", // No background color
                          border: "none", // No border or outline
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
                        onClick={incrementQuantity}
                        disabled={quantity === maxQuantity} // Disable at maximum quantity
                        disableRipple
                        disableElevation
                        variant="text"
                        sx={{
                          fontSize: "1.5rem",
                          color:
                            quantity === maxQuantity ? "#A9A9A9" : "#FFD700", // Gray out the color when disabled
                          opacity: quantity === maxQuantity ? 0.8 : 1, // Slightly reduce opacity when disabled
                          cursor:
                            quantity === maxQuantity
                              ? "not-allowed"
                              : "pointer",
                          minWidth: "20px", // Consistent button size
                          height: "30px", // Consistent button size
                          padding: 0,
                          backgroundColor: "transparent", // No background color
                          border: "none", // No border or outline
                          marginRight: 0, // Ensure button is right-aligned without padding
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
                  <ConnectButton showBalance={false} />
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
