import React, { useState, useEffect } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import CircleIconButton from "@/components/Buttons/CircleIcon/CircleIconButton";
import { useSound } from "@/context/SoundContext";

const MusicControlButton: React.FC = () => {
  const { isMuted, isMusicMuted, toggleMusicMute } = useSound();
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleToggleMusic = () => {
    if (!isMuted) {
      toggleMusicMute();
      if (isMusicMuted && clickSound) {
        // Play sound only if we are unmuting
        clickSound.play();
      }
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
      sx={{ bottom: "5vh", right: "7.3vw", transform: "translate(50%, 50%)" }}
      disableClickSound={true} // Disable click sound for CircleIconButton
    />
  );
};

export default MusicControlButton;
