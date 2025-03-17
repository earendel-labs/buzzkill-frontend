import React from "react";
import { Box } from "@mui/material";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import BeePanelCard from "@/components/Card/BeePanelCard/BeePanelCard";
import HatchlingInfoPanel from "@/components/ControlPanels/HatchlingInfoPanel/HatchlingInfoPanel";
import HiveRestrictionsInfo from "@/app/Play/Location/AzureReef/components/HiveRestrictionsInfo";

type BottomBarProps = {
  isAudioPanelVisible?: boolean;
  isRestrictedEnvironment?: boolean; // New optional flag to show HiveRestrictionsInfo
};

const BottomBar: React.FC<BottomBarProps> = ({
  isAudioPanelVisible = true,
  isRestrictedEnvironment = false, // Default is false
}) => {
  return (
    <>
      {/* Hatchling Info Panel */}
      {isAudioPanelVisible && (
        <Box
          sx={{
            position: "fixed",
            bottom: {
              xs: "10rem",
              md: "13.4rem",
              xl: "17rem",
              xxl: "18rem",
            },
            left: {
              xs: "1rem",
              md: "3.7rem",
              xl: "4.7rem",
              xxl: "5rem",
            },
            zIndex: 102, // Ensure it stays above BeePanelCard
          }}
        >
          <HatchlingInfoPanel />
        </Box>
      )}

      {/* Bee Panel Card */}
      <Box
        sx={{
          position: "fixed",
          bottom: {
            xs: "1rem",
            md: "1rem",
            lg: "1.3rem",
            xl: "2rem",
            xxl: "3.125rem",
          },
          left: {
            xs: "1rem",
            md: "3.7rem",
            xl: "4.6rem",
            xxl: "5rem",
          },
          zIndex: 101, // Below HatchlingInfoPanel
        }}
      >
        <BeePanelCard />
      </Box>

      {/* Hive Restrictions Info (Conditionally displayed) */}
      {isRestrictedEnvironment && (
        <Box
          sx={{
            position: "fixed",
            bottom: {
              xs: "1rem",
              md: "1rem",
              lg: "1.3rem",
              xl: "1.3rem",
              xxl: "3.125rem",
            },
            left: "50%",
            transform: "translateX(-50%)", // Centers it horizontally
            zIndex: 101, // Same level as BeePanelCard but spaced out
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            padding: "10px",
          }}
        >
          <HiveRestrictionsInfo />
        </Box>
      )}

      {/* Audio Panel */}
      {isAudioPanelVisible && (
        <Box
          sx={{
            position: "fixed",
            bottom: {
              xs: "1rem",
              md: "2rem",
            },
            right: {
              xs: "1rem",
              md: "2rem",
            },
            zIndex: 100,
          }}
        >
          <AudioPanel />
        </Box>
      )}
    </>
  );
};

export default BottomBar;
