import React, { useState, useEffect } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CircleIconButton from "@/components/Buttons/CircleIcon/CircleIconButton";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/utils/logger";

const VolumeControlButton: React.FC = () => {
  const { isMuted, toggleMute } = useSound();
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleToggleMute = () => {
    toggleMute();
    if (!isMuted && clickSound) {
      // Play sound only if we are unmuting
      clickSound.currentTime = 0;
      clickSound.play().catch((error) => {
        logger.log("Click sound play error:", error);
      });
    }
  };

  return (
    <CircleIconButton
      icon={
        isMuted ? (
          <VolumeOffIcon sx={{ color: "white" }} />
        ) : (
          <VolumeUpIcon sx={{ color: "white" }} />
        )
      }
      onClick={handleToggleMute}
      size="small"
      disableClickSound={true}
    />
  );
};

export default VolumeControlButton;
