import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSound } from "@/context/SoundContext";

const LeftButton: React.FC = () => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted) {
      const hoverSound = new Audio(
        "/Audio/MapNavigation/MapNavigationHover.mp3"
      );
      hoverSound.currentTime = 0; // Reset audio to the start
      hoverSound.play().catch((error) => {
        console.log("Hover sound play error:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    if (!isMuted) {
      const pressedSound = new Audio(
        "/Audio/MapNavigation/MapNavigationPressed.mp3"
      );
      pressedSound.currentTime = 0;
      pressedSound.play().catch((error) => {
        console.log("Pressed sound play error:", error);
      });
    }
  };

  return (
    <Box
      component="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        backgroundImage: `url(${
          isClicked
            ? "/Frames/Buttons/CarouselNavigation/LeftButtonPressed.svg"
            : isHovered
            ? "/Frames/Buttons/CarouselNavigation/LeftButtonHover.svg"
            : "/Frames/Buttons/CarouselNavigation/LeftButton.svg"
        })`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100px", // Ensure width is consistent
        height: "100px", // Ensure height is consistent
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default LeftButton;
