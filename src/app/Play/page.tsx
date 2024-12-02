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
import { Typography } from "@mui/material";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import Image from "next/image";
const Play: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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
  if (status === "loading" && !isImageLoaded) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" 
        flexDirection="column"
        sx={{
          backgroundImage: (theme) =>
            theme.palette.customBackgrounds.boxGradient,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <HexagonSpinner />
        <Typography className="body1" padding="24px 0px">
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
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <Image
          src="/Maps/BuzzkillMap.jpg"
          alt="Background map image"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={() => setIsImageLoaded(true)} // Updated to use onLoad
          priority
        />
      </Box>

      {/* Main Game Content */}
      <TopBar mapHeaderLabel="World Map" showWorldMapButton={false} />
      <CombinedLocationMarker
        left="25%"
        top="55%"
        link="Play/Location/Beach"
        text="TidalFlame Beaches"
        navigate={navigate}
      />
      <CombinedLocationMarker
        left="55%"
        top="50%"
        link="Play/Location/WhisperwoodValleys"
        text="Whisperwood Valleys"
        navigate={navigate}
      />
      <CombinedLocationMarker
        left="63%"
        top="35%"
        link="Play/Location/Snow"
        text="Mistcloak Tundra"
        navigate={navigate}
      />
      <BottomBar />
    </GameLayout>
  );
};

export default Play;
