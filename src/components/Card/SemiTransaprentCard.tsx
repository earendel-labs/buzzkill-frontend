import React from "react";
import { Box, BoxProps } from "@mui/material";

interface SemiTransparentCardProps extends BoxProps {
  children: React.ReactNode;
  transparency?: number; // Optional transparency prop
  shadowTransparency?: number; // Optional shadow transparency prop
}

const SemiTransparentCard: React.FC<SemiTransparentCardProps> = ({
  children,
  transparency = 0.4, // Default transparency value
  shadowTransparency = 0.3, // Default shadow transparency value
  sx, // Allow additional styles to be passed
  ...props // Spread other BoxProps
}) => {
  return (
    <Box
      sx={{
        position: "relative", // Needed for the pseudo-element to work
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: `rgba(34, 46, 80, ${transparency})`, // Dynamic transparency
        boxShadow: `0px 12px 24px rgba(0, 0, 0, ${shadowTransparency})`, // Dynamic shadow transparency
        borderRadius: "12px", // Rounded corners
        overflow: "hidden", // Ensure the pseudo-element stays within the box
        zIndex: 1, // Ensure content is above the pseudo-element
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit", // Inherit border radius for gradient
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.2) 70%, rgba(215, 215, 215, 0.25) 90%, rgba(255, 255, 255, 0.3) 100%)", // Lighter bottom-right corner
          padding: "0.55px", // Border width
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor", // Apply the mask to make only the border show gradient
          maskComposite: "exclude",
          zIndex: -1, // Make sure it's behind the content
        },
        ...sx, // Apply any additional styles passed in
      }}
      {...props} // Spread other Box props like 'onClick', 'className', etc.
    >
      {children}
    </Box>
  );
};

export default SemiTransparentCard;
