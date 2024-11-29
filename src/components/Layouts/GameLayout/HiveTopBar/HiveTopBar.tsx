import React from "react";
import { Box } from "@mui/material";
import LocationHeader from "@/components/MapNavigation/LocationHeader/LocationHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import UserResourceBar from "@/components/User/UserResources/UserResourcesHatchlings";
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
        alignItems: "center",
        padding: {
          xs: "0px 1rem 0px 0.5rem",
          sm: "0px 2rem 0px 1rem",
          md: "0px 2.5rem 0px 1.5rem",
          lg: "0px 3.125rem 0px 1.25rem",
          xl: "0px 4rem 0px 7rem",
        },
        width: "100%",
        height: "8.75rem",
        "@media (max-width: 1440px)": {
          height: "6.25rem",
        },
        boxSizing: "border-box",
      }}
    >
      {/* Left section with User Resources */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "auto",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <UserResourceBar />
      </Box>

      {/* Centered LocationHeader */}
      <Box
        sx={{
          position: "relative",
          left: "10%",
          transform: "translateX(-50%)",
        }}
      >
        <LocationHeader
          text={mapHeaderLabel}
          position="relative"
          isHeader={true}
        />
      </Box>

      {/* Right section with Map Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          marginLeft: "auto",
        }}
      >
        <HiveMapButton />
        <WorldMapButton />
      </Box>
    </Box>
  );
};

export default HiveTopBar;
