import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface LargeTallToolTipProps {
  children?: React.ReactNode;
}

const LargeTallToolTip: React.FC<LargeTallToolTipProps> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        padding: "20px",
        backgroundImage: `url('/Frames/ToolTips/LargeTallToolTip.svg')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "280px",
        height: "200px",
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

export default LargeTallToolTip;
