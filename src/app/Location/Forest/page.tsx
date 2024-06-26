"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13
import Box from "@mui/material/Box";
import MapHeader from "@/components/MapNavigation/MapHeader/MapHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import { useSound } from "@/context/SoundContext";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";

const Forest: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const audio = new Audio("/Audio/Soundtrack/Forest/Forest.wav");
    audio.loop = true;
    audio.volume = 0.8; // Set the volume to 80%
    setMusic(audio);

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (music) {
      if (isMusicMuted || isMuted) {
        music.pause();
      } else {
        music.play();
      }
    }
  }, [isMusicMuted, isMuted, music]);

  const navigate = (link: string) => {
    router.push(link);
  };

  return (
    <GameLayout>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <Box
          component="img"
          src="/Maps/ForestMap.png"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      </Box>
      <MapHeader text="Whisperwood Valleys" />
      <WorldMapButton top="180px" right="30px" />
      <AudioPanel />
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Forest />;
};

export default App;
