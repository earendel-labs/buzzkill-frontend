// components/BottomBar.js

import React from "react";
import { Box } from "@mui/material";
import AudioPanel from "@/components/ControlPanels/AudioPanel/AudioPanel";
import BeeStatsPanel from "@/components/ControlPanels/BeeStatsPanel/BeeStatsPanel";

const BottomBar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(46, 59, 85, 0.1)",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        height: "auto",
        padding: "10px 0",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          marginLeft: "10px",
        }}
      >
        <BeeStatsPanel
          healthValue={"35/100"}
          productivityValue={"250/300"}
          energyValue={"300/100"}
          attackValue={"300"}
          defenceValue={"200"}
          forageValue={"52"}
          energyBarLength={20}
          
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "220px",
            width: "300px",
            backgroundColor: "transparent",
            border: "2px solid red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AudioPanel />
        </Box>
      </Box>
    </Box>
  );
};

export default BottomBar;
