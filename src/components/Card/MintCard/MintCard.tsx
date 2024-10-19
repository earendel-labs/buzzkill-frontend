import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useRouter } from "next/navigation"; // For navigation with Next.js
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";

// Keyframe for animation
const breathe = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.9);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  }
`;

// Styled components with shouldForwardProp
const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMinted" && prop !== "flipped",
})<{ isMinted: boolean }>(({ isMinted }) => ({
  width: "100%",
  height: "100%",
  perspective: "1000px",
  backgroundColor: "transparent",
  transition: "all 0.5s ease-in-out",
  borderRadius: "16px",
  position: "relative",
  // Apply hover effect only if the card is minted and not flipped
  "&:hover": {
    animation: isMinted ? `${breathe} 2s infinite ease-in-out` : "none",
  },
}));

const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "flipped",
})<{ flipped: boolean }>(({ flipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transition: "transform 0.8s",
  transformStyle: "preserve-3d",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
}));

const CardFace = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "16px",
});

const glassEffect = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

const CardFront = styled(CardFace, {
  shouldForwardProp: (prop) => prop !== "isMinted",
})<{ isMinted: boolean }>(({ isMinted }) => ({
  ...(isMinted ? glassEffect : {}),
  transition: "all 0.5s ease-in-out",
}));

const CardBack = styled(CardFace)({
  width: "100%",
  height: "100%",
  transform: "rotateY(180deg)",
  ...glassEffect,
  backgroundColor: "rgba(0,0, 0, 0.5)", //
  boxShadow: ` 0px 4px 15px rgba(255, 255, 255, 0.4),  /* White glow */
  `,

  color: "white",
});

const NFTImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
});

interface NFTCardProps {
  flipped: boolean;
  isMinted: boolean;
  frontImage: string;
  backImage: string;
  nftData: {
    id: string;
    energy: string;
    health: string;
    productivity: string;
    attack: number;
    defense: number;
    forage: number;
  };
  quantityMinted: number;
  transactionHash: `0x${string}` | undefined;
  mintedNFTs: number[];
}

// Updated NFTCard component to preserve state
export default function NFTCard({
  flipped,
  isMinted: parentIsMinted,
  frontImage,
  backImage,
  nftData,
  mintedNFTs,
  quantityMinted,
  transactionHash: parentTransactionHash,
}: NFTCardProps) {
  const router = useRouter(); // For navigation

  // Internal state to manage isMinted and transactionHash
  const [localIsMinted, setLocalIsMinted] = useState(parentIsMinted);
  const [localTransactionHash, setLocalTransactionHash] = useState<
    `0x${string}` | undefined
  >(parentTransactionHash);

  // Whenever the parent state changes, update the local state unless reset manually
  useEffect(() => {
    if (parentIsMinted && parentTransactionHash) {
      setLocalIsMinted(true); // Preserve the minted state
      setLocalTransactionHash(parentTransactionHash);
    }
  }, [parentIsMinted, parentTransactionHash]);

  const handleButtonClick = () => {
    router.push("/Play"); // Navigate to /Play on button click
  };

  return (
    <Box
      sx={{
        width: {
          sm: "100%",
          xxl: "80%",
        },
        height: {
          sm: "65%",
          xl: "70%",
          xxl: "80%",
        },
        position: "relative",
        transformStyle: "preserve-3d",
        perspective: "200px",
      }}
    >
      <StyledCard isMinted={localIsMinted}>
        <CardInner flipped={flipped}>
          <CardFront isMinted={localIsMinted}>
            <NFTImage src={frontImage} alt="NFT Front Image" />
          </CardFront>
          <CardBack>
            <Grid container spacing={0}>
              {/* Left Column - Image */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <NFTImage
                  src={backImage}
                  alt="Minted NFT"
                  sx={{
                    maxWidth: "80%",
                    maxHeight: "90%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </Grid>

              {/* Right Column - Text and Button */}
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box sx={{ padding: "2px, 0px" }}>
                  <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                    Minted NFT{quantityMinted > 1 ? "s" : ""}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      textAlign: "justify",
                      maxWidth: "300px",
                      fontSize: {
                        xs: "0.9rem",
                        sm: "1rem",
                        xxl: "1.2rem",
                      },
                    }}
                  >
                    You minted {quantityMinted} new Buzzkill Hatchling
                    {quantityMinted > 1 ? "s" : ""}!<br />
                    <br />
                    It's time to begin their incubation and unleash your hive's
                    full potential.
                  </Typography>
                  {/* Buttons Row */}
                  <Box
                    sx={{
                      mt: 3,
                      gap: 2,
                      display: "flex",
                      justifyContent: "space-between", // Ensures buttons are spaced evenly
                    }}
                  >
                    <PrimaryButton
                      text="Awaken"
                      onClick={() => router.push("/Play")}
                      scale={1.4}
                    />

                    <PrimaryButton
                      text="My Bees"
                      onClick={() =>
                        router.push("/Play/User/MyProfile/#MyBees")
                      }
                      scale={1.4}
                    />
                  </Box>
                  {/* Transaction Hash Link */}
                  {localTransactionHash && (
                    <Typography
                      variant="body2"
                      sx={{ mt: 2, fontWeight: "bold" }}
                    >
                      View your transaction{" "}
                      <a
                        href={`https://testnet.vicscan.xyz/tx/${localTransactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#FFD700",
                          textDecoration: "underline",
                        }}
                      >
                        here
                      </a>
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardBack>
        </CardInner>
      </StyledCard>
    </Box>
  );
}
