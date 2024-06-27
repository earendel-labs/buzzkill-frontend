import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useSound } from "@/context/SoundContext";

interface PrimaryButtonComponentProps {
  text: string;
  isActiveTab?: boolean;
  onClick: () => void;
}

const PrimaryButtonComponent: React.FC<PrimaryButtonComponentProps> = ({
  text,
  isActiveTab = false,
  onClick,
}) => {
  const theme = useTheme();
  const { isMuted } = useSound();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
    setIsPressed(true);
    onClick();
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const getImageSrc = () => {
    if (isActiveTab) {
      return "/Frames/Buttons/PrimaryButton/PrimaryButtonActiveTab.svg";
    }
    if (isPressed) {
      return "/Frames/Buttons/PrimaryButton/PrimaryButton.svg";
    }
    return isHovered
      ? "/Frames/Buttons/PrimaryButton/PrimaryButtonHover.svg"
      : "/Frames/Buttons/PrimaryButton/PrimaryButton.svg";
  };

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
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 16px",
        color: "white",
        fontWeight: "bold",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          whiteSpace: "nowrap",
          fontSize: "22px",
          WebkitTextStroke: `0.2px ${theme.palette.DarkOrange.main}`,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default PrimaryButtonComponent;
