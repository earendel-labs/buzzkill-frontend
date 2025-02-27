import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useSound } from "@/context/SoundContext";
import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { SxProps, Theme } from "@mui/system";

interface PrimaryButtonProps {
  text: string;
  isActiveTab?: boolean;
  onClick: () => void;
  scale?: number;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
    setIsLoading(false);
    setHoverSound(new Audio("/Audio/Button/WoodenHover.wav"));
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
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
    <Button
      className="figmaButton"
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
        padding: "8px 20px",
        ...sx,
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          whiteSpace: "nowrap",
          fontWeight: "700",
          fontSize: `${scale * 1}rem`,
          textShadow:
            "1px 1px 0 #68341B, -1px -1px 0 #68341B, -1px 1px 0 #68341B, 1px -1px 0 #68341B", // Border effect
          ...sx, // Ensure Typography also respects passed sx
        }}
        {...props}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default PrimaryButton;
