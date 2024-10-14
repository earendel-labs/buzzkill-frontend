// Forest.tsx
"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13
import Box from "@mui/material/Box";
import { useSound } from "@/context/SoundContext";
import TopBar from "@/components/Layouts/GameLayout/TopBar/TopBar";
import CombinedResourceMarker from "@/components/MapNavigation/CombinedResourceMarker/CombinedResourceMarker";
import { ResourceType } from "@/types/ResourceType";
import BottomBar from "@/components/Layouts/GameLayout/BottomBar/BottomBar";
import HexagonSpinner from "@/components/Loaders/HexagonSpinner/HexagonSpinner";
import Image from "next/image";
import { Typography } from "@mui/material";

const Forest: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleClick = () => {
    console.log("Button clicked");
  };

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

  return (
    <GameLayout>
      {/* Conditionally render loading spinner */}
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

      {/* Background Image with Image Loading */}
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
        <Image
          src="/Maps/ForestMap.jpg"
          alt="Forest map background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          onLoad={() => setIsImageLoaded(true)} // Updated to use onLoad
          priority
        />
      </Box>

      <TopBar mapHeaderLabel="Whisperwood Valleys" />

      {/* CombinedResourceMarker Components */}
      <CombinedResourceMarker
        left="14%"
        top="40%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Cedar Hive"
        HiveDefenceValue="24"
        QueenBeesValue="2/3"
        WorkerBeesValue="40/55"
        primaryButtonClick={handleClick}
        secondaryButtonClick={handleClick}
      />
      <CombinedResourceMarker
        left="21%"
        top="21%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Black Forest Hive"
        HiveDefenceValue="21"
        QueenBeesValue="1/3"
        WorkerBeesValue="24/55"
        primaryButtonClick={handleClick}
        secondaryButtonLink="/Play/Location/Forest/BlackForestHive"
      />
      <CombinedResourceMarker
        left="30%"
        top="22%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Silveroak Hive"
        HiveDefenceValue="49"
        QueenBeesValue="3/3"
        WorkerBeesValue="44/55"
        primaryButtonClick={handleClick}
        secondaryButtonClick={handleClick}
      />
      <CombinedResourceMarker
        left="81%"
        top="24%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Darkroot Hive"
        HiveDefenceValue="23"
        QueenBeesValue="1/3"
        WorkerBeesValue="41/55"
        primaryButtonClick={handleClick}
        secondaryButtonClick={handleClick}
      />
      <CombinedResourceMarker
        left="83%"
        top="44%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Woodlands Hive"
        HiveDefenceValue="53"
        QueenBeesValue="3/3"
        WorkerBeesValue="47/55"
        primaryButtonClick={handleClick}
        secondaryButtonClick={handleClick}
      />
      <CombinedResourceMarker
        left="82%"
        top="70%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Sequoia Hive"
        HiveDefenceValue="13"
        QueenBeesValue="1/3"
        WorkerBeesValue="24/55"
        primaryButtonClick={handleClick}
        secondaryButtonClick={handleClick}
      />
      {/* Sap Markers */}
      <CombinedResourceMarker
        left="23%"
        top="62%"
        link="/resource-link"
        resourceType={ResourceType.Sap}
        contentValue="35%"
      />
      <CombinedResourceMarker
        left="29%"
        top="49%"
        link="/resource-link"
        resourceType={ResourceType.Sap}
        contentValue="75%"
      />
      <CombinedResourceMarker
        left="41%"
        top="29%"
        link="/resource-link"
        resourceType={ResourceType.Sap}
        contentValue="92%"
      />
      <CombinedResourceMarker
        left="75%"
        top="49%"
        link="/resource-link"
        resourceType={ResourceType.Sap}
        contentValue="25%"
      />
      {/* Pollen Markers */}
      <CombinedResourceMarker
        left="17%"
        top="70%"
        link="/resource-link"
        resourceType={ResourceType.Pollen}
        contentValue="58%"
      />
      <CombinedResourceMarker
        left="39%"
        top="42.22%"
        link="/resource-link"
        resourceType={ResourceType.Pollen}
        contentValue="12%"
      />
      <CombinedResourceMarker
        left="72%"
        top="60%"
        link="/resource-link"
        resourceType={ResourceType.Pollen}
        contentValue="37%"
      />
      {/* Nectar Markers */}
      <CombinedResourceMarker
        left="47%"
        top="42%"
        link="/resource-link"
        resourceType={ResourceType.Nectar}
        contentValue="12%"
      />
      <CombinedResourceMarker
        left="50%"
        top="53%"
        link="/resource-link"
        resourceType={ResourceType.Nectar}
        contentValue="58%"
      />
      <CombinedResourceMarker
        left="66%"
        top="72%"
        link="/resource-link"
        resourceType={ResourceType.Nectar}
        contentValue="37%"
      />
      <CombinedResourceMarker
        left="62%"
        top="64%"
        link="/resource-link"
        resourceType={ResourceType.Nectar}
        contentValue="93%"
      />
      <BottomBar />
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Forest />;
};

export default App;
