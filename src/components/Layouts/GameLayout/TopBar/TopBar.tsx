import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import MapHeader from "@/components/MapNavigation/MapHeader/MapHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import UserResourceBar from "@/components/User/UserResources/UserResourcesHatchlings";

interface TopBarProps {
  showWorldMapButton?: boolean;
  mapHeaderLabel: string;
}

const TopBar: React.FC<TopBarProps> = ({
  showWorldMapButton = true,
  mapHeaderLabel,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 80px 0px 140px",
          width: "100%",
          height: "auto",
          gap: isSmallScreen ? "20px" : "0px",
        }}
      >
        {/* Left section - User Resource Bar */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            minWidth: "200px",
          }}
        >
          <UserResourceBar />
        </Box>

        {/* Centered Map Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            order: isSmallScreen ? -1 : 0, // Bring to top on mobile
          }}
        >
          <MapHeader text={mapHeaderLabel} />
        </Box>

        {/* Right section - World Map Button or Placeholder */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            minWidth: "100px",
          }}
        >
          {showWorldMapButton ? (
            <WorldMapButton />
          ) : (
            <Box sx={{ width: "120px", height: "120px" }} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
