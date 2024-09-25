"use client"; // Add this line at the very top

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import CombinedLocationMarker from "@/components/MapNavigation/CombinedLocationMarker/CombinedLocationMarker";
import { useSound } from "@/context/SoundContext";
import TopBar from "@/components/Layouts/GameLayout/TopBar/TopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";

const Play: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const [isMounted, setIsMounted] = useState(false); // New state variable
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts
  }, []);

  useEffect(() => {
    if (isMounted) {
      const audio = new Audio("/Audio/Soundtrack/WorldMap/MapMusic.mp3");
      audio.loop = true;
      audio.volume = 0.6;
      setMusic(audio);

      return () => {
        audio.pause();
      };
    }
  }, [isMounted]);

  useEffect(() => {
    if (music) {
      if (isMusicMuted || isMuted) {
        music.pause();
      } else {
        music.play().catch((error) => {
          console.log("Music play error:", error);
        });
      }
    }
  }, [isMusicMuted, isMuted, music]);

  const handleUserInteraction = () => {
    if (music && !isMusicMuted && !isMuted) {
      music.play().catch((error) => {
        console.log("Music play error:", error);
      });
    }
  };

  useEffect(() => {
    if (isMounted) {
      // Add event listeners for user interaction
      window.addEventListener("click", handleUserInteraction);
      window.addEventListener("keydown", handleUserInteraction);
      window.addEventListener("mousemove", handleUserInteraction);

      return () => {
        // Cleanup event listeners on unmount
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("keydown", handleUserInteraction);
        window.removeEventListener("mousemove", handleUserInteraction);
      };
    }
  }, [music, isMusicMuted, isMuted, isMounted]);

  const navigate = (link: string) => {
    router.push(link);
  };

  if (!isMounted) {
    return null; // Render nothing until the component is mounted
  }

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
      <TopBar mapHeaderLabel="World Map" showWorldMapButton={false} />
      <CombinedLocationMarker
        left="10%"
        top="50%"
        link="/Location/Beach"
        text="TidalFlame Beaches"
        navigate={navigate}
      />
      <CombinedLocationMarker
        left="30%"
        top="60%"
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
      <BottomBar />
    </GameLayout>
  );
};

export default Play; // Simplify the export
