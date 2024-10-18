import React from "react";
import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

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

const StyledCard = styled(Box)<{ isMinted: boolean }>(({ isMinted }) => ({
  width: "100%",
  height: "100%",
  perspective: "1000px",
  backgroundColor: "transparent",
  transition: "all 0.5s ease-in-out",
  borderRadius: "16px",
  position: "relative",
  "&:hover": {
    animation: `${breathe} 2s infinite ease-in-out`,
  },
}));

const CardInner = styled(Box)<{ flipped: boolean }>(({ flipped }) => ({
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

const CardFront = styled(CardFace)<{ isMinted: boolean }>(({ isMinted }) => ({
  ...(isMinted ? glassEffect : {}),
  transition: "all 0.5s ease-in-out",
}));

const CardBack = styled(CardFace)({
  width: "100%",
  height: "100%",
  transform: "rotateY(180deg)",
  ...glassEffect,
  backgroundColor: "rgba(0,0, 0, 0.5)",
  color: "white",
});

const NFTImage = styled("img")({
  maxWidth: "90%",
  maxHeight: "90%",
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
  mintedNFTs: number[];
}

export default function NFTCard({
  flipped,
  isMinted,
  frontImage,
  backImage,
  nftData,
  mintedNFTs,
}: NFTCardProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <StyledCard isMinted={isMinted}>
        <CardInner flipped={flipped}>
          <CardFront isMinted={isMinted}>
            <NFTImage src="/Mint/NFT-Cards.png" alt="Queen Bee" />
          </CardFront>
          <CardBack>
            <NFTImage src={backImage} alt="Minted NFT" />
            <Box sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                Minted NFT{mintedNFTs.length > 1 ? "s" : ""}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Congratulations! You've minted {mintedNFTs.length} new Buzzkill
                Hatchling{mintedNFTs.length > 1 ? "s" : ""}!
              </Typography>
              <Typography variant="body2">
                NFT ID{mintedNFTs.length > 1 ? "s" : ""}:{" "}
                {mintedNFTs.join(", ")}
              </Typography>
            </Box>
          </CardBack>
        </CardInner>
      </StyledCard>
    </Box>
  );
}
