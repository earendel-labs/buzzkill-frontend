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
          xs: "16px 90px 5px 20px",
          md: "20px 20px 0px 20px",
          lg: "20px 90px 0px 60px",
          xl: "30px 100px",
          xxl: "40px 120px",
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
