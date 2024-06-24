import React, { useState, useEffect } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CircleIconButton from "@/components/Buttons/CircleIcon/CircleIconButton";
import { useSound } from "@/context/SoundContext";

const VolumeControlButton: React.FC = () => {
  const { isMuted, toggleMute } = useSound();
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleToggleMute = () => {
    if (isMuted && clickSound) {
      // Play sound only if we are unmuting
      clickSound.play();
    }
    toggleMute();
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
      sx={{ bottom: "5vh", right: "3vw", transform: "translate(50%, 50%)" }}
      disableClickSound={true} // Disable click sound for CircleIconButton
    />
  );
};

export default VolumeControlButton;
