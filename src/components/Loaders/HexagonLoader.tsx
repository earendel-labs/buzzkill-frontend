import React from "react";
import { Skeleton } from "@mui/material";
import { keyframes } from "@mui/system"; // Import keyframes

interface HexagonLoaderProps {
  size?: string; // Define size prop for flexibility (e.g., "70px")
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
  size = "70px",
  backgroundColor = "#242E4E", // Default dark color
  rotate = "45deg", // Rotation to match the orientation
}) => {
  return (
    <Skeleton
      variant="rectangular"
      width={size}
      height={size}
      sx={{
        clipPath:
          "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)", // Hexagon shape
        backgroundColor: backgroundColor,
        transform: `rotate(${rotate})`, // Rotate the hexagon as needed
        animation: `${pulse} 2s ease-in-out infinite`, // Apply keyframe animation
      }}
    />
  );
};

export default HexagonLoader;
