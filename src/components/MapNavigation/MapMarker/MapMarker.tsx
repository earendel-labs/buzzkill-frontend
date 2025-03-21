import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";
import { useSound } from "@/context/SoundContext";
import HexagonLoader from "@/components/Loaders/HexagonLoader";

interface MapMarkerProps {
  left: string;
  top: string;
  link: string;
  navigate: (link: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Define bounce animation
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const MapMarker: React.FC<MapMarkerProps> = ({
  left,
  top,
  link,
  navigate,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // State to track if images are loaded
  const [animationDelay, setAnimationDelay] = useState<string>("0s");
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [pressedSound, setPressedSound] = useState<HTMLAudioElement | null>(
    null
  );

  // Define common sizes for different breakpoints
  const sizeByBreakpoint = {
    xs: "25px",
    sm: "30px",
    md: "40px",
    lg: "50px",
    xl: "60px",
  };

  useEffect(() => {
    const delay = Math.random() * 0.2;
    setAnimationDelay(`${delay}s`);
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setPressedSound(new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3"));

    // Preload images
    const images = [
      "/MapNavigation/MapMarker/MapMarker.svg",
      "/MapNavigation/MapMarker/MapMarkerHover.svg",
      "/MapNavigation/MapMarker/MapMarkerPressed.svg",
    ];

    let loadedImages = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          setIsLoaded(true); // All images are loaded
        }
      };
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    onMouseLeave();
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (!isMuted && pressedSound) {
      pressedSound.currentTime = 0;
      pressedSound.play();
    }
    navigate(link);
  };

  const getImageSrc = () => {
    if (isPressed) {
      return "/MapNavigation/MapMarker/MapMarkerPressed.svg";
    }
    return isHovered
      ? "/MapNavigation/MapMarker/MapMarkerHover.svg"
      : "/MapNavigation/MapMarker/MapMarker.svg";
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
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease-in-out",
        animation: isHovered ? "none" : `${bounce} 4s infinite`,
        animationDelay: isHovered ? "0s" : animationDelay,
        // Reuse sizes from the common sizeByBreakpoint object
        width: sizeByBreakpoint,
        height: sizeByBreakpoint,
      }}
    >
      {isLoaded ? (
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
      ) : (
        <HexagonLoader
          size={sizeByBreakpoint}
          backgroundColor="#242E4E"
          rotate="30deg"
        />
      )}
    </Box>
  );
};

export default MapMarker;
