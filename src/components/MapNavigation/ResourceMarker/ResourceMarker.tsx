import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";
import { useSound } from "@/context/SoundContext";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import HexagonLoader from "@/components/Loaders/HexagonLoader"; // Import the HexagonLoader

interface ResourceMarkerProps {
  left: string;
  top: string;
  onPress: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ResourceMarker: React.FC<ResourceMarkerProps> = ({
  left,
  top,
  onPress,
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

  useEffect(() => {
    const delay = Math.random() * 0.2;
    setAnimationDelay(`${delay}s`);
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setPressedSound(new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3"));

    // Preload images
    const images = [
      "/MapNavigation/ResourceMarker/Marker/ResourceMarker.svg",
      "/MapNavigation/ResourceMarker/Marker/ResourceMarkerHover.svg",
      "/MapNavigation/ResourceMarker/Marker/ResourceMarkerPressed.svg",
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
    onMouseLeave();
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    if (!isMuted && pressedSound) {
      pressedSound.currentTime = 0;
      pressedSound.play();
    }
    onPress();
  };

  const handleClickAway = () => {
    setIsPressed(false);
  };

  const getImageSrc = () => {
    if (isPressed) {
      return "/MapNavigation/ResourceMarker/Marker/ResourceMarkerPressed.svg";
    }
    return isHovered
      ? "/MapNavigation/ResourceMarker/Marker/ResourceMarkerHover.svg"
      : "/MapNavigation/ResourceMarker/Marker/ResourceMarker.svg";
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        sx={{
          position: "absolute",
          left: left,
          top: top,
          width: "50px",
          height: "50px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.2s ease-in-out",
          animation: isHovered || isPressed ? "none" : `${bounce} 4s infinite`,
          animationDelay: isHovered || isPressed ? "0s" : animationDelay,
        }}
      >
        {isLoaded ? (
          <Box
            component="img"
            src={getImageSrc()}
            alt="Resource Marker"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <HexagonLoader size="50px" backgroundColor="#242E4E" rotate="30deg" />
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default ResourceMarker;
