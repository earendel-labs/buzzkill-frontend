// src/components/Buttons/PrimaryButton/PrimaryButton.tsx
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Skeleton, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { SxProps, Theme } from "@mui/system";
import { useSound } from "@/context/SoundContext";

interface PrimaryButtonProps {
  text: string;
  mobileText?: string;
  icon?: React.ReactNode;
  isActiveTab?: boolean;
  onClick: () => void;
  scale?: number;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  mobileText,
  icon,
  onClick,
  scale = 1,
  disabled = false,
  sx = {},
  ...props
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use mobileText on small screens; if empty, we’re showing icon-only.
  const buttonLabel = isSmallScreen ? mobileText : text;

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
        // If no label, reduce horizontal padding so the icon is centered
        padding: isSmallScreen && !buttonLabel ? "8px" : "8px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // Remove gap if there’s no label
        gap: buttonLabel ? "8px" : 0,
        ...sx,
      }}
      {...props}
    >
      {buttonLabel ? (
        <>
          {icon && (
            <span style={{ display: "flex", alignItems: "center" }}>
              {icon}
            </span>
          )}
          <Typography
            variant="h5"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              fontWeight: 700,
              fontSize: isSmallScreen ? "0.9rem" : `${scale}rem`,
              textShadow:
                "1px 1px 0 #68341B, -1px -1px 0 #68341B, -1px 1px 0 #68341B, 1px -1px 0 #68341B",
            }}
          >
            {buttonLabel}
          </Typography>
        </>
      ) : (
        // If there is no label, render only the icon.
        icon
      )}
    </Button>
  );
};

export default PrimaryButton;
