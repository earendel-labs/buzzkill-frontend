import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/app/utils/logger";
// Dynamic import to disable SSR for this component
const LeftButton = dynamic(() => import("./LeftButton"), { ssr: false });

const LeftButtonComponent: React.FC = () => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload images and sounds
    const preloadResources = () => {
      const images = [
        "/Frames/Buttons/CarouselNavigation/LeftButton.svg",
        "/Frames/Buttons/CarouselNavigation/LeftButtonHover.svg",
        "/Frames/Buttons/CarouselNavigation/LeftButtonPressed.svg",
      ];

      const sounds = [
        "/Audio/MapNavigation/MapNavigationHover.mp3",
        "/Audio/MapNavigation/MapNavigationPressed.mp3",
      ];

      const preloadImages = images.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();  // Call resolve without passing the event
          img.onerror = () => reject();  // Call reject without passing the event
        });
      });
      const preloadSounds = sounds.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const audio = new Audio(src);
          audio.onloadeddata = () => resolve();
          audio.onerror = reject;
        });
      });

      // Wait for all resources to be preloaded
      Promise.all([...preloadImages, ...preloadSounds])
        .then(() => setIsLoading(false))
        .catch((err) => logger.error("Failed to preload resources", err));
    };

    preloadResources();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted) {
      const hoverSound = new Audio(
        "/Audio/MapNavigation/MapNavigationHover.mp3"
      );
      hoverSound.currentTime = 0;
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: 0,
            height: 0,
            borderTop: "50px solid transparent",
            borderBottom: "50px solid transparent",
            borderRight: "100px solid #E0E0E0", // Color for the skeleton
            position: "absolute",
            top: 0,
            left: 0,
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
            ? "/Frames/Buttons/CarouselNavigation/LeftButtonPressed.svg"
            : isHovered
            ? "/Frames/Buttons/CarouselNavigation/LeftButtonHover.svg"
            : "/Frames/Buttons/CarouselNavigation/LeftButton.svg"
        })`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100px",
        height: "100px",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default LeftButtonComponent;
