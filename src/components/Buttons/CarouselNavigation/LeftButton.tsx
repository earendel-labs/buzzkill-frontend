// src/components/Buttons/CarouselNavigation/LeftButton.tsx
import React, { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/utils/logger";

interface LeftButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

const LeftButton: React.FC<LeftButtonProps> = ({
  disabled = false,
  onClick,
}) => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = [
      "/Frames/Buttons/CarouselNavigation/LeftButton.svg",
      "/Frames/Buttons/CarouselNavigation/LeftButtonHover.svg",
      "/Frames/Buttons/CarouselNavigation/LeftButtonPressed.svg",
      "/Frames/Buttons/CarouselNavigation/LeftButtonDisabled.svg",
    ];
    const sounds = [
      "/Audio/MapNavigation/MapNavigationHover.mp3",
      "/Audio/MapNavigation/MapNavigationPressed.mp3",
    ];

    Promise.all([
      ...images.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = reject;
          })
      ),
      ...sounds.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const audio = new Audio(src);
            audio.onloadeddata = () => resolve();
            audio.onerror = reject;
          })
      ),
    ])
      .then(() => setIsLoading(false))
      .catch((err) => logger.error("Failed to preload resources", err));
  }, []);

  const playSound = (src: string) => {
    if (isMuted) return;
    const s = new Audio(src);
    s.currentTime = 0;
    s.play().catch((e) => logger.log("Sound play error:", e));
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    playSound("/Audio/MapNavigation/MapNavigationHover.mp3");
  };
  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
    setIsClicked(false);
  };
  const handleMouseDown = () => {
    if (disabled) return;
    setIsClicked(true);
  };
  const handleMouseUp = () => {
    if (disabled) return;
    setIsClicked(false);
    playSound("/Audio/MapNavigation/MapNavigationPressed.mp3");
    onClick?.();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "68px",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="68px"
          height="100px"
          sx={{
            clipPath: "polygon(100% 0, 0% 50%, 100% 100%)",
            backgroundColor: "#242E4E",
          }}
        />
      </Box>
    );
  }

  const imageUrl = disabled
    ? "/Frames/Buttons/CarouselNavigation/LeftButtonDisabled.svg"
    : isClicked
    ? "/Frames/Buttons/CarouselNavigation/LeftButtonPressed.svg"
    : isHovered
    ? "/Frames/Buttons/CarouselNavigation/LeftButtonHover.svg"
    : "/Frames/Buttons/CarouselNavigation/LeftButton.svg";

  return (
    <Box
      component="button"
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        pointerEvents: disabled ? "none" : "auto",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100px",
        height: "100px",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default LeftButton;
