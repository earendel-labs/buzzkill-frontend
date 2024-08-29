import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSound } from "@/context/SoundContext";

const RightButton: React.FC = () => {
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
            ? "/Frames/Buttons/CarouselNavigation/RightButtonPressed.svg"
            : isHovered
            ? "/Frames/Buttons/CarouselNavigation/RightButtonHover.svg"
            : "/Frames/Buttons/CarouselNavigation/RightButton.svg"
        })`,
        backgroundSize: "contain",
        width: "100px", // Adjust width as needed
        height: "100px", // Adjust height as needed
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default RightButton;
