import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface MapHeaderProps {
  text: string;
}

const MapHeader: React.FC<MapHeaderProps> = ({ text }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "65px", // Push it down by the height of the AppBar
        left: "50%",
        transform: "translateX(-50%)",  
        width: "25%",  
        height: "150px",
        textAlign: "center",
        backgroundImage: `url('/Frames/small-header.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain", // Ensure the entire image fits within the container
        backgroundPosition: "center",
      }}
    >
      <Typography
        variant="h4"
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

export default MapHeader;
