"use client";

import React from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13
import Box from "@mui/material/Box";
import MapHeader from "@/components/Decorators/MapHeader/MapHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";

const Forest: React.FC = () => {
  const router = useRouter();

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
      <MapHeader text="Whisperwood Valleys" />
      <WorldMapButton top="20%" left="87%" />
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Forest />;
};

export default App;
