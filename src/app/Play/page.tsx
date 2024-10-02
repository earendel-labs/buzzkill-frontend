"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession to handle session status
import { useRouter } from "next/navigation";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import Box from "@mui/material/Box";
import CombinedLocationMarker from "@/components/MapNavigation/CombinedLocationMarker/CombinedLocationMarker";
import { useSound } from "@/context/SoundContext";
import TopBar from "@/components/Layouts/GameLayout/TopBar/TopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";

const Play: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Track component mount
  const { data: session, status } = useSession(); // Use session hook
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle music loading and playback
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
      window.addEventListener("click", handleUserInteraction);
      window.addEventListener("keydown", handleUserInteraction);
      window.addEventListener("mousemove", handleUserInteraction);

      return () => {
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("keydown", handleUserInteraction);
        window.removeEventListener("mousemove", handleUserInteraction);
      };
    }
  }, [music, isMusicMuted, isMuted, isMounted]);

  const navigate = (link: string) => {
    router.push(link);
  };

  // Redirect to home if not authenticated
  useEffect(() => {
    console.log("Session status:", status, "Session data:", session);
  
    if (status === "unauthenticated") {
      router.push("/");  // Only redirect if status is explicitly unauthenticated
    }
  }, [status, router]);
  // Render nothing until component is mounted
  if (!isMounted || status === "loading") {
    return null; // Optionally, you can show a loading spinner here
  }

  return (
    <GameLayout>
      {/* Background Video */}
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

      {/* Main Game Content */}
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

export default Play;
