import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { BeeInfo } from "@/types/BeeInfo";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

// Define a type for card sizes
type CardSize = "small" | "medium" | "large" | "extraLarge";

// Define pixel sizes for each card size
const cardSizeDimensions: Record<CardSize, { width: string; height: string }> =
  {
    small: { width: "120px", height: "auto" },
    medium: { width: "150px", height: "auto" },
    large: { width: "200px", height: "auto" },
    extraLarge: { width: "250px", height: "auto" },
  };

interface BeeCardProps {
  beeInfo: BeeInfo;
  isSelected: boolean;
  onSelect: () => void;
  cardSize?: CardSize; // Use the CardSize type for the prop
}

const BeeCard: React.FC<BeeCardProps> = ({
  beeInfo,
  isSelected,
  onSelect,
  cardSize = "medium", // Default to "medium" size if not provided
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  const handleMouseDown = () => {
    setIsPressed(true);
    onSelect(); // Select this bee
  };
  const handleMouseUp = () => setIsPressed(false);

  // Get dimensions based on cardSize prop
  const { width, height } = cardSizeDimensions[cardSize];

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        position: "relative",
        width, // Apply dynamic width
        height, // Apply dynamic height
        cursor: "pointer",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        transform: isPressed
          ? "scale(0.99)"
          : isHovered
          ? "scale(1.01)"
          : "scale(1)",
        boxShadow:
          isHovered || isSelected ? "0px 2px 7px rgba(0,0,0,0.4)" : "none",
        overflow: "hidden",
        border: isSelected ? "2px solid #E9B743" : "1px solid transparent",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          animation: "glow 3s ease-in-out infinite", // Slow down the glow effect to 3 seconds
        },
        "@keyframes glow": {
          "0%": {
            boxShadow: "0 0 2px #FFD700, 0 0 5px #FFD700, 0 0 5px #FFD700", // Start with a subtle glow
          },
          "25%": {
            boxShadow: "0 0 4px #FFD700, 0 0 10px #FFD700, 0 0 10px #FFD700", // Gradually increase glow
          },
          "50%": {
            boxShadow: "0 0 3px #FFD700, 0 0 8px #FFD700, 0 0 8px #FFD700", // Subtle glow closer to the card
          },
          "75%": {
            boxShadow: "0 0 4px #FFD700, 0 0 12px #FFD700, 0 0 12px #FFD700", // Slightly stronger glow
          },
          "100%": {
            boxShadow: "0 0 3px #FFD700, 0 0 8px #FFD700, 0 0 8px #FFD700", // Back to subtle glow
          },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Bee Image */}
        <Box
          component="img"
          src={beeInfo.beeURL}
          alt={beeInfo.beeName}
          sx={{
            width: "100%", // Image will scale with the card size
            height: "auto",
          }}
        />

        {/* Bee Info */}
        <Box
          sx={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "5px 10px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#E9B743", fontWeight: "bold" }}
          >
            {beeInfo.beeName}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: beeInfo.ownerAddress === "user" ? "#FFCC00" : "#FFFFFF",
            }}
          >
            Owned by {beeInfo.ownerAddress === "user" ? "You" : "Other"}
          </Typography>
        </Box>
      </Box>

      {/* Unstake Button */}
      {beeInfo.ownerAddress === "user" && isSelected && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0",
            backgroundColor: "#292B2F",
            mt: "8px",
          }}
        >
          <PrimaryButton text="Unstake" onClick={() => alert("Unstaked")} />
        </Box>
      )}
    </Box>
  );
};

export default BeeCard;
