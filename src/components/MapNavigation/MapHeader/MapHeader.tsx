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
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: "clamp(10px, 5vw, 50px)", // Dynamically adjust padding based on screen size
        paddingBlock: "10px", // Consistent padding top and bottom
        position: "relative", // For pseudo-element positioning
        borderRadius: "16px", // Border radius applied to both the box and the pseudo-element
        background:
          "linear-gradient(180deg, rgba(36, 46, 78, 0.85) 24.47%, rgba(18, 23, 39, 0.85) 57.99%, rgba(32, 41, 70, 0.85) 79.21%)", // Fill gradient
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1, // Send the border behind the content
          borderRadius: "2px", // Ensure it matches the main box
          padding: "5px", // Stroke width (adjust as needed)
          background:
            "linear-gradient(180deg, #68341B 6%, #915E28 29%, #E9B743 77%, #E9B743 98%)", // Border gradient
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", // Masking for stroke effect
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        },
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
          padding: "0 10px", // Padding around the text
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
            md: "1.7rem",
            lg: "2rem",
            xl: "2.5rem",
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
