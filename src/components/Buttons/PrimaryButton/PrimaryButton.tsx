import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useSound } from "@/context/SoundContext";

interface PrimaryButton {
  text: string;
  isActiveTab?: boolean;
  onClick: () => void;
}

const PrimaryButton: React.FC<PrimaryButton> = ({
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
        width: "6.5625rem", // 105px / 16px
        height: "2.1875rem", // 35px / 16px
        padding: "0.3125rem 1.875rem", // 5px / 16px for padding and 30px / 16px for sides
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",

        color: "white",
        fontWeight: "bold",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          whiteSpace: "nowrap",
          fontWeight: "1000",
          fontSize: "1rem !important", // 18px / 16px
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default PrimaryButton;
