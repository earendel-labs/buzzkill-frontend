"use client";

import React from "react";
import GameLayout from "@/components/GameLayout/GameLayout";
import Box from "@mui/material/Box";
import MapHeader from "@/components/Decorators/MapHeader/MapHeader";
import MapMarker from "@/components/MapMarker/MapMarker";

const Play: React.FC = () => {
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
      <MapHeader text="World Map" />
      <MapMarker left="20%" top="30%" />
      <MapMarker left="50%" top="50%" />
      <MapMarker left="70%" top="20%" />
    </GameLayout>
  );
};

const App: React.FC = () => {
  return <Play />;
};

export default App;
