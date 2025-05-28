import React, { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/utils/logger";

interface RightButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const RightButton: React.FC<RightButtonProps> = ({
  disabled = false,
  onClick,
}) => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = [
      "/Frames/Buttons/CarouselNavigation/RightButton.svg",
      "/Frames/Buttons/CarouselNavigation/RightButtonHover.svg",
      "/Frames/Buttons/CarouselNavigation/RightButtonPressed.svg",
      "/Frames/Buttons/CarouselNavigation/RightButtonDisabled.svg",
    ];

    Promise.all(
      images.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = reject;
          })
      )
    )
      .then(() => setIsLoading(false))
      .catch((err) => logger.log("Error preloading images:", err));
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    if (!isMuted) {
      const hoverSound = new Audio(
        "/Audio/MapNavigation/MapNavigationHover.mp3"
      );
      hoverSound.currentTime = 0;
      hoverSound
        .play()
        .catch((error) => logger.log("Hover sound play error:", error));
    }
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
    if (!isMuted) {
      const pressedSound = new Audio(
        "/Audio/MapNavigation/MapNavigationPressed.mp3"
      );
      pressedSound.currentTime = 0;
      pressedSound
        .play()
        .catch((error) => logger.log("Pressed sound play error:", error));
    }
    onClick?.();
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "120px",
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
            clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            backgroundColor: "#242E4E",
          }}
        />
      </Box>
    );
  }

  const imageUrl = disabled
    ? "/Frames/Buttons/CarouselNavigation/RightButtonDisabled.svg"
    : isClicked
    ? "/Frames/Buttons/CarouselNavigation/RightButtonPressed.svg"
    : isHovered
    ? "/Frames/Buttons/CarouselNavigation/RightButtonHover.svg"
    : "/Frames/Buttons/CarouselNavigation/RightButton.svg";

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
        width: "100px",
        height: "100px",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default RightButton;
