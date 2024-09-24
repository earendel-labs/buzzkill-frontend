import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { BeeInfo } from "@/types/BeeInfo";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState } from "react";
import BeeCardBackground from "./BeeCardBackground";

type CardSize = "small" | "medium" | "large" | "extraLarge";

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
  cardSize?: CardSize;
  isLoading?: boolean; // Add loading prop
}

const BeeCard: React.FC<BeeCardProps> = ({
  beeInfo,
  isSelected,
  onSelect,
  cardSize = "medium",
  isLoading = false, // Default loading to false
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
    onSelect();
  };
  const handleMouseUp = () => setIsPressed(false);

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
          : isHovered || isSelected // Increase size to 1.1 when hovered or selected
          ? "scale(1.02)"
          : "scale(1)",
        overflow: "hidden",

        display: "flex",
        flexDirection: "column",
        ...(isSelected
          ? {
              // White glow when selected
              boxShadow: "0 0 6px 5px rgba(255, 255, 255, 0.5)", // White glow with a large blur radius
              backdropFilter: "blur(6px)", // Add a blur effect to the background
            }
          : {
              // Yellow glow when hovered and not selected
              boxShadow: isHovered ? "0px 2px 7px rgba(0,0,0,0.4)" : "none",
            }),
        "&:hover": {
          ...(isSelected
            ? {
                // No animation on hover when selected, keeping the white glow
              }
            : {
                // Apply the yellow glow animation when hovering and not selected
                animation: "glow 3s ease-in-out infinite", // Yellow glow animation
              }),
        },
        "@keyframes glow": {
          "0%": {
            boxShadow: "0 0 1px 1px #FFD700", // Tighten the glow by reducing blur and spread
          },
          "25%": {
            boxShadow: "0 0 3px 2px #FFD700", // Slightly more glow, but keep it tight
          },
          "50%": {
            boxShadow: "0 0 2px 1.5px #FFD700", // Reduce both spread and blur for a subtle glow
          },
          "75%": {
            boxShadow: "0 0 4px 2.5px #FFD700", // Gradually increase but keep it tight
          },
          "100%": {
            boxShadow: "0 0 2px 1.5px #FFD700", // Return to a tighter glow
          },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Bee Image */}
        <BeeCardBackground bee={beeInfo} isLoading={isLoading} />

        {/* Unstake Button */}
        {beeInfo.ownerAddress === "user" && isSelected ? (
          <Box
            sx={{
              position: "absolute",
              bottom: "0.5rem",
              left: "0.25rem",
              padding: "4px 10px",
              textAlign: "left",
              width: "100%",
            }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    marginBottom: "0.3rem",
                  }}
                >
                  {beeInfo.beeName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                  }}
                >
                  Owned by {beeInfo.ownerAddress === "user" ? "You" : "Other"}
                </Typography>
              </>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <PrimaryButton
                text="Unstake"
                onClick={() => alert("Unstaked")}
                scale={0.8}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: "absolute",
              bottom: "1rem",
              left: "0.25rem",
              padding: "4px 10px",
              textAlign: "left",
              width: "100%",
            }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    marginBottom: "1rem",
                  }}
                >
                  {beeInfo.beeName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                  }}
                >
                  Owned by {beeInfo.ownerAddress === "user" ? "You" : "Other"}
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BeeCard;
