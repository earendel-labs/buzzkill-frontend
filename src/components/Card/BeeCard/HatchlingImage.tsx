import React from "react";
import { Box } from "@mui/material";

const HatchlingImage: React.FC<{ imageAddress: string; alt: string }> = ({
  imageAddress,
  alt,
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
    }}
  />
);

export default HatchlingImage;
