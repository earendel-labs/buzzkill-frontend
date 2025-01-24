// Hexagon.js
import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Hexagon = ({ className }) => {
  const theme = useTheme();

  return (
    <Box
      className={className}
      sx={{
        width: 40, // Adjust the size as needed
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(195, 121, 11)",
        clipPath:
          "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)", // Hexagon shape
        border: `4px solid rgb(195, 121, 11)`, // Outline border
        transform: "rotate(0deg)", // Start with no rotation
        position: "absolute",
      }}
    />
  );
};

export default Hexagon;
