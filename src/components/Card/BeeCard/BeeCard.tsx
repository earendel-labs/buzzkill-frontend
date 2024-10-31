// BeeCard.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Hatchling } from "@/types/Hatchling";
import HatchlingStatus from "./HatchlingStatus";
import PlayOverlay from "@/components/Card/BeeCard/PlayOverlay";
import HatchlingImage from "./HatchlingImage";

// Define and export the props for BeeCard
export interface BeeCardProps {
  bee: Hatchling;
  onPlayClick: (beeId: number) => void | Promise<void>;
}

// Styled component for hover effect and layout
const StyledBeeCard = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "4px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover .overlay, &:hover .playButtonWrapper": {
    opacity: 1,
    visibility: "visible",
  },
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.8)",
  },
}));

const BeeCard: React.FC<BeeCardProps> = ({ bee, onPlayClick }) => (
  <StyledBeeCard>
    <Typography
      variant="body2"
      color="white"
      sx={{
        position: "absolute",
        top: "8px",
        left: "8px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "4px 8px",
        borderRadius: "4px",
      }}
    >
      Hatchling ID: {bee.id}
    </Typography>
    <HatchlingImage
      imageAddress={bee.imageAddress}
      alt={`Hatchling ${bee.id}`}
    />
    {bee.status === "Free" && (
      <PlayOverlay onPlayClick={() => onPlayClick(bee.id)} />
    )}

    {/* Pass environmentID to HatchlingStatus */}
    <HatchlingStatus status={bee.status} environment={bee.environmentID} />

    {/* Conditionally render Environment and Hive chips */}
    {bee.environmentID && (
      <Typography
        variant="caption"
        color="white"
        sx={{
          position: "absolute",
          bottom: "8px",
          left: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        Env: {bee.environmentID}
      </Typography>
    )}
    {bee.hiveID && (
      <Typography
        variant="caption"
        color="white"
        sx={{
          position: "absolute",
          bottom: "8px",
          left: "80px", // Adjust positioning to avoid overlap
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        Hive: {bee.hiveID}
      </Typography>
    )}
  </StyledBeeCard>
);

export default BeeCard;
