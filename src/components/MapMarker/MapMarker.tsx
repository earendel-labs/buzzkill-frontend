import React, { useState } from "react";
import Box from "@mui/material/Box";

interface MapMarkerProps {
  left: string;
  top: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ left, top }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false); // Ensure the pressed state is reset when the mouse leaves
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const getImageSrc = () => {
    if (isPressed) {
      return "/MapMarker/MapMarkerPressed.svg";
    }
    return isHovered
      ? "/MapMarker/MapMarkerHover.svg"
      : "/MapMarker/MapMarker.svg";
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        position: "absolute",
        left: left,
        top: top,
        width: "70px",
        height: "70px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <Box
        component="img"
        src={getImageSrc()}
        alt="Map Marker"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default MapMarker;
