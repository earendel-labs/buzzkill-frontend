"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import MapHeader from "@/components/MapNavigation/MapHeader/MapHeader";
import CombinedLocationMarker from "@/components/MapNavigation/CombinedLocationMarker/page";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import { useSound } from "@/context/SoundContext";
import UserResourceBar from "@/components/UserResources/UserResources";

const Play: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const audio = new Audio("/Audio/Soundtrack/WorldMap/MapMusic.mp3");
    audio.loop = true;
    audio.volume = 0.6;
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
          component="video"
          src="/Animations/map-video.mp4"
          autoPlay
          loop
          muted
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
      <MapHeader text="World Map" />
      <CombinedLocationMarker
        left="20%"
        top="70%"
        link="/Location/Beach"
        text="TidalFlame Beaches"
        navigate={navigate}
      />
      <CombinedLocationMarker
        left="60%"
        top="70%"
        link="/Location/Forest"
        text="Whisperwood Valleys"
        navigate={navigate}
      />
      <CombinedLocationMarker
        left="63%"
        top="35%"
        link="/Location/Snow"
        text="Mistcloak Tundra"
        navigate={navigate}
      />
      <AudioPanel />  
      <UserResourceBar />
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Play />;
};

export default App;
