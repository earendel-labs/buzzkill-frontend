import React from "react";
import { Box } from "@mui/material";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import BeePanelCard from "@/components/Card/BeePanelCard/BeePanelCard"; // Import your BeePanelCard

type BottomBarProps = {
  isAudioPanelVisible?: boolean;
};

const BottomBar: React.FC<BottomBarProps> = ({
  isAudioPanelVisible = true,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 1,
        padding: {
          xs: "0.5rem", // Small padding for mobile
          md: "1rem", // Larger padding for desktop
        },
      }}
    >
      {/* <BeeStatsPanel
          healthValue={"35/100"}
          productivityValue={"250/300"}
          energyValue={"15/100"}
          attackValue={"40"}
          defenceValue={"20"}
          forageValue={"52"}
          energyBarLength={15}
          healthBarLength={50}
          productivityBarLength={10}
          activityBarLength={70}
          beeFrameImage={"/NFTs/WorkerBee.png"}
        /> */}
      {/* Bee Panel Card - Positioned with some spacing from the left and bottom */}
      <Box
        sx={{
          position: "fixed", // Keep it fixed so it remains visible on scroll
          bottom: {
            xs: "1rem", // Small space from the bottom on mobile
            md: "2rem", // Larger space from the bottom on desktop
          },
          left: {
            xs: "1rem", // Small space from the left on mobile
            md: "2rem", // Larger space from the left on desktop
          },
          zIndex: 100, // High z-index to keep it above other content
        }}
      >
        <BeePanelCard />
      </Box>

      {/* Audio Panel - Positioned with some spacing from the right and bottom */}
      {isAudioPanelVisible && (
        <Box
          sx={{
            position: "fixed", // Keep it fixed so it remains visible on scroll
            bottom: {
              xs: "1rem", // Small space from the bottom on mobile
              md: "2rem", // Larger space from the bottom on desktop
            },
            right: {
              xs: "1rem", // Small space from the right on mobile
              md: "2rem", // Larger space from the right on desktop
            },
            zIndex: 100, // Same high z-index to keep it above other components
          }}
        >
          <AudioPanel />
        </Box>
      )}
    </Box>
  );
};

export default BottomBar;
