import React, { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/utils/logger";
const RightButton: React.FC = () => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Preload the images
  useEffect(() => {
    const images = [
      "/Frames/Buttons/CarouselNavigation/RightButton.svg",
      "/Frames/Buttons/CarouselNavigation/RightButtonHover.svg",
      "/Frames/Buttons/CarouselNavigation/RightButtonPressed.svg",
    ];

    const preloadImages = images.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });

    Promise.all(preloadImages)
      .then(() => setIsLoading(false))
      .catch((err) => logger.log("Error loading images:", err));
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted) {
      const hoverSound = new Audio(
        "/Audio/MapNavigation/MapNavigationHover.mp3"
      );
      hoverSound.currentTime = 0; // Reset audio to the start
      hoverSound.play().catch((error) => {
        logger.log("Hover sound play error:", error);
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
        logger.log("Pressed sound play error:", error);
      });
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Skeleton loader with '>' shape */}
        <Skeleton
          variant="rectangular"
          width="50px"
          height="100px"
          sx={{
            clipPath: "polygon(0 0, 50% 50%, 0 100%)", // Create the '>' shape
            backgroundColor: "#cccccc", // Optional: Customize skeleton color
          }}
        />
      </Box>
    );
  }

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
