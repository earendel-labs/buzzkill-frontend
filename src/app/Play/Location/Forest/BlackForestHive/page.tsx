"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material"; // Added import for Typography
import { useSound } from "@/context/SoundContext";
import HiveTopBar from "@/components/Layouts/GameLayout/HiveTopBar/HiveTopBar";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HiveStatsPanel from "@/components/ControlPanels/Hive/HiveStatsPanel/HiveStatsPanel";
import BeeGrid from "@/components/ControlPanels/Hive/Bees/BeeGrid";
import { useWriteHiveStakingStake } from "@/hooks/HiveStaking";
import Image from "next/image";
import { HiveInfo } from "@/types/HiveInfo";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import { useUserContext } from "@/context/UserContext"; // Import your UserContext

// Hive and Environment Info for the Black Forest Hive in Whisperwood Valleys
const hiveInfo: HiveInfo = {
  queenBees: 1,
  workerBees: 24,
  healthValue: 100,
  productivityValue: 80,
  attackValue: 50,
  defenceValue: 21,
  status: "Active",
  location: "Black Forest Hive",
  environment: "Whisperwood Valleys",
};

const Forest: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [environmentData, setEnvironmentData] = useState<any>(null);
  const { activeBee, address, checkAndPromptApproval } = useUserContext(); 
  // Staking Hook (fix: using writeContractAsync)
  const { writeContractAsync: stakeNFT } = useWriteHiveStakingStake();

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

  useEffect(() => {
    // Fetch environment data for Whisperwood Valleys
    fetch("/Data/Maps/Forest/whisperwood-valleys.json")
      .then((response) => response.json())
      .then((data) => setEnvironmentData(data))
      .catch((error) =>
        console.error("Failed to load environment data:", error)
      );
  }, []);

  const handleStake = async () => {

    try {
      // Ensure the user has selected an activeBee
      if (activeBee === null) {
        console.log("No active bee selected for staking");
        return;
      }

      // Ensure the user has approved the staking contract
      const isApproved = await checkAndPromptApproval();
      if (!isApproved) {
        console.log("User did not approve the staking contract.");
        return;
      }

      // Example hiveId and environmentId - you will get these from the environment or UI
      const hiveId = BigInt(2); // Example hive ID, replace with actual
      const environmentId = BigInt(2); // Example environment ID, replace with actual
      const tokenId = BigInt(activeBee); // Convert activeBee to BigInt

      console.log(
        `Staking tokenId: ${tokenId}, environmentId: ${environmentId}, hiveId: ${hiveId}`
      );

      // Call the staking contract function
      await stakeNFT({
        args: [tokenId, environmentId, hiveId], // Pass tokenId, environmentId, and hiveId
      });

      console.log("Staking successful");
    } catch (error) {
      console.error("Failed to stake NFT:", error);
    }
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
          {!isImageLoaded && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
              flexDirection="column"
              position="fixed"
              width="100vw"
              bgcolor="background.default"
              zIndex={1300}
            >
              <HexagonSpinner />
              <Typography className="body1" padding="24px 0px">
                Loading World...
              </Typography>
            </Box>
          )}
          <Image
            src={
              environmentData?.environment?.backgroundImage ||
              "/Maps/ForestMap.jpg"
            }
            alt="Forest map background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            onLoad={() => setIsImageLoaded(true)}
            priority
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
          <HiveTopBar mapHeaderLabel={hiveInfo.location} />

          <Grid
            container
            spacing={1}
            sx={{ marginTop: "0.4rem", marginLeft: "2.5rem", gap: "0px 0px" }}
          >
            {/* Left Column - Hive Stats */}
            <Grid
              item
              xs={3}
              xxl={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  padding: "0.8rem",
                  borderRadius: "2px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              xs={12}
              sm={9}
              xxl={9}
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
