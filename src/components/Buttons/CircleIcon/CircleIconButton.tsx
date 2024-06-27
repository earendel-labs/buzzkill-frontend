import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";
import { useSound } from "@/context/SoundContext";

interface CircleIconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  backgroundColor?: string;
  size?: "small" | "medium" | "large" | "extraLarge";
  sx?: SxProps<Theme>;
  disableClickSound?: boolean; // Add this prop
}

const sizeMap = {
  small: { button: "60px", icon: "28px" },
  medium: { button: "70px", icon: "34px" }, // Default size
  large: { button: "90px", icon: "44px" },
  extraLarge: { button: "110px", icon: "54px" },
};

const CircleIconButton: React.FC<CircleIconButtonProps> = ({
  icon,
  onClick,
  backgroundColor,
  size = "medium", // Default to "medium"
  sx,
  disableClickSound = false, // Default to false
}) => {
  const theme = useTheme();
  const { isMuted } = useSound();
  const { button: buttonSize, icon: iconSize } = sizeMap[size];
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [disableHoverSound, setDisableHoverSound] = useState(false);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && !disableHoverSound && hoverSound) {
      hoverSound.play();
    }
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound && !disableClickSound) {
      clickSound.play();
    }
    setDisableHoverSound(true);
    setTimeout(() => {
      setDisableHoverSound(false);
    }, 300); // Adjust this delay as needed
  };

  return (
    <Box
      sx={{
        zIndex: 1000,
        width: buttonSize,
        height: buttonSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        ...sx, // Apply custom styles passed through sx prop
      }}
      onMouseEnter={handleMouseEnter}
    >
      <Box
        sx={{
          position: "absolute",
          width: buttonSize,
          height: buttonSize,
          backgroundImage: `url('/Frames/Buttons/CircleButton/circle-frame.svg')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "transparent",
          transition: "width 0.2s ease-in-out, height 0.2s ease-in-out", // Smooth transition
          "&:hover": {
            width: `calc(${buttonSize} * 1.1)`,
            height: `calc(${buttonSize} * 1.1)`,
            backgroundImage: `url('/Frames/Buttons/CircleButton/circle-frame-hover.svg')`,
          },
        }}
      />
      <IconButton
        color="inherit"
        aria-label="icon-button"
        sx={{
          width: `calc(${buttonSize} * 0.714)`,
          height: `calc(${buttonSize} * 0.714)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: backgroundColor || theme.palette.GoldFaded.main,
        }}
        onClick={() => {
          handleMouseDown();
          onClick();
        }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          sx: { fontSize: iconSize, color: "white" },
        })}
      </IconButton>
    </Box>
  );
};

export default CircleIconButton;
