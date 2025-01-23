import React, { useState, useEffect } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import CircleIconButton from "@/components/Buttons/CircleIcon/CircleIconButton";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/app/utils/logger";

const MusicControlButton: React.FC = () => {
  const { isMuted, isMusicMuted, toggleMusicMute } = useSound();
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleToggleMusic = () => {
    toggleMusicMute();
    if (!isMuted && !isMusicMuted && clickSound) {
      // Play sound only if we are unmuting music
      clickSound.currentTime = 0;
      clickSound.play().catch((error) => {
        logger.log("Click sound play error:", error);
      });
    }
  };

  return (
    <CircleIconButton
      icon={
        isMusicMuted ? (
          <MusicOffIcon sx={{ color: "white" }} />
        ) : (
          <MusicNoteIcon sx={{ color: "white" }} />
        )
      }
      onClick={handleToggleMusic}
      size="small"
      disableClickSound={true}
    />
  );
};

export default MusicControlButton;
