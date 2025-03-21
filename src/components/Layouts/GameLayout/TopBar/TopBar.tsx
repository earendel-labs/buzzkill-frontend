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
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: {
          sm: "1rem 5.625rem 0.3125rem 1rem",
          md: "1.25rem 5.25rem 0rem 1rem",
          lg: "1.25rem 5.625rem 0rem 1.7rem",
          xl: "2.0rem 5.6rem 0rem 2.5rem",
          xxl: "2.5rem 5rem",
        },
        width: "100%",
        height: "auto",
        gap: { xs: "10px", md: "0px" },
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
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
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
          <Box sx={{ width: "100px", height: "10px" }} />
        )}
      </Box>
    </Box>
  );
};

export default TopBar;
