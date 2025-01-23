"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { logger } from "@/app/utils/logger";
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedIsMuted = localStorage.getItem("isMuted");
    const savedIsMusicMuted = localStorage.getItem("isMusicMuted");
    logger.log("Loaded isMuted from localStorage:", savedIsMuted);
    logger.log("Loaded isMusicMuted from localStorage:", savedIsMusicMuted);
    if (savedIsMuted !== null) setIsMuted(JSON.parse(savedIsMuted));
    if (savedIsMusicMuted !== null)
      setIsMusicMuted(JSON.parse(savedIsMusicMuted));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      logger.log("Saving isMuted to localStorage:", isMuted);
      localStorage.setItem("isMuted", JSON.stringify(isMuted));
    }
  }, [isMuted, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      logger.log("Saving isMusicMuted to localStorage:", isMusicMuted);
      localStorage.setItem("isMusicMuted", JSON.stringify(isMusicMuted));
    }
  }, [isMusicMuted, isInitialized]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleMusicMute = () => {
    setIsMusicMuted((prev) => !prev);
  };

  return (
    <SoundContext.Provider
      value={{ isMuted, toggleMute, isMusicMuted, toggleMusicMute }}
    >
      {children}
    </SoundContext.Provider>
  );
};
