import React, { createContext, useState, useContext, ReactNode } from "react";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  isMusicMuted: boolean;
  toggleMusicMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};

export const SoundProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleMusicMute = () => {
    setIsMusicMuted((prev) => !prev);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, isMusicMuted, toggleMusicMute }}>
      {children}
    </SoundContext.Provider>
  );
};
