import React from "react";
import { Skeleton, Box } from "@mui/material";
import { keyframes } from "@mui/system"; // Import keyframes

interface HexagonLoaderProps {
  size?: { [key: string]: string }; // Accept size for different breakpoints
  backgroundColor?: string; // Background color of the hexagon
  rotate?: string; // Rotation of the hexagon
}

// Define the pulse keyframes for the fade-in/out effect
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

const HexagonLoader: React.FC<HexagonLoaderProps> = ({
  size = { xs: "40px", sm: "50px", md: "50px", lg: "60px", xl: "70px" },
  backgroundColor = "#242E4E", // Default dark color
  rotate = "45deg", // Rotation to match the orientation
}) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: "100%",
          clipPath:
            "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)", // Hexagon shape
          backgroundColor: backgroundColor,
          transform: `rotate(${rotate})`, // Rotate the hexagon as needed
          animation: `${pulse} 2s ease-in-out infinite`, // Apply keyframe animation
        }}
      />
    </Box>
  );
};

export default HexagonLoader;
