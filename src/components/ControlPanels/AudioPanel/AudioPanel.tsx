import React from "react";
import Box from "@mui/material/Box";
import VolumeControlButton from "@/components/Buttons/VolumeControl/VolumeControlButton";
import MusicControlButton from "@/components/Buttons/MusicControl/MusicControlButton";

const AudioPanel: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "row", // Change to row to align horizontally
        alignItems: "center", // Center align items vertically
        gap: "12px", // Spacing between buttons
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
