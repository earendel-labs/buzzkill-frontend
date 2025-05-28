import React from "react";
import { Box } from "@mui/material";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import BeePanelCard from "@/components/Card/BeePanelCard/BeePanelCard";
import HatchlingInfoPanel from "@/components/ControlPanels/HatchlingInfoPanel/HatchlingInfoPanel";
import HiveRestrictionsInfo from "@/app/Play/Location/AzureReef/components/HiveRestrictionsInfo";

type BottomBarProps = {
  isHiveLayout?: boolean;
  isRestrictedEnvironment?: boolean; // New optional flag to show HiveRestrictionsInfo
};

const BottomBar: React.FC<BottomBarProps> = ({
  isHiveLayout = true,
  isRestrictedEnvironment = false, // Default is false
}) => {
  return (
    <>
      {/* Hatchling Info Panel */}
      {!isHiveLayout && (
        <Box
          sx={{
            position: "fixed",
            bottom: {
              sm: "9.2rem",
              md: "12rem",
              lg: "12rem",
              xl: "17rem",
              xxl: "18rem",
            },
            left: {
              sm: "1rem",
              md: "1rem",
              lg: "1.7rem",
              xl: "2.6rem",
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
          bottom: isHiveLayout
            ? {
                sm: "1rem",
                md: "1rem",
                lg: "0.6rem",
                xl: "1rem",
                xxl: "2.125rem",
              }
            : {
                sm: "1rem",
                md: "1rem",
                lg: "1.3rem",
                xl: "2rem",
                xxl: "3.125rem",
              },
          left: isHiveLayout
            ? {
                sm: "1rem",
                md: "1rem",
                lg: "3.8rem",
                xl: "4.5rem",
                xxl: "5rem",
              }
            : {
                sm: "1rem",
                md: "1rem",
                lg: "1.7rem",
                xl: "2.6rem",
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
            bottom: {
              sm: "1rem",
              md: "1rem",
              lg: "1.3rem",
              xl: "2rem",
              xxl: "3.125rem",
            },
            zIndex: 101,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <HiveRestrictionsInfo />
        </Box>
      )}

      {/* Audio Panel */}
      {!isHiveLayout && (
        <Box
          sx={{
            position: "fixed",
            bottom: {
              sm: "1rem",
              md: "2rem",
            },
            right: {
              sm: "1rem",
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
