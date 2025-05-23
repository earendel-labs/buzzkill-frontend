"use client";

import React, { useState, useEffect } from "react";
import type { ButtonProps } from "@mui/material";
import { Button, Skeleton } from "@mui/material";
import { useSound } from "@/context/SoundContext";

const DefaultButton: React.FC<ButtonProps> = (props) => {
  const { isMuted } = useSound();
  const { onClick, disabled, sx, className, children, ...rest } = props;

  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clickLocked, setClickLocked] = useState(false);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/SocialIconHover.wav"));
    setClickSound(new Audio("/Audio/Button/SocialIconPressed.wav"));
    setIsLoading(false);
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound && !disabled && !clickLocked) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound && !disabled && !clickLocked) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (disabled || clickLocked) return;

    setClickLocked(true);
    try {
      if (onClick) {
        await Promise.resolve(onClick(event));
      }
    } finally {
      setClickLocked(false);
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
      disabled={disabled || clickLocked}
      sx={{ ...sx }}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
