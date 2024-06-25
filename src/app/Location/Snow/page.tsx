"use client";

import React from "react";
import GameLayout from "@/components/Layouts/GameLayout/GameLayout";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import MapHeader from "@/components/MapNavigation/MapHeader/MapHeader";

const Snow: React.FC = () => {
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
      <MapHeader text="Mistcloak Tundra" />
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Snow />;
};

export default App;
