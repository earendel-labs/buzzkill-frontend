import React from "react";
import { Box } from "@mui/material";

interface HatchlingImageProps {
  imageAddress: string;
  alt: string;
  sx?: React.CSSProperties; // Allowing optional sx prop
}

const HatchlingImage: React.FC<HatchlingImageProps> = ({
  imageAddress,
  alt,
  sx, // Destructure the sx prop
}) => (
  <Box
    component="img"
    src={imageAddress}
    alt={alt}
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "4px",
      ...sx, // Apply additional styles from sx prop
    }}
  />
);

export default HatchlingImage;