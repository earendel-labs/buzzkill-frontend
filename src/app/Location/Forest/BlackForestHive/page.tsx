"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSound } from "@/context/SoundContext";
import HiveTopBar from "@/components/Layouts/GameLayout/HiveTopBar/HiveTopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HiveStatsPanel from "@/components/ControlPanels/HiveStatsPanel/HiveStatsPanel";
import BeeGrid from "@/components/ControlPanels/Hive/Bees/BeeGrid";
import { HiveInfo } from "@/types/HiveInfo";

const hiveInfo: HiveInfo = {
  queenBees: 2,
  workerBees: 42,
  healthValue: 100,
  productivityValue: 80,
  attackValue: 50,
  defenceValue: 22,
  status: "Active",
  location: "Hive 1",
  environment: "Forest",
};

const Forest: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const audio = new Audio("/Audio/Soundtrack/Forest/Forest.wav");
    audio.loop = true;
    audio.volume = 0.8;
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
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <HiveTopBar mapHeaderLabel="Black Forest Hive" />

          <Grid
            container
            spacing={2}
            sx={{ marginTop: "0.4rem", marginLeft: "2.5rem", gap: "0px 0px" }}
          >
            {/* Left Column - Hive Stats */}
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  padding: "0.8rem",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "2px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <HiveStatsPanel
                  hiveInfo={hiveInfo}
                  onStake={handleStake}
                  onRaid={handleRaid}
                />
              </Box>
            </Grid>

            {/* Second Column - Bee Grid */}
            <Grid
              item
              xs={9}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: "5px",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <BeeGrid />
            </Grid>
          </Grid>

          <BottomBar isAudioPanelVisible={false} />
        </Box>
      </GameLayout>
    </>
  );
};

const App: React.FC = () => {
  return <Forest />;
};

export default App;
