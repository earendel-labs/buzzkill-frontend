import React from "react";
import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";

/** Acceptable rarity values for the chip */
export interface RarityChipProps extends BoxProps {
  rarity: "Common" | "Rare" | "Ultra-Rare" | "Legendary";
}

/** Central colour definitions so every component can reuse them */
export const rarityChipStyles: Record<
  RarityChipProps["rarity"],
  { background: string; gradient: string }
> = {
  Common: {
    background: "rgba(34, 46, 80, 0.4)",
    gradient:
      "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.20) 70%, rgba(215,215,215,0.25) 90%, rgba(255,255,255,0.30) 100%)",
  },
  Rare: {
    background: "rgba(160, 82, 45, 0.5)",
    gradient:
      "linear-gradient(135deg, rgba(255,183,77,0.20) 0%, rgba(205,127,50,0.50) 50%, rgba(160,82,45,0.80) 75%, rgba(255,140,0,1) 100%)",
  },
  "Ultra-Rare": {
    background: "rgba(255, 215, 0, 0.6)",
    gradient:
      "linear-gradient(135deg, rgba(255,245,157,0.30) 0%, rgba(255,223,0,0.50) 40%, rgba(255,215,0,0.80) 75%, rgba(255,230,100,1) 100%)",
  },
  Legendary: {
    background: "rgba(128, 0, 128, 0.7)",
    gradient:
      "linear-gradient(135deg, rgba(230,200,255,0.30) 0%, rgba(186,85,211,0.50) 40%, rgba(148,0,211,0.70) 70%, rgba(255,105,180,0.90) 100%)",
  },
};

const StyledRarityChip = styled(Box)<RarityChipProps>(({ rarity }) => {
  const { background, gradient } = rarityChipStyles[rarity];

  return {
    backgroundColor: background,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    borderRadius: "14px",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: "14px",
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 2,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
    // Decorative border
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

/** Public component */
const RarityChip: React.FC<RarityChipProps> = ({
  rarity,
  children,
  ...props
}) => (
  <StyledRarityChip rarity={rarity} {...props}>
    {children || rarity}
  </StyledRarityChip>
);

export default RarityChip;
