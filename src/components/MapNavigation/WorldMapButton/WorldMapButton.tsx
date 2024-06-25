import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13
import { useSound } from "@/context/SoundContext";

interface WorldMapButtonProps {
  top: string;
  left: string;
}

const WorldMapButton: React.FC<WorldMapButtonProps> = ({ top, left }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false); // Add pressed state
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
      hoverSound.currentTime = 0; // Reset audio to the start
      hoverSound.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false); // Reset pressed state when mouse leaves
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    if (!isMuted && pressedSound) {
      pressedSound.currentTime = 0; // Reset audio to the start
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
        position: "absolute",
        top: top,
        left: left,
        width: "250px", // Adjust this as needed
        height: "250px", // Adjust this as needed
        transform: "translate(-50%, -50%)",
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
