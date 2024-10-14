import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import MapHeader from "@/components/MapNavigation/MapHeader/MapHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import UserResourceBar from "@/components/User/UserResources/UserResources";

interface TopBarProps {
  showWorldMapButton?: boolean;
  mapHeaderLabel: string;
}

const TopBar: React.FC<TopBarProps> = ({
  showWorldMapButton = true,
  mapHeaderLabel,
}) => {
  // Use media query to determine if the screen is small
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        padding: "20px 80px 0px 50px",
        width: "100%",
        height: "auto",
        gap: isSmallScreen ? "20px" : "0px",
        position: "relative",
      }}
    >
      {/* Left section - User Resource Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          minWidth: "200px", // Ensure this takes the right amount of space for content
          marginRight: "20px", // Keep the spacing controlled
        }}
      >
        <UserResourceBar />
      </Box>

      {/* Centered Map Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: isSmallScreen ? "relative" : "absolute",
          left: isSmallScreen ? "auto" : "55%",
          transform: isSmallScreen ? "none" : "translateX(-50%)", // Center it horizontally
          textAlign: "center",
        }}
      >
        <MapHeader text={mapHeaderLabel} />
      </Box>

      {/* Right section - World Map Button or Placeholder */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          minWidth: "100px", // Ensure right side takes minimum space
          marginLeft: isSmallScreen ? "0" : "auto", // Adjust layout on larger screens
        }}
      >
        {showWorldMapButton ? (
          <WorldMapButton />
        ) : (
          <Box sx={{ width: "120px", height: "120px" }} /> // Placeholder
        )}
      </Box>
    </Box>
  );
};

export default TopBar;
