// HexagonSpinner.js
import React from "react";
import { Box, useTheme } from "@mui/material";
import Hexagon from "./Hexagon";
import "./HexagonSpinner.css"; // Include the CSS file for animations

const HexagonSpinner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        width: 100,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default, // Spinner background color
      }}
    >
      {[...Array(6)].map((_, i) => (
        <Hexagon key={i} className={`hexagon hexagon-${i}`} />
      ))}
    </Box>
  );
};

export default HexagonSpinner;
