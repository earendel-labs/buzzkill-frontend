import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useSound } from "@/context/SoundContext";

interface WorldMapButtonProps {}

const WorldMapButton: React.FC<WorldMapButtonProps> = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [pressedSound, setPressedSound] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setPressedSound(new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3"));
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    if (!isMuted && pressedSound) {
      pressedSound.currentTime = 0;
      pressedSound.play();
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    router.push("/Play");
  };

  return (
    <Box
      sx={{
        width: {
          xs: "20px", // height for extra-small screens
          sm: "30px", // height for small screens
          md: "120px", // height for medium screens
          lg: "190px", // height for large screens
          xl: "250px", // height for extra-large screens
        },
        height: {
          xs: "20px", // height for extra-small screens
          sm: "100px", // height for small screens
          md: "120px", // height for medium screens
          lg: "190px", // height for large screens
          xl: "250px", // height for extra-large screens
        },
        backgroundImage: isPressed
          ? `url('/MapNavigation/MainMapPressed.svg')`
          : isHovered
          ? `url('/MapNavigation/MainMap-Hovered.svg')`
          : `url('/MapNavigation/MainMap.svg')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></Box>
  );
};

export default WorldMapButton;
