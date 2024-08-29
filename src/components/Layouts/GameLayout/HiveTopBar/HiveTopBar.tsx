// src/components/Layouts/GameLayout/TopBar/TopBar.tsx
import React from "react";
import { Box } from "@mui/material";
import LocationHeader from "@/components/MapNavigation/LocationHeader/LocationHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import UserResourceBar from "@/components/UserResources/UserResources";
import HiveMapButton from "@/components/MapNavigation/HiveMapButton/HiveMapButton";

interface HiveTopBarProps {
  mapHeaderLabel: string;
}

const HiveTopBar: React.FC<HiveTopBarProps> = ({ mapHeaderLabel }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0px 50px 0px 20px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginRight: "auto",
        }}
      >
        <UserResourceBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <LocationHeader
          text={mapHeaderLabel}
          position="relative"
          isHeader={true}
        />
      </Box>
      <Box
        sx={{
          display: "flex",

          justifyContent: "flex-end",
        }}
      >
        <HiveMapButton />
        <WorldMapButton />
      </Box>
    </Box>
  );
};

export default HiveTopBar;
