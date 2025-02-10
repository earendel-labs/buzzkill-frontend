import React from "react";
import { Box } from "@mui/material";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import BeePanelCard from "@/components/Card/BeePanelCard/BeePanelCard";
import HatchlingInfoPanel from "@/components/ControlPanels/HatchlingInfoPanel/HatchlingInfoPanel";

type BottomBarProps = {
  isAudioPanelVisible?: boolean;
};

const BottomBar: React.FC<BottomBarProps> = ({
  isAudioPanelVisible = true,
}) => {
  return (
    <>
      {/* Hatchling Info Panel */}
      {isAudioPanelVisible && (
        <Box
          sx={{
            position: "fixed",
            bottom: {
              xs: "12rem", // Adjust for small screens
              md: "14rem", // Adjust for medium screens
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
