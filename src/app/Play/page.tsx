"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import Box from "@mui/material/Box";
import CombinedLocationMarker from "@/components/MapNavigation/CombinedLocationMarker/CombinedLocationMarker";
import { useSound } from "@/context/SoundContext";
import TopBar from "@/components/Layouts/GameLayout/TopBar/TopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import { CircularProgress, Typography } from "@mui/material";

const Play: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect unauthenticated users
    }
  }, [status, router]);

  // Initialize music
  useEffect(() => {
    const audio = new Audio("/Audio/Soundtrack/WorldMap/MapMusic.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    setMusic(audio);

    return () => {
      audio.pause();
    };
  }, []);

  // Handle music playback based on mute states
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

  // Handle user interaction for music playback
  const handleUserInteraction = () => {
    if (music && !isMusicMuted && !isMuted) {
      music.play().catch((error) => {
        console.log("Music play error:", error);
      });
    }
  };

  // Add event listeners for user interaction
  useEffect(() => {
    if (music) {
      window.addEventListener("click", handleUserInteraction);
      window.addEventListener("keydown", handleUserInteraction);
      window.addEventListener("mousemove", handleUserInteraction);

      return () => {
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("keydown", handleUserInteraction);
        window.removeEventListener("mousemove", handleUserInteraction);
      };
    }
  }, [music, isMusicMuted, isMuted]);

  const navigate = (link: string) => {
    router.push(link);
  };

  // Conditional rendering after all hooks
  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <CircularProgress />
        <Typography className="body1" padding="16px 0px">
          Loading World...
        </Typography>
      </Box>
    );
  }

  if (status === "unauthenticated") {
    return null; // Redirecting, so render nothing
  }

  // Main content when authenticated
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
