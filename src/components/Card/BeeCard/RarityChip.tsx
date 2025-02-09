import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";

interface RarityChipProps extends BoxProps {
  rarity: "Common" | "Rare" | "Ultra-Rare"; // Rarity prop
}

const rarityChipStyles = {
  Common: {
    background: "rgba(34, 46, 80, 0.4)", // Default transparency for common
    gradient:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(215, 215, 215, 0.25) 90%, rgba(255, 255, 255, 0.3) 100%)",
  },
  Rare: {
    background: "rgba(160, 82, 45, 0.5)", // Rich bronze background color
    gradient:
      "linear-gradient(135deg, rgba(255, 183, 77, 0.2) 0%, rgba(205, 127, 50, 0.5) 50%, rgba(160, 82, 45, 0.8) 75%, rgba(255, 140, 0, 1) 100%)",
  },
  "Ultra-Rare": {
    background: "rgba(255, 215, 0, 0.6)", // Richer golden background
    gradient:
      "linear-gradient(135deg, rgba(255, 245, 157, 0.3) 0%, rgba(255, 223, 0, 0.5) 40%, rgba(255, 215, 0, 0.8) 75%, rgba(255, 230, 100, 1) 100%)",
  },
};

const StyledRarityChip = styled(Box)<RarityChipProps>(({ rarity }) => {
  const { background, gradient } = rarityChipStyles[rarity];

  return {
    backgroundColor: background,
    color: "white",
    display: "flex",  
    alignItems: "bottom",  
    justifyContent: "center", 
    padding: "8px 16px",
    borderRadius: "14px",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "14px", 
    position: "absolute",
    top: "16px",
    left: "16px",
    zIndex: 1,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "inherit",
      background: gradient,
      padding: "0.5px",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      zIndex: -1,
    },
  };
});

const RarityChip: React.FC<RarityChipProps> = ({
  rarity,
  children,
  ...props
}) => {
  return (
    <StyledRarityChip rarity={rarity} {...props}>
      {children || rarity}
    </StyledRarityChip>
  );
};

export default RarityChip;
