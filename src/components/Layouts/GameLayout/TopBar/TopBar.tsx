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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: {
            xs: "10px 20px",
            sm: "20px 20px 0px 40px",
            md: "20px 30px 0px 40px",
            lg: "20px 90px 0px 60px",
            xl: "30px 100px",
            xxl: "40px 120px",
          },
          width: "100%",
          height: "auto",
          gap: { xs: "20px", md: "0px" },
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
