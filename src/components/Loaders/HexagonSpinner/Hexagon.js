// Hexagon.js
import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Hexagon = ({ className }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 50,
        height: "28.87px",
        backgroundColor: "transparent",
        borderLeft: `2.5px solid ${theme.palette.Blue.main}`,
        borderRight: `2.5px solid ${theme.palette.Blue.main}`,
        position: "absolute",
        "&:before": {
          content: '""',
          position: "absolute",
          bottom: "100%",
          borderLeft: "27.5px solid transparent",
          borderRight: "27.5px solid transparent",
          borderBottom: `15px solid ${theme.palette.Blue.main}`,
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: "100%",
          borderLeft: "27.5px solid transparent",
          borderRight: "27.5px solid transparent",
          borderTop: `15px solid ${theme.palette.Blue.main}`,
        },
      }}
      className={className}
    />
  );
};

export default Hexagon;
