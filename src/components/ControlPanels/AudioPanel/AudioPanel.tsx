import React from "react";
import Box from "@mui/material/Box";
import VolumeControlButton from "@/components/Buttons/VolumeControl/VolumeControlButton";
import MusicControlButton from "@/components/Buttons/MusicControl/MusicControlButton";

const AudioPanel: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { sm: "0.5rem", md: "1rem", lg: "20px" },
        right: { sm: "0.5rem", md: "1rem", lg: "20px" },
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <MusicControlButton />
      </Box>
      <Box sx={{ position: "relative" }}>
        <VolumeControlButton />
      </Box>
    </Box>
  );
};

export default AudioPanel;
