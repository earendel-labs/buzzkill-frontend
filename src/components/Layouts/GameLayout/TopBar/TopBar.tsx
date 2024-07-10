// src/components/Layouts/GameLayout/TopBar/TopBar.tsx
import React from "react";
import { Box } from "@mui/material";
import MapHeader from "@/components/MapNavigation/MapHeader/MapHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import UserResourceBar from "@/components/UserResources/UserResources";

interface TopBarProps {
  showWorldMapButton?: boolean;
  mapHeaderLabel: string;
}

const TopBar: React.FC<TopBarProps> = ({
  showWorldMapButton = true,
  mapHeaderLabel,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "30px 50px 0px 20px",
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
        <MapHeader text={mapHeaderLabel} />
      </Box>
      <Box
        sx={{
          display: "flex",

          justifyContent: "flex-end",
        }}
      >
        {showWorldMapButton ? (
          <WorldMapButton />
        ) : (
          <Box sx={{ width: "120px", height: "120px" }} />
        )}
      </Box>
    </Box>
  );
};

export default TopBar;
