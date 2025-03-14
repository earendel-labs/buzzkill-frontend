import React, { useState, useEffect } from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { useSound } from "@/context/SoundContext";

const CustomSvgIcon = styled(SvgIcon)({
  width: "35px",
  height: "35px",
  transition: "fill 0.3s, transform 0.1s",

  "&:hover path": {
    fill: "#0091AC", // Hover color
  },
  "&:active path": {
    transform: "scale(0.95)",
    transformOrigin: "center",
  },
});

interface SocialIconProps extends SvgIconProps {
  Component: React.ElementType;
  href: string;
  target?: string;
  rel?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  Component,
  href,
  target = "_blank", // Defaults to opening in a new tab
  rel = "noopener noreferrer", // Security feature
  ...props
}) => {
  const theme = useTheme();
  const { isMuted } = useSound();
  const [hoverSound, setHoverSound] = useState<HTMLAudioElement | null>(null);
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHoverSound(new Audio("/Audio/Button/SocialIconHover.wav"));
    setClickSound(new Audio("/Audio/Button/SocialIconPressed.wav"));
  }, []);

  const handleMouseEnter = () => {
    if (!isMuted && hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  };

  const handleMouseDown = () => {
    if (!isMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={{ display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
    >
      <CustomSvgIcon {...props} viewBox="0 0 35 35">
        <Component />
      </CustomSvgIcon>
    </a>
  );
};

export default SocialIcon;
