import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton";
import { BeeInfo } from "@/types/BeeInfo";
import { Box, Typography, Skeleton } from "@mui/material";
import { useState } from "react";
import BeeCardBackground from "./BeeCardBackground";

type CardSize = "small" | "medium" | "large" | "extraLarge";

const cardSizeDimensions: Record<
  CardSize,
  {
    width: string;
    height: string;
    fontSize: string;
    buttonScale: number;
    spacingScale: number;
  }
> = {
  small: {
    width: "120px",
    height: "auto",
    fontSize: "12px",
    buttonScale: 0.6,
    spacingScale: 1,
  },
  medium: {
    width: "150px",
    height: "auto",
    fontSize: "14px",
    buttonScale: 0.75,
    spacingScale: 0.75,
  },
  large: {
    width: "200px",
    height: "auto",
    fontSize: "16px",
    buttonScale: 0.7,
    spacingScale: 1,
  },
  extraLarge: {
    width: "290px",
    height: "auto",
    fontSize: "26px",
    buttonScale: 1,
    spacingScale: 1.4,
  },
};

interface BeeCardProps {
  beeInfo: BeeInfo;
  isSelected: boolean;
  onSelect: () => void;
  cardSize?: CardSize;
  isLoading?: boolean;
}

const BeeCard: React.FC<BeeCardProps> = ({
  beeInfo,
  isSelected,
  onSelect,
  cardSize = "medium",
  isLoading = false,
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

  const { width, height, fontSize, buttonScale, spacingScale } =
    cardSizeDimensions[cardSize];

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        position: "relative",
        width,
        height,
        cursor: "pointer",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
        transform: isPressed
          ? "scale(0.99)"
          : isHovered || isSelected
          ? "scale(1.05)"
          : "scale(1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...(isSelected
          ? {
              boxShadow: "0 0 6px 5px rgba(255, 255, 255, 0.5)", // White glow
              backdropFilter: "blur(6px)",
            }
          : {
              boxShadow: isHovered ? "0px 2px 7px rgba(0,0,0,0.4)" : "none",
            }),
        "&:hover": {
          ...(isSelected
            ? {}
            : {
                animation: "glow 3s ease-in-out infinite", // Yellow glow animation
              }),
        },
        "@keyframes glow": {
          "0%": {
            boxShadow: "0 0 1px 1px #FFD700",
          },
          "25%": {
            boxShadow: "0 0 3px 2px #FFD700",
          },
          "50%": {
            boxShadow: "0 0 2px 1.5px #FFD700",
          },
          "75%": {
            boxShadow: "0 0 4px 2.5px #FFD700",
          },
          "100%": {
            boxShadow: "0 0 2px 1.5px #FFD700",
          },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Bee Image */}
        <BeeCardBackground bee={beeInfo} isLoading={isLoading} />

        {/* Text and Button Section    */}
        <Box
          sx={{
            position: "absolute",
            bottom:
              beeInfo.ownerAddress === "user" && isSelected ? "0.5rem" : `calc(${spacingScale} *1rem)`,
            left: `calc(${spacingScale} *0.25rem)`,
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
                  fontSize:
                    beeInfo.ownerAddress === "user" && isSelected
                      ? fontSize // Use the default font size when it's the user's bee and selected
                      : `calc(${fontSize} + 4px)`,
                  lineHeight: 1.2,
                  marginBottom:
                    beeInfo.ownerAddress === "user" && isSelected
                      ? "0.3rem" // Use the default font size when it's the user's bee and selected
                      : "0.6rem",
                }}
              >
                {beeInfo.beeName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#FFFFFF",
                  fontSize:
                    beeInfo.ownerAddress === "user" && isSelected
                      ? `calc(${fontSize} - 2px)` // Use the default font size when it's the user's bee and selected
                      : fontSize,
                  lineHeight: 1.2,
                }}
              >
                Owned by {beeInfo.ownerAddress === "user" ? "You" : "Other"}
              </Typography>
            </>
          )}

          {/* Unstake Button */}
          {beeInfo.ownerAddress === "user" && isSelected && !isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "0.3rem",
              }}
            >
              <PrimaryButton
                text="Unstake"
                onClick={() => alert("Unstaked")}
                scale={buttonScale} // Dynamic scale for button based on card size
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BeeCard;
