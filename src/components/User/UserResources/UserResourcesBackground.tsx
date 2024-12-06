import { Box, BoxProps } from "@mui/material";
import React from "react";

interface GradientCardProps extends BoxProps {
  borderWidth?: string | number; // Add optional prop for border width
}

const UserResourcesBackground: React.FC<GradientCardProps> = ({
  children,
  sx,
  borderWidth = "4px", // Default value for border width
  ...rest
}) => {
  return (
    <Box
      sx={{
        position: "relative", // Required for the pseudo-element
        background: `linear-gradient(180deg, rgba(36, 46, 78, 0.9) 11.54%, rgba(18, 23, 39, 0.9) 49.51%, rgba(32, 41, 70, 0.9) 80.36%, rgba(23, 29, 50, 0.9) 91.43%)`,
        borderRadius: 2, // Adjust to your preferred corner radius
        boxShadow: 3, // Optional: add elevation
        overflow: "hidden", // Ensures child content stays within rounded borders
        padding: 2, // Optional: adjust padding
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit", // Inherit border radius
          background:
            "linear-gradient(135deg,  #E9B743 4%, #E9B743 12%, #8a4829 33%, #a86c2c 44%, #E9B743 77%, #E9B743 98%)", // Golden gradient
          padding: borderWidth, // Use the passed or default border width
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor", // Apply the mask to make only the border show gradient
          maskComposite: "exclude",
        },
        ...sx, // Allow overriding or extending styles via `sx` prop
      }}
      {...rest} // Pass any other props
    >
      {children}
    </Box>
  );
};

export default UserResourcesBackground;
