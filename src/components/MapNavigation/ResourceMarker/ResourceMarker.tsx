import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/system";
import { useSound } from "@/context/SoundContext";

interface ResourceMarkerProps {
  left: string;
  top: string;
  link: string;
  navigate: (link: string) => void;
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
  link,
  navigate,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
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
      return "/MapNavigation/ResourceMarker/Marker/ResourceMarkerPressed.svg";
    }
    return isHovered
      ? "/MapNavigation/ResourceMarker/Marker/ResourceMarkerHover.svg"
      : "/MapNavigation/ResourceMarker/Marker/ResourceMarker.svg";
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
        animation: isHovered ? "none" : `${bounce} 4s infinite`,
        animationDelay: isHovered ? "0s" : animationDelay,
      }}
    >
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
    </Box>
  );
};

export default ResourceMarker;
