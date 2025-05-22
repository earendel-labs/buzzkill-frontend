import React from "react";
import { Box } from "@mui/material";
import LocationHeader from "@/components/MapNavigation/LocationHeader/LocationHeader";
import WorldMapButton from "@/components/MapNavigation/WorldMapButton/WorldMapButton";
import UserResourceBar from "@/components/User/UserResources/UserResourcesHatchlings";
import HiveMapButton from "@/components/MapNavigation/HiveMapButton/HiveMapButton";
import { useEnvironment } from "@/context/EnvironmentContext";

interface HiveTopBarProps {
  mapHeaderLabel: string;
}

const HiveTopBar: React.FC<HiveTopBarProps> = ({ mapHeaderLabel }) => {
  const { currentEnvironment } = useEnvironment();
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
          xl: "1.75rem 5.3rem 0rem 2.9rem",
          xxl: "2rem 5rem",
        },
        width: "100%",
        height: "auto",
        gap: { xs: "10px", md: "0px" },
      }}
    >
      {/* Left section with User Resources */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flex: 1,
          height: "100%",
          boxSizing: "border-box",
          paddingRight: 0, // Remove additional padding
        }}
      >
        <UserResourceBar />
      </Box>

      {/* Centered LocationHeader */}
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

      {/* Right section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.1,
          flex: 1,
        }}
      >
        <HiveMapButton
          environmentType={currentEnvironment?.environmentType || "Forest"}
        />
        <WorldMapButton />
      </Box>
    </Box>
  );
};

export default HiveTopBar;
