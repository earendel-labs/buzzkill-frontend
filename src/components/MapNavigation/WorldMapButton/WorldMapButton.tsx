import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material"; // Import Skeleton
import { useRouter } from "next/navigation";
import { useSound } from "@/context/SoundContext";

const WorldMapButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMainMapLoaded, setIsMainMapLoaded] = useState(false);
  const [isHoverMapLoaded, setIsHoverMapLoaded] = useState(false);
  const [isPressedMapLoaded, setIsPressedMapLoaded] = useState(false);

  const router = useRouter();
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [pressedSound, setPressedSound] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setPressedSound(new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3"));

    // Preload each image and track when each one is fully loaded
    const mainMapImg = new Image();
    const hoverMapImg = new Image();
    const pressedMapImg = new Image();

    mainMapImg.src = "/MapNavigation/MainMap.svg";
    hoverMapImg.src = "/MapNavigation/MainMap-Hovered.svg";
    pressedMapImg.src = "/MapNavigation/MainMapPressed.svg";

    mainMapImg.onload = () => setIsMainMapLoaded(true);
    hoverMapImg.onload = () => setIsHoverMapLoaded(true);
    pressedMapImg.onload = () => setIsPressedMapLoaded(true);
  }, []);

  const handleMouseEnter = () => {
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
    router.push("/Play");
  };

  return (
    <Box
      sx={{
        width: {
          xs: "20px", // height for extra-small screens
          sm: "80px", // height for small screens
          md: "90px", // height for medium screens
          lg: "100px", // height for large screens
          xl: "150px", // height for extra-large screens
        },
        height: {
          xs: "20px", // height for extra-small screens
          sm: "80px", // height for small screens
          md: "90px", // height for medium screens
          lg: "100px", // height for large screens
          xl: "150px", // height for extra-large screens
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
      {isMainMapLoaded ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: isPressed
              ? `url('/MapNavigation/MainMapPressed.svg')`
              : isHovered
              ? `url('/MapNavigation/MainMap-Hovered.svg')`
              : `url('/MapNavigation/MainMap.svg')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Box>
      ) : (
        <Skeleton
          variant="circular"
          width="95%"
          height="95%"
          sx={{
            backgroundColor: "#242E4E",
          }}
        />
      )}
    </Box>
  );
};

export default WorldMapButton;
