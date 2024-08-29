import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface LocationHeaderProps {
  text: string;
  position?: "absolute" | "relative";
  left?: string;
  top?: string;
  isHeader?: boolean;  
}

const LocationHeader: React.FC<LocationHeaderProps> = ({
  text,
  position = "absolute",
  left,
  top,
  isHeader = false,  
}) => {
  const styles = {
    absolute: {
      position: "absolute" as "absolute",
      top: top || "0px",
      left: left || "50%",
      transform: "translate(-50%, -100%)",
    },
    relative: {
      position: "relative" as "relative",
      top: top || "0px",
      left: left || "0px",
      transform: "none",
    },
  };

  return (
    <Box
      sx={{
        ...styles[position],
        width: "auto",
        padding: "10px 30px",
        textAlign: "center",
        backgroundImage: `url('/Frames/location-map-header.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",  
        backgroundPosition: "center",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant={isHeader ? "h4" : "h5"} // Adjust variant based on isHeader
        component="div"
        sx={{
          color: "white",
          fontWeight: "700",
          width: "100%",
          padding: isHeader ? "40px 60px" : "20px 40px", // Adjust padding based on isHeader
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default LocationHeader;
