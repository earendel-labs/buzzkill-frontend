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
        width: "40%",
        height: "150px",
        textAlign: "center",
        backgroundImage: `url('/Frames/small-header.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain", // Ensure the entire image fits within the container
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          color: "white",
          fontWeight: "500",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: {
            xs: "0.7rem", // font size for small screens
            sm: "1rem", // font size for medium screens
            md: "1.5rem", // font size for large screens
            lg: "2rem", // font size for extra-large screens
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default MapHeader;
