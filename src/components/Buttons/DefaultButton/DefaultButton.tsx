"use client";

import React, { useState, useEffect } from "react";
import type { ButtonProps } from "@mui/material";
import { Button, Skeleton } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";
import { useSound } from "@/context/SoundContext";

// DefaultButton overloads the Material UI Button and adds custom sound effects.
// It uses the SocialIconHover and SocialIconPressed sounds.
// It accepts any ButtonProps including className, sx, children, etc.
const DefaultButton: React.FC<ButtonProps> = (props) => {
  const { isMuted } = useSound();
  const { onClick, disabled, sx, className, children, ...rest } = props;

  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/SocialIconHover.wav"));
    setClickSound(new Audio("/Audio/Button/SocialIconPressed.wav"));
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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={150}
        height={50}
        sx={{ borderRadius: "8px" }}
      />
    );
  }

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      disabled={disabled}
      sx={{ ...sx }}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
