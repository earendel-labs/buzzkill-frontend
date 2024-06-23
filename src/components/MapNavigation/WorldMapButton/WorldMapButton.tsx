import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13

interface WorldMapButtonProps {
  top: string;
  left: string;
}

const WorldMapButton: React.FC<WorldMapButtonProps> = ({ top, left }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    router.push("/Play");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: top,
        left: left,
        width: "250px", // Adjust this as needed
        height: "250px", // Adjust this as needed
        transform: "translate(-50%, -50%)",
        backgroundImage: `url('/MapNavigation/MainMap.png')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: "48%",
            left: "49%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="div" sx={{ color: "white" }}>
            World Map
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WorldMapButton;
