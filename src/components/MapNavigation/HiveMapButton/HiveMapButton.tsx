import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

import { useSound } from "@/context/SoundContext";
import { useEnvironment } from "@/context/EnvironmentContext"; // <-- import your context

interface HiveMapButtonProps {
  // e.g. "Forest", "Desert", "Volcanic", etc.
  environmentType: string;
}

const HiveMapButton: React.FC<HiveMapButtonProps> = ({ environmentType }) => {
  const router = useRouter();
  const { isMuted } = useSound();

  // 1) Load environment from context
  const { environments } = useEnvironment();
  const environment = environments.find(
    (env) => env.environmentType === environmentType
  );

  // 2) State for loading images
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMainMapLoaded, setIsMainMapLoaded] = useState(false);
  const [isHoverMapLoaded, setIsHoverMapLoaded] = useState(false);
  const [isPressedMapLoaded, setIsPressedMapLoaded] = useState(false);

  // 3) Sound effects
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [pressedSound, setPressedSound] = useState<HTMLAudioElement | null>(
    null
  );

  // Safely handle missing environment
  const markerMain = environment?.MapMarker || "";
  const markerHover = environment?.MapMarkerHovered || "";
  const markerPressed = environment?.MapMarkerPressed || "";
  const destinationURL = environment?.environmentURL || "/"; // Fallback if none

  // 4) Preload images & sounds
  useEffect(() => {
    // Early exit if environment not found
    if (!environment) return;

    // Load sounds
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setPressedSound(new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3"));

    // Preload each image
    const mainMapImg = new Image();
    const hoverMapImg = new Image();
    const pressedMapImg = new Image();

    mainMapImg.src = markerMain;
    hoverMapImg.src = markerHover;
    pressedMapImg.src = markerPressed;

    mainMapImg.onload = () => setIsMainMapLoaded(true);
    hoverMapImg.onload = () => setIsHoverMapLoaded(true);
    pressedMapImg.onload = () => setIsPressedMapLoaded(true);
  }, [environment, markerMain, markerHover, markerPressed]);

  // 5) Hover and press events
  const handleMouseEnter = () => {
    // Only set hovered if the hover image is loaded
    if (!isHovered && isHoverMapLoaded) {
      setIsHovered(true);
    }
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
    if (isPressedMapLoaded) {
      setIsPressed(true);
    }
    if (!isMuted && pressedSound) {
      pressedSound.currentTime = 0;
      pressedSound.play();
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    // Navigate to the environment's page (or fallback)
    router.push(destinationURL);
  };

  // If the environment is missing or no markers, you might want to return null or a placeholder
  if (!environment) {
    return <Skeleton variant="circular" width="100px" height="100px" />;
  }

  // 6) Render
  return (
    <Box
      sx={{
        width: {
          xs: "20px",
          sm: "80px",
          md: "90px",
          lg: "100px",
          xl: "150px",
        },
        height: {
          xs: "20px",
          sm: "80px",
          md: "90px",
          lg: "100px",
          xl: "150px",
        },
        cursor: "pointer",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* While main marker is loading, show a skeleton */}
      {isMainMapLoaded ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: isPressed
              ? `url('${markerPressed}')`
              : isHovered
              ? `url('${markerHover}')`
              : `url('${markerMain}')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <Skeleton
          variant="circular"
          width="100%"
          height="100%"
          sx={{
            backgroundColor: "#242E4E",
          }}
        />
      )}
    </Box>
  );
};

export default HiveMapButton;
