// src/components/HatchlingStatus.tsx

import React from "react";
import { Box, Chip } from "@mui/material";
import { styled } from "@mui/system";
import { useEnvironment } from "@/context/EnvironmentContext";

import { useRouter } from "next/navigation";
import {
  getEnvironmentColor,
  getEnvironmentColorLighter,
} from "@/app/utils/environmentColours";

export interface HatchlingStatusProps {
  status: string;
  environmentID: number | null;
  hiveID: number | null;
}

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  backgroundColor: status === "Free" ? "green" : theme.palette.info.main,
  color: "white",
  borderRadius: "2px",
  fontWeight: "bold",
  fontSize: "0.875rem",
  padding: "4px 8px",
}));

const EnvironmentChip = styled(Chip)<{ bgColor: string; hoverColor: string }>(
  ({ theme, bgColor, hoverColor }) => ({
    backgroundColor: bgColor,
    color: "white",
    borderRadius: "2px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.875rem",
    padding: "4px 8px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: hoverColor,
    },
    "&:active": {
      filter: "brightness(80%)",
    },
  })
);

const HiveChip = styled(Chip)<{ bgColor: string; hoverColor: string }>(
  ({ theme, bgColor, hoverColor }) => ({
    backgroundColor: bgColor,
    color: "white",
    borderRadius: "2px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.875rem",
    padding: "4px 8px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: hoverColor,
    },
    "&:active": {
      filter: "brightness(80%)",
    },
  })
);

const HatchlingStatus: React.FC<HatchlingStatusProps> = ({
  status,
  environmentID,
  hiveID,
}) => {
  const { getEnvironmentById, getHiveById } = useEnvironment();
  const router = useRouter();

  const environment = environmentID ? getEnvironmentById(environmentID) : null;
  const hive =
    environmentID && hiveID ? getHiveById(environmentID, hiveID) : null;

  const environmentColor = environment
    ? getEnvironmentColor(environment)
    : "#808080"; // Default gray

  const environmentHoverColor = environment
    ? getEnvironmentColorLighter(environment, 0.2)
    : "#A9A9A9"; // Lighter gray

  const hiveColor = environmentColor; // Hive color matches Environment color
  const hiveHoverColor = environmentHoverColor; // Hive hover color matches Environment hover color

  const handleEnvironmentClick = () => {
    if (environment) {
      // Remove spaces by replacing them with empty strings
      const environmentPath = environment.name.replace(/\s+/g, "");
      router.push(`/Play/Location/${encodeURIComponent(environmentPath)}`);
    }
  };

  const handleHiveClick = () => {
    if (hive && environment) {
      // Remove spaces by replacing them with empty strings
      const environmentPath = environment.name.replace(/\s+/g, "");
      const hivePath = hive.name.replace(/\s+/g, "");
      router.push(
        `/Play/Location/${encodeURIComponent(
          environmentPath
        )}/${encodeURIComponent(hivePath)}`
      );
    }
  };

  return (
    <>
      {/* StatusChip at Top-Right Corner */}
      <Box
        sx={{
          position: "absolute",
          top: "12px",
          right: "12px",
        }}
      >
        <StatusChip label={status || "Free"} status={status || "Free"} />
      </Box>

      {/* EnvironmentChip and HiveChip at Bottom-Left Corner */}
      <Box
        sx={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap", // Ensure chips wrap on smaller screens
          padding: "8px", // Added padding for better spacing
        }}
      >
        {status === "Staked" && environment && (
          <EnvironmentChip
            label={environment.name}
            bgColor={environmentColor}
            hoverColor={environmentHoverColor}
            onClick={handleEnvironmentClick}
            aria-label={`Environment: ${environment.name}`}
          />
        )}
        {status === "Staked" && hive && (
          <HiveChip
            label={hive.name}
            bgColor={hiveColor}
            hoverColor={hiveHoverColor}
            onClick={handleHiveClick}
            aria-label={`Hive: ${hive.name}`}
          />
        )}
      </Box>
    </>
  );
};

export default HatchlingStatus;
