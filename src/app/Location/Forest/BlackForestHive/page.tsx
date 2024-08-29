"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSound } from "@/context/SoundContext";
import HiveTopBar from "@/components/Layouts/GameLayout/HiveTopBar/HiveTopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HiveStatsPanel from "@/components/ControlPanels/HiveStatsPanel/HiveStatsPanel";
import BeeGrid from "@/components/ControlPanels/Hive/Bees/BeeGrid";

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

  const handleStake = () => {
    console.log("Stake button clicked");
  };

  const handleRaid = () => {
    console.log("Raid button clicked");
  };

  return (
    <>
      <GameLayout>
        {/* Background Layer */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            overflow: "hidden",
            background:
              "radial-gradient(73.87% 73.87% at 50% 50%, rgba(52, 119, 142, 0.2) 0%, rgba(36, 46, 78, 0.2) 100%), radial-gradient(130.26% 136.63% at 50.05% 47.94%, rgba(36, 46, 78, 0.85) 30%, rgba(18, 23, 39, 0.85) 57.5%, rgba(32, 41, 70, 0.85) 76.5%, rgba(33, 42, 72, 0.85) 85.81%)",
            opacity: 0.2,
            border: "1px solid #000000",
          }}
        >
          <Box
            component="img"
            src="/Maps/ForestMap.jpg"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Content Layer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            padding: "20px",
            height: "100vh", // Ensure content height doesn't exceed viewport
            overflow: "hidden", // Prevent content from overflowing
          }}
        >
          <HiveTopBar mapHeaderLabel="Black Forest Hive" />

          <Grid
            container
            spacing={0} // Reduce spacing to make the gap smaller
            sx={{ marginTop: "0.4rem", marginLeft: "4rem", gap: "0px 0px" }}
          >
            {/* Left Column - Hive Stats */}
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start", // Align to the top
              }}
            >
              <Box
                sx={{
                  padding: "0.8rem", // Reduce padding here to decrease the gap
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: to highlight the container
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", // Center content vertically within the Box
                  alignItems: "center", // Center content horizontally within the Box
                  width: "100%", // Ensure the Box takes up the full width of the Grid item
                  boxSizing: "border-box", // Include padding in the width calculation
                }}
              >
                <HiveStatsPanel
                  hiveDefense={22}
                  queenBees="2/3"
                  workerBees="42/55"
                  onStake={handleStake}
                  onRaid={handleRaid}
                />
              </Box>
            </Grid>

            {/* Second Column - Bee Grid */}
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: "5px", // Optional: Adjust this for fine-tuning the gap
                height: "100vh", // Ensure the BeeGrid doesn't overflow vertically
                overflow: "hidden", // Hide any overflow to maintain structure
              }}
            >
              <BeeGrid />
            </Grid>
          </Grid>

          <BottomBar />
        </Box>
      </GameLayout>
    </>
  );
};

const App: React.FC = () => {
  return <Forest />;
};

export default App;
