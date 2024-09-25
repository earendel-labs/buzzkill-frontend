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
        width: "auto",
        height: "150px",
        minWidth: "440px",
        textAlign: "center",
        backgroundImage: `url('/Frames/header.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "white",
          fontWeight: "760",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          padding: "47px 80px",
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
            md: "1rem",
            lg: "1.75rem",
            xl: "3rem",
            xxl: "3rem",
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default MapHeader;
