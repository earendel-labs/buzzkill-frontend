import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface MapHeaderProps {
  text: string;
}

const MapHeader: React.FC<MapHeaderProps> = ({ text }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "65px", // Push it down by the height of the AppBar
        left: "50%",
        transform: "translateX(-50%)",
        width: "auto", // Adjust the width based on the content
        minWidth: "400px", // Minimum width for better visibility
        textAlign: "center",
        backgroundImage: `url('/Frames/header.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%", // Ensure the entire image fits within the container
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0", // Add padding to the box for height adjustment
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{
          color: "white",
          fontWeight: "760",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "50px 80px", // Add padding to the typography for left and right spacing
          fontSize: {
            xs: "1rem", // font size for small screens
            sm: "1.5rem", // font size for medium screens
            md: "2rem", // font size for large screens
            lg: "3rem", // font size for extra-large screens
          },
          WebkitTextStroke: `1px ${theme.palette.DarkOrange.main}`,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default MapHeader;
