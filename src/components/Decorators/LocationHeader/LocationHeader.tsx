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
        top: top || "65px",
        left: left || "50%",
        transform: left ? "none" : "translateX(-50%)",
        width: "28%",
        height: "70px",
        textAlign: "center",
        backgroundImage: `url('/Frames/location-map-header2.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontWeight: "500",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default LocationHeader;
