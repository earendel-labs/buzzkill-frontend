"use client";

import React, { useEffect, useState } from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13
import Box from "@mui/material/Box";
import { useSound } from "@/context/SoundContext";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import TopBar from "@/components/Layouts/GameLayout/TopBar/TopBar";
import SmallToolTip from "@/components/ToolTips/Small/SmallToolTip";
import CombinedResourceMarker from "@/components/MapNavigation/CombinedResourceMarker/CombinedResourceMarker";
import { ResourceType } from "@/types/ResourceType";
import LargeToolTip from "@/components/ToolTips/Large/LargeToolTip";
import HiveHoverOver from "@/components/ToolTips/HiveHoverOver/HiveHoverOver";
import LargeTallToolTip from "@/components/ToolTips/LargeTall/LargeTallToolTip";
import HivePressed from "@/components/ToolTips/HivePressed/HivePressed";
import ResourcePressed from "@/components/ToolTips/ResourcePressed/ResourcePressed";

const Forest: React.FC = () => {
  const { isMuted, isMusicMuted } = useSound();
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };
  const handleRaidClick = () => {
    console.log("Raid button clicked");
  };

  const handleEnterClick = () => {
    console.log("Enter button clicked");
  };

  const handleForageClick = () => {
    console.log("Forage button clicked");
  };

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
      <TopBar mapHeaderLabel="Whisperwood Valleys" />
      {/* Hives */}
      <CombinedResourceMarker
        left="7%"
        top="36%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Cedar Hive"
        HiveDefenceValue="24"
        QueenBeesValue="2/3"
        WorkerBeesValue="40/55"
        primaryButtonClick={() => console.log("Primary button clicked")}
        secondaryButtonClick={() => console.log("Secondary button clicked")}
      />

      <CombinedResourceMarker
        left="88%"
        top="42.44%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Woodlands Hive"
        HiveDefenceValue="53"
        QueenBeesValue="3/3"
        WorkerBeesValue="47/55"
        primaryButtonClick={() => console.log("Primary button clicked")}
        secondaryButtonClick={() => console.log("Secondary button clicked")}
      />

      <CombinedResourceMarker
        left="85%"
        top="70%"
        link="/resource-link"
        resourceType={ResourceType.Hive}
        hiveName="Sequoia Hive"
        HiveDefenceValue="13"
        QueenBeesValue="1/3"
        WorkerBeesValue="24/55"
        primaryButtonClick={() => console.log("Primary button clicked")}
        secondaryButtonClick={() => console.log("Secondary button clicked")}
      />

      {/* Sap */}
      <CombinedResourceMarker
        left="25%"
        top="48.89%"
        link="/resource-link"
        resourceType={ResourceType.Sap}
        contentValue="75%"
      />
      <CombinedResourceMarker
        left="18%"
        top="67.78%"
        link="/resource-link"
        resourceType={ResourceType.Sap}
        contentValue="35%"
      />
      <CombinedResourceMarker
        left="83%"
        top="50%"
        link="/resource-link"
        resourceType={ResourceType.Sap}
        contentValue="25%"
      />

      {/* Pollen */}
      <CombinedResourceMarker
        left="35%"
        top="42.22%"
        link="/resource-link"
        resourceType={ResourceType.Pollen}
        contentValue="12%"
      />
      <CombinedResourceMarker
        left="8%"
        top="78.89%"
        link="/resource-link"
        resourceType={ResourceType.Pollen}
        contentValue="58%"
      />
      <CombinedResourceMarker
        left="75%"
        top="64.44%"
        link="/resource-link"
        resourceType={ResourceType.Pollen}
        contentValue="37%"
      />

      {/* Nectar */}
      <CombinedResourceMarker
        left="45.39%"
        top="42.22%"
        link="/resource-link"
        resourceType={ResourceType.Nectar}
        contentValue="12%"
      />
      <CombinedResourceMarker
        left="50.69%"
        top="53.33%"
        link="/resource-link"
        resourceType={ResourceType.Nectar}
        contentValue="58%"
      />
      <CombinedResourceMarker
        left="66.39%"
        top="75.56%"
        link="/resource-link"
        resourceType={ResourceType.Nectar}
        contentValue="37%"
      />
      <AudioPanel />
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Forest />;
};

export default App;
