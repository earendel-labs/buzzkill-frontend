// src/components/Buttons/PrimaryButton/PrimaryButton.tsx
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useSound } from "@/context/SoundContext";
import { Skeleton } from "@mui/material";

// Dynamic import of the PrimaryButton to avoid SSR
const PrimaryButton = dynamic(() => import("./PrimaryButton"), { ssr: false });

interface PrimaryButtonProps {
  text: string;
  isActiveTab?: boolean;
  onClick: () => void;
  scale?: number; // New scale prop to adjust size dynamically
  disabled?: boolean; // Add the disabled prop here
}

const PrimaryButtonComponent: React.FC<PrimaryButtonProps> = ({
  text,
  isActiveTab = false,
  onClick,
  scale = 1, // Default scale is 1 (no scaling)
  disabled = false, // Default disabled to false
}) => {
  const theme = useTheme();
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    const preloadImages = () => {
      const images = [
        "/Frames/Buttons/PrimaryButton/PrimaryButton.svg",
        "/Frames/Buttons/PrimaryButton/PrimaryButtonHover.svg",
        "/Frames/Buttons/PrimaryButton/PrimaryButtonActiveTab.svg",
      ];

      const promises = images.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = reject;
        });
      });

      Promise.all(promises)
        .then(() => {
          setIsLoading(false); // Images are preloaded, loading done
        })
        .catch((error) => console.error("Error loading images", error));
    };

    preloadImages();
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound && !disabled) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound && !disabled) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (!disabled) {
      setIsPressed(false);
      onClick();
    } else {
      setIsPressed(false);
    }
  };

  const getImageSrc = () => {
    if (disabled) {
      return "/Frames/Buttons/PrimaryButton/PrimaryButtonDisabled.svg"; // Optional: Create a disabled state image
    }
    if (isPressed) {
      return "/Frames/Buttons/PrimaryButton/PrimaryButtonActiveTab.svg";
    }
    if (isActiveTab) {
      return "/Frames/Buttons/PrimaryButton/PrimaryButtonActiveTab.svg";
    }
    return isHovered
      ? "/Frames/Buttons/PrimaryButton/PrimaryButtonHover.svg"
      : "/Frames/Buttons/PrimaryButton/PrimaryButton.svg";
  };

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={scale * 150} // Adjust size according to scale
        height={scale * 50}
        sx={{ borderRadius: "8px" }}
      />
    );
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        display: "inline-flex",
        backgroundImage: `url(${getImageSrc()})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        width: `${scale * 105}px`, // Adjust for your custom scaling
        height: `${scale * 35}px`,
        opacity: disabled ? 0.6 : 1, // Visual indication of disabled state
        pointerEvents: disabled ? "none" : "auto", // Prevent interactions when disabled
        transition: "opacity 0.3s ease",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          whiteSpace: "nowrap",
          fontWeight: "1000",
          fontSize: `${scale * 1}rem`,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default PrimaryButtonComponent;
