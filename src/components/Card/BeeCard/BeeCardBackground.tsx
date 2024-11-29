import React from "react";
import { Box, BoxProps } from "@mui/material";

interface BeeCardBackgroundProps extends BoxProps {
  children: React.ReactNode;
  transparency?: number; // Optional transparency prop
  shadowTransparency?: number; // Optional shadow transparency prop
  rarity?: "Common" | "Rare" | "Ultra-Rare"; // Rarity prop
}

const rarityColors = {
  Common: {
    background: "rgba(34, 46, 80, 0.4)", // Default transparency for common
    gradient:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(215, 215, 215, 0.25) 90%, rgba(255, 255, 255, 0.3) 100%)",
  },
  Rare: {
    background: "rgba(160, 82, 45, 0.5)", // Rich bronze background color
    gradient:
      "linear-gradient(135deg, rgba(255, 183, 77, 0.2) 0%, rgba(205, 127, 50, 0.5) 50%, rgba(160, 82, 45, 0.8) 75%, rgba(255, 140, 0, 1) 100%)", // Shiny bronze effect
  },
  "Ultra-Rare": {
    background: "rgba(255, 215, 0, 0.6)", // Richer golden background
    gradient:
      "linear-gradient(135deg, rgba(255, 245, 157, 0.3) 0%, rgba(255, 223, 0, 0.5) 40%, rgba(255, 215, 0, 0.8) 75%, rgba(255, 230, 100, 1) 100%)", // Bright, shiny golden gradient
  },
};

const BeeCardBackground: React.FC<BeeCardBackgroundProps> = ({
  children,
  transparency = 0.4, // Default transparency value
  shadowTransparency = 0.3, // Default shadow transparency value
  rarity = "Common", // Default rarity
  sx,
  ...props
}) => {
  const { background, gradient } = rarityColors[rarity];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: background,
        boxShadow: `0px 12px 24px rgba(0, 0, 0, ${shadowTransparency})`,
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          background: gradient,
          padding: "0.55px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BeeCardBackground;
