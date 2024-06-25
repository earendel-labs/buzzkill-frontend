import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface LocationHeaderProps {
  text: string;
  left?: string;
  top?: string;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({ text, left, top }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: top || "0px",
        left: left || "50%",
        transform: "translate(-50%, -100%)", // Center horizontally and move up by 100%
        width: "auto",
        padding: "10px 20px",
        textAlign: "center",
        backgroundImage: `url('/Frames/location-map-header.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%", // Maintain aspect ratio of background
        backgroundPosition: "center",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "white",
          fontWeight: "500",
          width: "100%",
          padding: "20px 40px",  
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default LocationHeader;
