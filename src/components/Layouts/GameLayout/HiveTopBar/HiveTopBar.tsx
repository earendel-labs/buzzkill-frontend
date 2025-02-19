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
  // console.log("currentEnvironment", currentEnvironment);
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: {
          xs: "0rem 1rem",
          sm: "0rem 2rem",
          md: "0rem 2.5rem",
          lg: "0rem 3rem",
          xl: "0rem, 4rem",
          xxl: "0rem, 12rem",
        },
        width: "100%",
        height: {
          xs: "6rem",
          md: "7rem",
          xl: "8.8rem",
          xxl: "12rem",
        },
        boxSizing: "border-box",
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
          gap: 1,
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
