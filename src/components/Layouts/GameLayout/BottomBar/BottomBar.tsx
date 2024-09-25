import React from "react";
import { Box } from "@mui/material";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import BeeStatsPanel from "@/components/ControlPanels/BeeStatsPanel/BeeStatsPanel";

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
      }}
    >
      {/* Bee Stats Panel - Make sure this is above all content */}
      <Box
        sx={{
          position: "fixed", // Use fixed to keep it above other content
          bottom: {
            xs: "0rem",
            md: "0rem",
            lg: "0rem",
            xl: "3rem",
            xxl: "3rem",
          }, // 10px -> 0.625rem
          left: {
            xs: "0rem",
            md: "0rem",
            lg: "0rem",
            xl: "4rem",
            xxl: "5rem",
          }, // 10px -> 0.625rem
          zIndex: 100, // Very high z-index to keep it on top
        }}
      >
        <BeeStatsPanel
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
        />
      </Box>

      {/* Audio Panel - Conditionally render based on the isAudioPanelVisible prop */}
      {isAudioPanelVisible && (
        <Box
          sx={{
            position: "fixed", // Keep this above everything
            bottom: "0.625rem", // 10px -> 0.625rem
            right: "0.625rem", // 10px -> 0.625rem
            zIndex: 100, // Same z-index to keep it above other components
          }}
        >
          <AudioPanel />
        </Box>
      )}
    </Box>
  );
};

export default BottomBar;
