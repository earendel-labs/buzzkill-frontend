"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { useSound } from "@/context/SoundContext"; // Import useSound context

interface ActionButtonsProps {
  onPlayClick?: () => void | Promise<void>;
  onUnstakeClick?: () => void;
  isPending?: boolean;
  isTransactionLoading?: boolean;
}

const StyledActionButton = styled(Button)(({ theme }) => ({
  width: "95%",
  margin: "16px auto 0",
  padding: "6px 12px",
  fontSize: "1.1rem",
}));

const PlaceholderBox = styled(Box)(({ theme }) => ({
  width: "95%",
  margin: "16px auto 0",
  height: "48px", // Matches the height of the button (including padding)
  display: "block", // Ensures it occupies space
}));

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPlayClick,
  onUnstakeClick,
  isPending = false,
  isTransactionLoading = false,
}) => {
  const { isMuted } = useSound(); // Access the sound context
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [buttonClickSound, setButtonClickSound] =
    useState<HTMLAudioElement | null>(null);
  const [playSound, setPlaySound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load the sounds
    setHoverSound(new Audio("/Audio/MapNavigation/MapNavigationHover.mp3"));
    setButtonClickSound(
      new Audio("/Audio/MapNavigation/MapNavigationPressed.mp3")
    );
    setPlaySound(new Audio("/Audio/MapResources/ResourcePressed.mp3"));
  }, []);

  // Handle the hover effect sound
  const handleHover = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0; // Ensure the sound starts fresh each time
      hoverSound.play();
    }
  };

  // Handle the button press sound for Play and Unstake
  const handlePlayClick = () => {
    if (!isMuted && playSound) {
      playSound.currentTime = 0; // Ensure the sound starts fresh each time
      playSound.play();
    }
    if (onPlayClick) onPlayClick();
  };

  const handleUnstakeClick = () => {
    if (!isMuted && buttonClickSound) {
      buttonClickSound.currentTime = 0; // Ensure the sound starts fresh each time
      buttonClickSound.play();
    }
    if (onUnstakeClick) onUnstakeClick();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      {onPlayClick && (
        <StyledActionButton
          className="blueButton"
          onClick={handlePlayClick}
          onMouseEnter={handleHover} // Play hover sound on mouse enter
          disabled={isPending || isTransactionLoading}
        >
          Play
        </StyledActionButton>
      )}
      {onUnstakeClick && (
        <StyledActionButton
          className="redButton"
          onClick={handleUnstakeClick}
          onMouseEnter={handleHover} // Play hover sound on mouse enter
          disabled={isPending || isTransactionLoading}
        >
          {isPending || isTransactionLoading ? "Unstaking..." : "Unstake"}
        </StyledActionButton>
      )}
    </Box>
  );
};

export default ActionButtons;
