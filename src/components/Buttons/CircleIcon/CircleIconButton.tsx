import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";
import { Skeleton } from "@mui/material";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/utils/logger";

interface CircleIconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  backgroundColor?: string;
  size?: "small" | "medium" | "large" | "extraLarge";
  sx?: SxProps<Theme>;
  disableClickSound?: boolean;
}

const sizeMap = {
  small: { button: "60px", icon: "28px" },
  medium: { button: "70px", icon: "34px" },
  large: { button: "90px", icon: "44px" },
  extraLarge: { button: "110px", icon: "54px" },
};

const CircleIconButton: React.FC<CircleIconButtonProps> = ({
  icon,
  onClick,
  backgroundColor,
  size = "medium",
  sx,
  disableClickSound = false,
}) => {
  const theme = useTheme();
  const { isMuted } = useSound();
  const { button: buttonSize, icon: iconSize } = sizeMap[size];
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const images = [
      "/Frames/Buttons/CircleButton/circle-frame.svg",
      "/Frames/Buttons/CircleButton/circle-frame-hover.svg",
    ];

    const preloadImages = images.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });

    Promise.all(preloadImages)
      .then(() => {
        setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
        setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
        setIsLoading(false);
      })
      .catch((err) => logger.log("Error loading images or sounds:", err));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound) {
      hoverSound.play();
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound && !disableClickSound) {
      clickSound.play();
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          position: "absolute",
          width: buttonSize,
          height: buttonSize,
          ...sx,
        }}
      >
        <Skeleton
          variant="circular"
          width={buttonSize}
          height={buttonSize}
          sx={{
            backgroundColor: "#242E4E",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    );
  }

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
        position: "relative",
        ...sx,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          position: "absolute",
          width: buttonSize,
          height: buttonSize,
          backgroundImage: `url('${
            isHovering
              ? "/Frames/Buttons/CircleButton/circle-frame-hover.svg"
              : "/Frames/Buttons/CircleButton/circle-frame.svg"
          }')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "transparent",
        }}
      />
      <IconButton
        color="inherit"
        aria-label="icon-button"
        sx={{
          width: `calc(${buttonSize} * 0.85)`,
          height: `calc(${buttonSize} * 0.85)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: backgroundColor || theme.palette.GoldFaded.main,
          position: "relative",
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
