"use client";

import React, { useState, useEffect } from "react";
import type { ButtonProps } from "@mui/material";
import { Button, styled, keyframes, Skeleton } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";
import { useSound } from "@/context/SoundContext";

// Define props for GoldOutlinedButton.
interface GoldOutlinedButtonProps {
  text: string;
  onClick: () => void;
  scale?: number;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

// Keyframes for glow pulse effect (matching MenuModal usage).
const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px #D4AF37, 0 0 10px #D4AF37; }
  50% { box-shadow: 0 0 10px #D4AF37, 0 0 20px #D4AF37; }
  100% { box-shadow: 0 0 5px #D4AF37, 0 0 10px #D4AF37; }
`;

// Styled button matching the MenuModal's MenuButton design.
const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px 20px",
  borderRadius: "6px",
  backgroundColor: "rgba(15, 28, 48, 0.7)", // Semi-transparent dark blue.
  color: "#FFFFFF", // White text.
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "1px",
  textTransform: "none",
  border: "1px solid rgba(212, 175, 55, 0.7)", // Gold border.
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(212, 175, 55, 0.2)",
    animation: `${glowPulse} 3s infinite`,
    transform: "scale(1.03)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)",
    transition: "left 0.5s ease",
  },
  "&:hover::before": {
    left: "100%",
  },
  "&:disabled": {
    backgroundColor: "rgba(15, 28, 48, 0.5)",
    borderColor: "#A89248",
    color: "#A89248",
    animation: "none",
    cursor: "not-allowed",
  },
}));

// GoldOutlinedButton component with sound effects, scaling, and a loading state.
const GoldOutlinedButton: React.FC<GoldOutlinedButtonProps> = ({
  text,
  onClick,
  scale = 1,
  disabled = false,
  sx = {},
  ...props
}) => {
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
    setIsLoading(false);
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound && !disabled) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound && !disabled) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={scale * 150}
        height={scale * 50}
        sx={{ borderRadius: "8px" }}
      />
    );
  }

  return (
    <StyledButton
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      disabled={disabled}
      sx={{
        transform: `scale(${scale})`,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        transition: "opacity 0.3s ease",
        ...sx,
      }}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

export default GoldOutlinedButton;
