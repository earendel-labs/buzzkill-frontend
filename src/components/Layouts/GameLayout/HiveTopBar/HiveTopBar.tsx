import React from "react";
import { Box } from "@mui/material";
import LocationHeader from "@/components/MapNavigation/LocationHeader/LocationHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import UserResourceBar from "@/components/User/UserResources/UserResourcesHatchlings";
import HiveMapButton from "@/components/MapNavigation/HiveMapButton/HiveMapButton";

interface HiveTopBarProps {
  mapHeaderLabel: string;
}

// ... other imports

const HiveTopBar: React.FC<HiveTopBarProps> = ({ mapHeaderLabel }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: {
          xs: "0px 1rem",
          sm: "0px 2rem",
          md: "0px 2.5rem",
          lg: "0px 3.125rem",
          xl: "0px 4rem",
        },
        width: "100%",
        height: "8.75rem",
        "@media (max-width: 1440px)": {
          height: "6.25rem",
        },
        boxSizing: "border-box",
      }}
    >
      {/* Left section with User Resources - Fixed alignment */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center", // Added vertical centering
          flex: 1,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <UserResourceBar />
      </Box>

      {/* Centered LocationHeader remains unchanged */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <LocationHeader
          text={mapHeaderLabel}
          position="relative"
          isHeader={true}
        />
      </Box>

      {/* Right section remains unchanged */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          flex: 1,
        }}
      >
        <HiveMapButton />
        <WorldMapButton />
      </Box>
    </Box>
  );
};

export default HiveTopBar;
