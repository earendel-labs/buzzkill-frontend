import React, { useState, useEffect } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import CloseIcon from "@mui/icons-material/Close";
import CircleIconButton from "@/components/Buttons/CircleIcon/CircleIconButton";
import { useSound } from "@/context/SoundContext";
import { logger } from "@/app/utils/logger";
interface ModalCloseButtonButtonProps {
  isClose?: boolean;
  onClick?: () => void;
}

const ModalCloseButton: React.FC<ModalCloseButtonButtonProps> = ({
  isClose = false,
  onClick,
}) => {
  const { isMuted, isMusicMuted, toggleMusicMute } = useSound();
  const [clickSound, setClickSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setClickSound(new Audio("/Audio/Button/WoodenClick.wav"));
  }, []);

  const handleToggleMusic = () => {
    if (isClose && onClick) {
      onClick();
    } else {
      toggleMusicMute();
      if (!isMuted && !isMusicMuted && clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch((error) => {
          logger.log("Click sound play error:", error);
        });
      }
    }
  };

  return (
    <CircleIconButton
      icon={
        isClose ? (
          <CloseIcon sx={{ color: "white" }} />
        ) : isMusicMuted ? (
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

export default ModalCloseButton;
