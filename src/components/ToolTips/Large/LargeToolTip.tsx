import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LargeToolTipProps {
  children?: React.ReactNode; // Allow injecting different layouts/components
}

const LargeToolTip: React.FC<LargeToolTipProps> = ({children}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        padding: "20px", // Adjust padding if content is not provided
        backgroundImage: `url('/Frames/ToolTips/LargeToolTip.svg')`,
        backgroundSize: "contain", // Ensure the image scales to fit the container
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex", // Fit content
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "280px", // Fixed width for the tooltip
        height: "170px", // Fixed height for the tooltip
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LargeToolTip;
